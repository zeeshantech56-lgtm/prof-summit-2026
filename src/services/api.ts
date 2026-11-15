import { ADMIN_EMAILS } from "@/config";
import { event, checkInWindowStart } from "@/content/event";
import { db, auth, googleProvider } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  writeBatch,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

export type AttendeeStatus = "School student, Class 10+" | "College student" | "Working professional";
export type Feedback = { rating: number; best: string; comment: string };
export type RegistrationForm = {
  name: string;
  status: AttendeeStatus;
  stream: string;
  city: string;
  phone: string;
  email: string;
};
export type Registration = RegistrationForm & {
  id: string;
  attended: boolean;
  attendedAt: string | null;
  createdAt: string;
  feedback: Feedback | null;
  feedbackAt: string | null;
};
export type AttendeeSummary = {
  id: string;
  name: string;
  status: AttendeeStatus;
  attended: boolean;
  hasFeedback: boolean;
};

export type ApiErrorCode =
  | "DUPLICATE_PHONE"
  | "NOT_FOUND"
  | "ALREADY_CHECKED_IN"
  | "TOO_EARLY"
  | "NOT_CHECKED_IN"
  | "ALREADY_SUBMITTED";

export type ApiError = Error & { code: ApiErrorCode };

const LAST_ID_KEY = "prof-summit-last-id";
const LOCAL_STORE_KEY = "prof-summit-registrations-v1";
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function fail(code: ApiErrorCode, message: string): ApiError {
  return Object.assign(new Error(message), { code });
}

function normalizedId(id: string) {
  return id.trim().toUpperCase();
}

export function createRegistrationId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return `PROF-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`;
}

// -------------------------------------------------------------
// Attendee Registration
// -------------------------------------------------------------
export async function registerAttendee(form: RegistrationForm): Promise<{ id: string }> {
  const cleanPhone = form.phone.trim();
  const cleanId = createRegistrationId();

  try {
    const phoneRef = doc(db, "phones", cleanPhone);
    const phoneSnap = await getDoc(phoneRef);
    if (phoneSnap.exists()) {
      throw fail("DUPLICATE_PHONE", "This number is already registered.");
    }

    const regRef = doc(db, "registrations", cleanId);
    const batch = writeBatch(db);

    batch.set(regRef, {
      id: cleanId,
      name: form.name.trim(),
      status: form.status,
      stream: form.stream.trim(),
      city: form.city.trim(),
      phone: cleanPhone,
      email: form.email.trim().toLowerCase(),
      attended: false,
      attendedAt: null,
      createdAt: serverTimestamp(),
      feedback: null,
      feedbackAt: null,
    });

    batch.set(phoneRef, {
      registrationId: cleanId,
      createdAt: serverTimestamp(),
    });

    await batch.commit();

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LAST_ID_KEY, cleanId);
    }

    return { id: cleanId };
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "DUPLICATE_PHONE") {
      throw err;
    }
    // Handle offline / fallback gracefully for testing
    console.warn("Firestore error during registration, falling back to local fallback:", err);
    return registerAttendeeFallback(form, cleanId);
  }
}

// -------------------------------------------------------------
// Attendee Lookup
// -------------------------------------------------------------
export async function getAttendee(id: string): Promise<AttendeeSummary | null> {
  const norm = normalizedId(id);
  try {
    const regRef = doc(db, "registrations", norm);
    const snap = await getDoc(regRef);
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      id: data.id,
      name: data.name,
      status: data.status,
      attended: Boolean(data.attended),
      hasFeedback: Boolean(data.feedback),
    };
  } catch (err) {
    console.warn("Firestore error reading attendee, trying local fallback:", err);
    const local = getFallbackRows().find((r) => r.id === norm);
    return local
      ? {
          id: local.id,
          name: local.name,
          status: local.status,
          attended: local.attended,
          hasFeedback: Boolean(local.feedback),
        }
      : null;
  }
}

// -------------------------------------------------------------
// Venue Check-in
// -------------------------------------------------------------
export async function checkIn(id: string): Promise<{ name: string }> {
  const norm = normalizedId(id);

  // Time-window check: opens 23:30 IST on 19 Dec 2026 (18:00 UTC)
  if (Date.now() < checkInWindowStart.getTime()) {
    throw fail("TOO_EARLY", "Check-in opens on 19 December 2026 at 23:30 IST.");
  }

  try {
    const regRef = doc(db, "registrations", norm);
    const snap = await getDoc(regRef);
    if (!snap.exists()) {
      throw fail("NOT_FOUND", "We couldn't find that ID. Check it and try again.");
    }
    const data = snap.data();
    if (data.attended) {
      throw fail("ALREADY_CHECKED_IN", "This ID has already been checked in.");
    }

    await updateDoc(regRef, {
      attended: true,
      attendedAt: serverTimestamp(),
    });

    return { name: data.name };
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && (err as ApiError).code) {
      throw err;
    }
    console.warn("Firestore error on check-in, using local fallback:", err);
    const rows = getFallbackRows();
    const row = rows.find((r) => r.id === norm);
    if (!row) throw fail("NOT_FOUND", "We couldn't find that ID. Check it and try again.");
    if (row.attended) throw fail("ALREADY_CHECKED_IN", "This ID has already been checked in.");
    row.attended = true;
    row.attendedAt = new Date().toISOString();
    saveFallbackRows(rows);
    return { name: row.name };
  }
}

// -------------------------------------------------------------
// Attendee Feedback
// -------------------------------------------------------------
export async function submitFeedback(id: string, feedback: Feedback): Promise<void> {
  const norm = normalizedId(id);
  try {
    const regRef = doc(db, "registrations", norm);
    const snap = await getDoc(regRef);
    if (!snap.exists()) {
      throw fail("NOT_FOUND", "We couldn't find that ID. Check it and try again.");
    }
    const data = snap.data();
    if (!data.attended) {
      throw fail("NOT_CHECKED_IN", "Please check in before sharing feedback.");
    }
    if (data.feedback) {
      throw fail("ALREADY_SUBMITTED", "Your feedback is already saved.");
    }

    await updateDoc(regRef, {
      feedback: {
        rating: Number(feedback.rating),
        best: String(feedback.best),
        comment: String(feedback.comment || ""),
      },
      feedbackAt: serverTimestamp(),
    });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && (err as ApiError).code) {
      throw err;
    }
    console.warn("Firestore error on feedback, using local fallback:", err);
    const rows = getFallbackRows();
    const row = rows.find((r) => r.id === norm);
    if (!row) throw fail("NOT_FOUND", "We couldn't find that ID. Check it and try again.");
    if (!row.attended) throw fail("NOT_CHECKED_IN", "Please check in before sharing feedback.");
    if (row.feedback) throw fail("ALREADY_SUBMITTED", "Your feedback is already saved.");
    row.feedback = feedback;
    row.feedbackAt = new Date().toISOString();
    saveFallbackRows(rows);
  }
}

// -------------------------------------------------------------
// Admin: List Registrations
// -------------------------------------------------------------
export type RegistrationListResult = {
  rows: Registration[];
  isCloud: boolean;
  firestoreError: string | null;
  cloudCount: number;
};

export async function fetchRegistrationsWithMeta(): Promise<RegistrationListResult> {
  try {
    const regCollection = collection(db, "registrations");
    const q = query(regCollection, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const firestoreRows: Registration[] = snap.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: data.id || docSnap.id,
        name: data.name || "",
        status: data.status || "College student",
        stream: data.stream || "",
        city: data.city || "",
        phone: data.phone || "",
        email: data.email || "",
        attended: Boolean(data.attended),
        attendedAt: data.attendedAt?.toDate ? data.attendedAt.toDate().toISOString() : data.attendedAt || null,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
        feedback: data.feedback || null,
        feedbackAt: data.feedbackAt?.toDate ? data.feedbackAt.toDate().toISOString() : data.feedbackAt || null,
      };
    });

    return {
      rows: firestoreRows,
      isCloud: true,
      firestoreError: null,
      cloudCount: firestoreRows.length,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("Firestore error listing registrations:", msg);
    return {
      rows: getFallbackRows(),
      isCloud: false,
      firestoreError: msg,
      cloudCount: 0,
    };
  }
}

export async function listRegistrations(): Promise<Registration[]> {
  const result = await fetchRegistrationsWithMeta();
  return result.rows;
}

// -------------------------------------------------------------
// Admin: Manual Mark Present
// -------------------------------------------------------------
export async function markAttendedManual(id: string): Promise<void> {
  const norm = normalizedId(id);
  try {
    const regRef = doc(db, "registrations", norm);
    await updateDoc(regRef, {
      attended: true,
      attendedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Firestore error marking attended, falling back to local:", err);
    const rows = getFallbackRows();
    const row = rows.find((r) => r.id === norm);
    if (row && !row.attended) {
      row.attended = true;
      row.attendedAt = new Date().toISOString();
      saveFallbackRows(rows);
    }
  }
}

// -------------------------------------------------------------
// Admin: Delete Registration (for cleanup)
// -------------------------------------------------------------
export async function deleteRegistration(id: string, phone: string): Promise<void> {
  const norm = normalizedId(id);
  try {
    await deleteDoc(doc(db, "registrations", norm));
    if (phone) {
      await deleteDoc(doc(db, "phones", phone));
    }
  } catch (err) {
    console.warn("Firestore error deleting registration:", err);
  }
  const rows = getFallbackRows().filter((r) => r.id !== norm);
  saveFallbackRows(rows);
}

// -------------------------------------------------------------
// Admin Authentication (Google Sign-In + Direct Fallback)
// -------------------------------------------------------------
export async function adminSignInGoogle(): Promise<{ email: string; name: string }> {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const email = res.user.email?.toLowerCase().trim();
    if (!email || !(ADMIN_EMAILS as readonly string[]).includes(email)) {
      await signOut(auth);
      throw new Error(`The account (${email || "unverified"}) is not an authorized administrator.`);
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("prof-summit-admin-v1", email);
    }
    return { email, name: res.user.displayName || email };
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "auth/configuration-not-found") {
      throw new Error("Google Sign-In is not enabled in Firebase Console yet. Please enable Google in Firebase Console (Authentication > Sign-in method > Google), or use Direct Admin Sign-in below.");
    }
    throw err;
  }
}

export async function adminSignInDirect(email: string): Promise<{ email: string; name: string }> {
  const normalized = email.trim().toLowerCase();
  if (!(ADMIN_EMAILS as readonly string[]).includes(normalized)) {
    throw new Error(`The email (${normalized}) is not on the authorized administrator list.`);
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem("prof-summit-admin-v1", normalized);
  }
  return { email: normalized, name: normalized.split("@")[0] };
}

export async function adminSignOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch {
    // Ignore signOut errors if not signed in via Firebase
  }
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("prof-summit-admin-v1");
  }
}

export function subscribeAdminUser(callback: (user: { email: string; displayName?: string } | null, isAdmin: boolean) => void) {
  // First check if there's a stored session
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem("prof-summit-admin-v1");
    if (saved && (ADMIN_EMAILS as readonly string[]).includes(saved)) {
      callback({ email: saved, displayName: saved.split("@")[0] }, true);
    }
  }

  return onAuthStateChanged(auth, (user) => {
    if (!user || !user.email) {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem("prof-summit-admin-v1") : null;
      if (saved && (ADMIN_EMAILS as readonly string[]).includes(saved)) {
        callback({ email: saved, displayName: saved.split("@")[0] }, true);
      } else {
        callback(null, false);
      }
      return;
    }
    const cleanEmail = user.email.toLowerCase().trim();
    const isAdmin = (ADMIN_EMAILS as readonly string[]).includes(cleanEmail);
    if (isAdmin && typeof window !== "undefined") {
      window.localStorage.setItem("prof-summit-admin-v1", cleanEmail);
    }
    callback(isAdmin ? { email: cleanEmail, displayName: user.displayName || cleanEmail } : null, isAdmin);
  });
}

export async function getLastRegistrationId(): Promise<string> {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(LAST_ID_KEY) ?? "";
}

// -------------------------------------------------------------
// Local Storage Fallback / Offline / Test Fixtures
// -------------------------------------------------------------
function registerAttendeeFallback(form: RegistrationForm, id: string): { id: string } {
  const rows = getFallbackRows();
  if (rows.some((r) => r.phone === form.phone)) {
    throw fail("DUPLICATE_PHONE", "This number is already registered.");
  }
  rows.unshift({
    ...form,
    id,
    attended: false,
    attendedAt: null,
    createdAt: new Date().toISOString(),
    feedback: null,
    feedbackAt: null,
  });
  saveFallbackRows(rows);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LAST_ID_KEY, id);
  }
  return { id };
}

function getFallbackRows(): Registration[] {
  if (typeof window === "undefined") return [];
  const saved = window.localStorage.getItem(LOCAL_STORE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved) as Registration[];
    } catch {
      window.localStorage.removeItem(LOCAL_STORE_KEY);
    }
  }
  const rows = demoRows();
  window.localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(rows));
  return rows;
}

function saveFallbackRows(rows: Registration[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(rows));
  }
}

function demoRows(): Registration[] {
  const names = [
    "Aarav Sharma", "Aanya Verma", "Arjun Patel", "Diya Singh", "Kabir Khan",
    "Meera Joshi", "Rehan Ahmed", "Sana Qureshi", "Ishaan Gupta", "Zoya Ansari",
    "Vivaan Shah", "Anaya Jain", "Adil Siddiqui", "Riya Nair", "Farhan Khan",
    "Ira Kulkarni", "Rohan Das", "Fatima Ali", "Dev Malhotra", "Noor Sheikh"
  ];
  const cities = ["Indore", "Bhopal", "Ujjain", "Dewas", "Khandwa", "Mhow"];
  return names.map((name, i) => {
    const attended = i < 12;
    const feedback = i < 8 ? { rating: 4 + (i % 2), best: event.bestSessions[i % 3], comment: "A thoughtful and practical session." } : null;
    const id = `PROF-${Array.from({ length: 8 }, (_, j) => alphabet[(i * 7 + j * 11) % alphabet.length]).join("")}`;
    return {
      id,
      name,
      status: (i % 3 === 0 ? "School student, Class 10+" : i % 3 === 1 ? "College student" : "Working professional") as AttendeeStatus,
      stream: ["Science", "Commerce", "Computer Science", "Healthcare", "Design", "Business"][i % 6]!,
      city: cities[i % cities.length]!,
      phone: `9${String(100000000 + i * 37921).padStart(9, "0")}`,
      email: `attendee${i + 1}@example.com`,
      attended,
      attendedAt: attended ? new Date(Date.UTC(2026, 11, 20, 5, 15 + i)).toISOString() : null,
      createdAt: new Date(Date.UTC(2026, 10, 1 + i, 9, 30)).toISOString(),
      feedback,
      feedbackAt: feedback ? new Date(Date.UTC(2026, 11, 20, 8, 30)).toISOString() : null,
    };
  });
}

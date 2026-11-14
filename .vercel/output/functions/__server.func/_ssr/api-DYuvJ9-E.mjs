import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { a as query, c as collection, d as serverTimestamp, i as orderBy, l as doc, n as getDoc, o as updateDoc, r as getDocs, s as writeBatch, t as deleteDoc, u as getFirestore } from "../_libs/@firebase/firestore+[...].mjs";
import { a as signOut, i as signInWithPopup, n as getAuth, r as onAuthStateChanged, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DYuvJ9-E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var ADMIN_EMAILS = [
	"khanmubeen5720@gmail.com",
	"sikandaralialex564@gmail.com",
	"theboonwelfarefoundation@gmail.com",
	"zeeshantech56@gmail.com",
	"zeeshantech56@github.com",
	"zeeshan@crucible.institute"
];
var event = {
	name: "PROF SUMMIT",
	subtitle: "Professional Students Conference",
	tagline: "A Complete Guidance from Character to Career",
	date: "20 December 2026",
	reportingTime: "10:30 AM",
	venue: "Star Hall, Manik Bagh Road, Indore, Madhya Pradesh",
	entry: "Free",
	organizer: "The BOON Welfare Foundation",
	organizerDescription: "The alumni association of Taiba College, Indore",
	organizerUrl: "https://boon-welfare-foundation.vercel.app",
	whatsappUrl: "https://whatsapp.com/channel/0029Vb9OWmLKAwEfzIopyp3w",
	story: "Prof Summit is an annual professional students' conference originating in Keralam, bringing together students from diverse universities, colleges and professional institutions for learning, networking and career development. Inspired by this initiative, The Boon Welfare Foundation proudly introduces Prof Summit in Madhya Pradesh for the first time, in Indore. Guided by the vision 'A Complete Guidance from Character to Career', Prof Summit inspires professional excellence, strong character and spiritual growth while keeping young minds connected to Deen and Islamic values.",
	closingLine: "True success is not just about what you achieve, but who you become.",
	sessions: [
		{
			title: "Career Navigator",
			subtitle: "Discover Your Direction · Academic & Professional Guidance",
			description: "Choosing the right academic path and career direction is one of the most significant decisions in a young person's life. Gain valuable insights into emerging fields, professional courses, and the skills needed to succeed in today's world.",
			speaker: "Mohammad Raza Mulla",
			number: "01",
			tone: "violet"
		},
		{
			title: "Prophetic Blueprint",
			subtitle: "The Way of Living Through Seerah, Tazkiyah & Character Development",
			description: "The life of Prophet Muhammad ﷺ is the ultimate example of guidance, compassion, integrity, and excellence. Learn how the Prophetic way of life guides personal conduct, relationships, decisions, and professional responsibilities.",
			speaker: "Dr. Mufti Khalid Ayyub Sahab",
			number: "02",
			tone: "yellow"
		},
		{
			title: "Minds Together",
			subtitle: "From Learning to Implementation · Group Discussion & Interactive Reflection",
			description: "An interactive session where participants come together to reflect on the key learnings, exchange perspectives, and develop actionable ideas for personal, academic, and professional growth.",
			speaker: null,
			number: "03",
			tone: "white"
		}
	],
	speakers: [{
		name: "Mohammad Raza Mulla",
		designation: "Co Founder & COO at CoSapiens Consulting",
		session: "Career Navigator",
		sessionNumber: "SESSION 01",
		initials: "MR",
		photo: "/speakers/raza-mulla.jpg",
		topic: "CAREER NAVIGATOR",
		tagline: "Discover Your Direction · Academic & Professional Guidance"
	}, {
		name: "Dr. Mufti Khalid Ayyub Sahab",
		designation: "Islamic Scholar",
		session: "Prophetic Blueprint",
		sessionNumber: "SESSION 02",
		initials: "MK",
		photo: "/speakers/khalid-ayyub.jpg",
		topic: "PROPHETIC BLUEPRINT",
		tagline: "The Way of Living Through Seerah, Tazkiyah & Character Development"
	}],
	audiences: [
		"School student, Class 10+",
		"College student",
		"Working professional"
	],
	bestSessions: [
		"Career Navigator",
		"Prophetic Blueprint",
		"Minds Together"
	]
};
var eventDateTime = /* @__PURE__ */ new Date("2026-12-20T05:00:00.000Z");
var checkInWindowStart = /* @__PURE__ */ new Date("2026-12-19T18:00:00.000Z");
var directionsUrl = "https://www.google.com/maps/search/?api=1&query=Star+Hall+Manik+Bagh+Road+Indore";
var app = getApps().length > 0 ? getApp() : initializeApp({
	apiKey: "AIzaSyAkMf8KzBuiyemAXm0PVhFlUftL-2bofzI",
	authDomain: "profsummit-29a2a.firebaseapp.com",
	projectId: "profsummit-29a2a",
	storageBucket: "profsummit-29a2a.firebasestorage.app",
	messagingSenderId: "1014183960763",
	appId: "1:1014183960763:web:25c192a6cfffe5f035c99e",
	measurementId: "G-5FCPFXF1JL"
});
var db = getFirestore(app);
var auth = getAuth(app);
var googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
var LAST_ID_KEY = "prof-summit-last-id";
var LOCAL_STORE_KEY = "prof-summit-registrations-v1";
var alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function fail(code, message) {
	return Object.assign(new Error(message), { code });
}
function normalizedId(id) {
	return id.trim().toUpperCase();
}
function createRegistrationId() {
	const bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(8));
	return `PROF-${Array.from(bytes, (byte) => alphabet[byte % 32]).join("")}`;
}
async function registerAttendee(form) {
	const cleanPhone = form.phone.trim();
	const cleanId = createRegistrationId();
	try {
		const phoneRef = doc(db, "phones", cleanPhone);
		if ((await getDoc(phoneRef)).exists()) throw fail("DUPLICATE_PHONE", "This number is already registered.");
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
			feedbackAt: null
		});
		batch.set(phoneRef, {
			registrationId: cleanId,
			createdAt: serverTimestamp()
		});
		await batch.commit();
		if (typeof window !== "undefined") window.localStorage.setItem(LAST_ID_KEY, cleanId);
		return { id: cleanId };
	} catch (err) {
		if (err && typeof err === "object" && "code" in err && err.code === "DUPLICATE_PHONE") throw err;
		console.warn("Firestore error during registration, falling back to local fallback:", err);
		return registerAttendeeFallback(form, cleanId);
	}
}
async function getAttendee(id) {
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
			hasFeedback: Boolean(data.feedback)
		};
	} catch (err) {
		console.warn("Firestore error reading attendee, trying local fallback:", err);
		const local = getFallbackRows().find((r) => r.id === norm);
		return local ? {
			id: local.id,
			name: local.name,
			status: local.status,
			attended: local.attended,
			hasFeedback: Boolean(local.feedback)
		} : null;
	}
}
async function checkIn(id) {
	const norm = normalizedId(id);
	if (Date.now() < checkInWindowStart.getTime()) throw fail("TOO_EARLY", "Check-in opens on 19 December 2026 at 23:30 IST.");
	try {
		const regRef = doc(db, "registrations", norm);
		const snap = await getDoc(regRef);
		if (!snap.exists()) throw fail("NOT_FOUND", "We couldn't find that ID. Check it and try again.");
		const data = snap.data();
		if (data.attended) throw fail("ALREADY_CHECKED_IN", "This ID has already been checked in.");
		await updateDoc(regRef, {
			attended: true,
			attendedAt: serverTimestamp()
		});
		return { name: data.name };
	} catch (err) {
		if (err && typeof err === "object" && "code" in err && err.code) throw err;
		console.warn("Firestore error on check-in, using local fallback:", err);
		const rows = getFallbackRows();
		const row = rows.find((r) => r.id === norm);
		if (!row) throw fail("NOT_FOUND", "We couldn't find that ID. Check it and try again.");
		if (row.attended) throw fail("ALREADY_CHECKED_IN", "This ID has already been checked in.");
		row.attended = true;
		row.attendedAt = (/* @__PURE__ */ new Date()).toISOString();
		saveFallbackRows(rows);
		return { name: row.name };
	}
}
async function submitFeedback(id, feedback) {
	const norm = normalizedId(id);
	try {
		const regRef = doc(db, "registrations", norm);
		const snap = await getDoc(regRef);
		if (!snap.exists()) throw fail("NOT_FOUND", "We couldn't find that ID. Check it and try again.");
		const data = snap.data();
		if (!data.attended) throw fail("NOT_CHECKED_IN", "Please check in before sharing feedback.");
		if (data.feedback) throw fail("ALREADY_SUBMITTED", "Your feedback is already saved.");
		await updateDoc(regRef, {
			feedback: {
				rating: Number(feedback.rating),
				best: String(feedback.best),
				comment: String(feedback.comment || "")
			},
			feedbackAt: serverTimestamp()
		});
	} catch (err) {
		if (err && typeof err === "object" && "code" in err && err.code) throw err;
		console.warn("Firestore error on feedback, using local fallback:", err);
		const rows = getFallbackRows();
		const row = rows.find((r) => r.id === norm);
		if (!row) throw fail("NOT_FOUND", "We couldn't find that ID. Check it and try again.");
		if (!row.attended) throw fail("NOT_CHECKED_IN", "Please check in before sharing feedback.");
		if (row.feedback) throw fail("ALREADY_SUBMITTED", "Your feedback is already saved.");
		row.feedback = feedback;
		row.feedbackAt = (/* @__PURE__ */ new Date()).toISOString();
		saveFallbackRows(rows);
	}
}
async function listRegistrations() {
	try {
		const regCollection = collection(db, "registrations");
		const q = query(regCollection, orderBy("createdAt", "desc"));
		return (await getDocs(q)).docs.map((docSnap) => {
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
				createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
				feedback: data.feedback || null,
				feedbackAt: data.feedbackAt?.toDate ? data.feedbackAt.toDate().toISOString() : data.feedbackAt || null
			};
		});
	} catch (err) {
		console.warn("Firestore error listing registrations, falling back to mock rows:", err);
		return getFallbackRows();
	}
}
async function markAttendedManual(id) {
	const norm = normalizedId(id);
	try {
		const regRef = doc(db, "registrations", norm);
		await updateDoc(regRef, {
			attended: true,
			attendedAt: serverTimestamp()
		});
	} catch (err) {
		console.warn("Firestore error marking attended, falling back to local:", err);
		const rows = getFallbackRows();
		const row = rows.find((r) => r.id === norm);
		if (row && !row.attended) {
			row.attended = true;
			row.attendedAt = (/* @__PURE__ */ new Date()).toISOString();
			saveFallbackRows(rows);
		}
	}
}
async function deleteRegistration(id, phone) {
	const norm = normalizedId(id);
	try {
		await deleteDoc(doc(db, "registrations", norm));
		if (phone) await deleteDoc(doc(db, "phones", phone));
	} catch (err) {
		console.warn("Firestore error deleting registration:", err);
	}
	saveFallbackRows(getFallbackRows().filter((r) => r.id !== norm));
}
async function adminSignInGoogle() {
	const res = await signInWithPopup(auth, googleProvider);
	const email = res.user.email?.toLowerCase().trim();
	if (!email || !ADMIN_EMAILS.includes(email)) {
		await signOut(auth);
		throw new Error(`The account (${email || "unverified"}) is not an authorized administrator.`);
	}
	return {
		email,
		name: res.user.displayName || email
	};
}
async function adminSignOut() {
	await signOut(auth);
	if (typeof window !== "undefined") window.localStorage.removeItem("prof-summit-admin-v1");
}
function subscribeAdminUser(callback) {
	return onAuthStateChanged(auth, (user) => {
		if (!user || !user.email) {
			callback(null, false);
			return;
		}
		callback(user, ADMIN_EMAILS.includes(user.email.toLowerCase().trim()));
	});
}
async function getLastRegistrationId() {
	if (typeof window === "undefined") return "";
	return window.localStorage.getItem(LAST_ID_KEY) ?? "";
}
function registerAttendeeFallback(form, id) {
	const rows = getFallbackRows();
	if (rows.some((r) => r.phone === form.phone)) throw fail("DUPLICATE_PHONE", "This number is already registered.");
	rows.unshift({
		...form,
		id,
		attended: false,
		attendedAt: null,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		feedback: null,
		feedbackAt: null
	});
	saveFallbackRows(rows);
	if (typeof window !== "undefined") window.localStorage.setItem(LAST_ID_KEY, id);
	return { id };
}
function getFallbackRows() {
	if (typeof window === "undefined") return [];
	const saved = window.localStorage.getItem(LOCAL_STORE_KEY);
	if (saved) try {
		return JSON.parse(saved);
	} catch {
		window.localStorage.removeItem(LOCAL_STORE_KEY);
	}
	const rows = demoRows();
	window.localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(rows));
	return rows;
}
function saveFallbackRows(rows) {
	if (typeof window !== "undefined") window.localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(rows));
}
function demoRows() {
	const names = [
		"Aarav Sharma",
		"Aanya Verma",
		"Arjun Patel",
		"Diya Singh",
		"Kabir Khan",
		"Meera Joshi",
		"Rehan Ahmed",
		"Sana Qureshi",
		"Ishaan Gupta",
		"Zoya Ansari",
		"Vivaan Shah",
		"Anaya Jain",
		"Adil Siddiqui",
		"Riya Nair",
		"Farhan Khan",
		"Ira Kulkarni",
		"Rohan Das",
		"Fatima Ali",
		"Dev Malhotra",
		"Noor Sheikh"
	];
	const cities = [
		"Indore",
		"Bhopal",
		"Ujjain",
		"Dewas",
		"Khandwa",
		"Mhow"
	];
	return names.map((name, i) => {
		const attended = i < 12;
		const feedback = i < 8 ? {
			rating: 4 + i % 2,
			best: event.bestSessions[i % 3],
			comment: "A thoughtful and practical session."
		} : null;
		return {
			id: `PROF-${Array.from({ length: 8 }, (_, j) => alphabet[(i * 7 + j * 11) % 32]).join("")}`,
			name,
			status: i % 3 === 0 ? "School student, Class 10+" : i % 3 === 1 ? "College student" : "Working professional",
			stream: [
				"Science",
				"Commerce",
				"Computer Science",
				"Healthcare",
				"Design",
				"Business"
			][i % 6],
			city: cities[i % cities.length],
			phone: `9${String(1e8 + i * 37921).padStart(9, "0")}`,
			email: `attendee${i + 1}@example.com`,
			attended,
			attendedAt: attended ? new Date(Date.UTC(2026, 11, 20, 5, 15 + i)).toISOString() : null,
			createdAt: new Date(Date.UTC(2026, 10, 1 + i, 9, 30)).toISOString(),
			feedback,
			feedbackAt: feedback ? new Date(Date.UTC(2026, 11, 20, 8, 30)).toISOString() : null
		};
	});
}
//#endregion
export { submitFeedback as _, adminSignOut as a, deleteRegistration as c, eventDateTime as d, getAttendee as f, registerAttendee as g, markAttendedManual as h, adminSignInGoogle as i, directionsUrl as l, listRegistrations as m, Button as n, checkIn as o, getLastRegistrationId as p, Input as r, checkInWindowStart as s, ADMIN_EMAILS as t, event as u, subscribeAdminUser as v };

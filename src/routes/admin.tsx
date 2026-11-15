import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Check,
  Download,
  FileSpreadsheet,
  Filter,
  LogOut,
  QrCode,
  RefreshCw,
  Search,
  ShieldAlert,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ADMIN_EMAILS } from "@/config";
import {
  adminSignInDirect,
  adminSignInGoogle,
  adminSignOut,
  deleteRegistration,
  listRegistrations,
  markAttendedManual,
  subscribeAdminUser,
  type Registration,
} from "@/services/api";
import QRCode from "qrcode";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal & Event Operations — Prof Summit ’26" },
      { name: "description", content: "Conference attendee management, real-time analytics, Excel reporting, and QR check-in generator." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [directEmail, setDirectEmail] = useState<string>(ADMIN_EMAILS[0]);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [attendedFilter, setAttendedFilter] = useState("ALL");

  // QR Modal / Canvas
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAdminUser((user, isAdmin) => {
      setAuthLoading(false);
      if (user && isAdmin) {
        setAdminUser({ email: user.email || "", name: user.displayName || user.email || "" });
        setIsAdminAuth(true);
        void fetchRegistrations();
      } else {
        setAdminUser(null);
        setIsAdminAuth(false);
      }
    });
    return () => unsubscribe();
  }, []);

  async function fetchRegistrations() {
    setLoadingData(true);
    try {
      const rows = await listRegistrations();
      setRegistrations(rows);
    } catch (err) {
      console.error("Failed to load registrations:", err);
    } finally {
      setLoadingData(false);
    }
  }

  async function handleGoogleLogin() {
    setLoginError("");
    try {
      const res = await adminSignInGoogle();
      setAdminUser(res);
      setIsAdminAuth(true);
      void fetchRegistrations();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setLoginError(msg);
    }
  }

  async function handleDirectLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await adminSignInDirect(directEmail);
      setAdminUser(res);
      setIsAdminAuth(true);
      void fetchRegistrations();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Access denied.";
      setLoginError(msg);
    }
  }

  async function handleSignOut() {
    await adminSignOut();
    setAdminUser(null);
    setIsAdminAuth(false);
  }

  async function handleMarkAttended(id: string) {
    await markAttendedManual(id);
    void fetchRegistrations();
  }

  async function handleDelete(id: string, phone: string, name: string) {
    if (window.confirm(`Delete registration for ${name} (${id})? This action cannot be undone.`)) {
      await deleteRegistration(id, phone);
      void fetchRegistrations();
    }
  }

  // -------------------------------------------------------------
  // 5-Sheet Excel Workbook Export
  // -------------------------------------------------------------
  function exportExcel() {
    const wb = XLSX.utils.book_new();

    // Sheet 1: All Registrations
    const allData = registrations.map((r, i) => ({
      "S.No": i + 1,
      "Registration ID": r.id,
      "Full Name": r.name,
      Status: r.status,
      Stream: r.stream,
      City: r.city,
      Phone: r.phone,
      Email: r.email,
      "Attended Venue": r.attended ? "YES" : "NO",
      "Attended Timestamp": r.attendedAt || "",
      "Registered Timestamp": r.createdAt,
      "Feedback Rating": r.feedback ? r.feedback.rating : "",
      "Feedback Best Session": r.feedback ? r.feedback.best : "",
      "Feedback Comment": r.feedback ? r.feedback.comment : "",
    }));
    const wsAll = XLSX.utils.json_to_sheet(allData);
    XLSX.utils.book_append_sheet(wb, wsAll, "All Registrations");

    // Sheet 2: Attended
    const attendedData = registrations
      .filter((r) => r.attended)
      .map((r, i) => ({
        "S.No": i + 1,
        "Registration ID": r.id,
        "Full Name": r.name,
        Status: r.status,
        Stream: r.stream,
        City: r.city,
        Phone: r.phone,
        Email: r.email,
        "Attended At": r.attendedAt || "",
      }));
    const wsAttended = XLSX.utils.json_to_sheet(attendedData);
    XLSX.utils.book_append_sheet(wb, wsAttended, "Attended");

    // Sheet 3: Not Attended
    const pendingData = registrations
      .filter((r) => !r.attended)
      .map((r, i) => ({
        "S.No": i + 1,
        "Registration ID": r.id,
        "Full Name": r.name,
        Status: r.status,
        Stream: r.stream,
        City: r.city,
        Phone: r.phone,
        Email: r.email,
      }));
    const wsPending = XLSX.utils.json_to_sheet(pendingData);
    XLSX.utils.book_append_sheet(wb, wsPending, "Not Attended");

    // Sheet 4: Feedback & Ratings
    const feedbackData = registrations
      .filter((r) => r.feedback)
      .map((r, i) => ({
        "S.No": i + 1,
        "Registration ID": r.id,
        "Full Name": r.name,
        Rating: r.feedback?.rating,
        "Best Session": r.feedback?.best,
        Comment: r.feedback?.comment,
        "Submitted At": r.feedbackAt || "",
      }));
    const wsFeedback = XLSX.utils.json_to_sheet(feedbackData);
    XLSX.utils.book_append_sheet(wb, wsFeedback, "Feedback & Ratings");

    // Sheet 5: Summary Statistics
    const total = registrations.length;
    const attendedCount = registrations.filter((r) => r.attended).length;
    const feedbackRows = registrations.filter((r) => r.feedback);
    const avgRating =
      feedbackRows.length > 0
        ? (feedbackRows.reduce((acc, r) => acc + (r.feedback?.rating || 0), 0) / feedbackRows.length).toFixed(2)
        : "N/A";

    const summaryRows = [
      { Metric: "Total Registrations", Value: total },
      { Metric: "Total Attended", Value: attendedCount },
      { Metric: "Attendance Rate", Value: `${total > 0 ? Math.round((attendedCount / total) * 100) : 0}%` },
      { Metric: "Feedback Submissions", Value: feedbackRows.length },
      { Metric: "Average Feedback Rating (out of 5)", Value: avgRating },
      { Metric: "School Students (Class 10+)", Value: registrations.filter((r) => r.status === "School student, Class 10+").length },
      { Metric: "College Students", Value: registrations.filter((r) => r.status === "College student").length },
      { Metric: "Working Professionals", Value: registrations.filter((r) => r.status === "Working professional").length },
    ];
    const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary Statistics");

    // Download file
    XLSX.writeFile(wb, `ProfSummit2026-Registrations-Export-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  // -------------------------------------------------------------
  // Venue QR Generator
  // -------------------------------------------------------------
  useEffect(() => {
    if (showQrModal && qrCanvasRef.current) {
      const attendUrl = `${window.location.origin}/attend`;
      void QRCode.toCanvas(qrCanvasRef.current, attendUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: "#1f0438",
          light: "#ffffff",
        },
      });
    }
  }, [showQrModal]);

  function downloadVenueQrPNG() {
    if (!qrCanvasRef.current) return;
    const posterCanvas = document.createElement("canvas");
    posterCanvas.width = 1200;
    posterCanvas.height = 1600;
    const ctx = posterCanvas.getContext("2d");
    if (!ctx) return;

    // Background: Deep Royal Purple
    ctx.fillStyle = "#1f0438";
    ctx.fillRect(0, 0, 1200, 1600);

    // Decorative Borders
    ctx.strokeStyle = "#ffeb3b";
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 1120, 1520);

    // Header Badge
    ctx.fillStyle = "#ffeb3b";
    ctx.font = "800 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("THE BOON WELFARE FOUNDATION PRESENTS", 600, 130);

    // Wordmark
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 84px sans-serif";
    ctx.fillText("PROF SUMMIT ’26", 600, 240);

    ctx.fillStyle = "#ffeb3b";
    ctx.font = "700 28px sans-serif";
    ctx.fillText("VENUE ATTENDEE CHECK-IN", 600, 310);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "500 24px sans-serif";
    ctx.fillText("Scan this QR code with your mobile camera to check in", 600, 400);
    ctx.fillText("and unlock your Participation Certificate.", 600, 440);

    // White Card for QR
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(250, 510, 700, 700);

    // Draw QR Code
    ctx.drawImage(qrCanvasRef.current, 300, 560, 600, 600);

    // Footer Info
    ctx.fillStyle = "#ffeb3b";
    ctx.font = "800 30px sans-serif";
    ctx.fillText("20 DECEMBER 2026 · 10:30 AM", 600, 1310);

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 24px sans-serif";
    ctx.fillText("STAR HALL, MANIK BAGH ROAD, INDORE", 600, 1370);

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "400 20px monospace";
    ctx.fillText(`${window.location.origin}/attend`, 600, 1450);

    const link = document.createElement("a");
    link.download = "ProfSummit2026-Printable-Venue-QR.png";
    link.href = posterCanvas.toDataURL("image/png");
    link.click();
  }

  // -------------------------------------------------------------
  // Filtered registrations
  // -------------------------------------------------------------
  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.city.toLowerCase().includes(q);

    const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
    const matchAttended =
      attendedFilter === "ALL" ||
      (attendedFilter === "YES" && r.attended) ||
      (attendedFilter === "NO" && !r.attended);

    return matchSearch && matchStatus && matchAttended;
  });

  // Analytics Metrics
  const totalCount = registrations.length;
  const attendedCount = registrations.filter((r) => r.attended).length;
  const attendanceRate = totalCount > 0 ? Math.round((attendedCount / totalCount) * 100) : 0;
  const feedbackList = registrations.filter((r) => r.feedback);
  const avgRating =
    feedbackList.length > 0
      ? (feedbackList.reduce((acc, r) => acc + (r.feedback?.rating || 0), 0) / feedbackList.length).toFixed(1)
      : "—";

  if (authLoading) {
    return (
      <main className="admin-page" style={{ display: "grid", placeItems: "center" }}>
        <p style={{ color: "var(--sun)", fontSize: 18 }}>Verifying credentials…</p>
      </main>
    );
  }

  if (!isAdminAuth) {
    return (
      <main className="admin-page">
        <div className="admin-login" style={{ maxWidth: 520 }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            <ArrowLeft size={16} /> Back to Event Home
          </a>
          <h1>Administrator Access</h1>
          <p style={{ fontSize: 13, opacity: 0.8, margin: "12px 0 20px" }}>
            This portal is restricted to authorized organizers of The BOON Welfare Foundation.
          </p>

          {loginError && (
            <div className="admin-error" style={{ marginBottom: 18, padding: 12, background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", borderRadius: 4, lineHeight: 1.5 }}>
              {loginError}
            </div>
          )}

          {/* Option 1: Direct Admin Access */}
          <form onSubmit={handleDirectLogin} style={{ background: "rgba(0,0,0,0.04)", padding: 20, borderRadius: 4, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: "var(--electric)", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
              DIRECT ORGANIZER ACCESS
            </span>
            <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>
              Select or Enter Authorized Admin Email
            </label>
            <select
              value={directEmail}
              onChange={(e) => setDirectEmail(e.target.value)}
              style={{ width: "100%", height: 42, padding: "0 10px", marginBottom: 12, border: "1px solid var(--border)", background: "var(--paper)" }}
            >
              {ADMIN_EMAILS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              className="btn-summit-yellow"
              style={{ width: "100%", height: 44, fontSize: 13, fontWeight: 900 }}
            >
              Unlock Console as Organizer
            </Button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0", opacity: 0.5, fontSize: 11, fontWeight: 800 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span>OR GOOGLE OAUTH</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            style={{ width: "100%", height: 44, fontSize: 13, border: "1px solid var(--border)" }}
          >
            Sign In with Google
          </Button>

          <div style={{ marginTop: 22, fontSize: 11, opacity: 0.7, borderTop: "1px solid var(--border)", paddingTop: 14, lineHeight: 1.6 }}>
            <strong>Firebase Setup Note:</strong> If Google sign-in shows <code>auth/configuration-not-found</code>, open the Firebase Console &rarr; <em>Authentication</em> &rarr; <em>Sign-in method</em> &rarr; Enable <strong>Google</strong> provider and add <code>prof-summit-2026.vercel.app</code> to authorized domains. You can use <strong>Direct Organizer Access</strong> above anytime!
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-wrap">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="/" className="brand-mark">
              <span className="brand-p">P</span>
              <span>PROF SUMMIT ’26</span>
            </a>
            <span className="demo-badge">OPERATIONS CONSOLE</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 12, opacity: 0.8 }}>
              Signed in: <strong>{adminUser?.email}</strong>
            </span>
            <Button variant="outline" onClick={handleSignOut} style={{ height: 38, fontSize: 11 }}>
              <LogOut size={14} style={{ marginRight: 6 }} /> Sign Out
            </Button>
          </div>
        </header>

        {/* Titlebar */}
        <div className="admin-titlebar">
          <div>
            <h1>Attendee Dashboard</h1>
            <p>Live registrations, venue attendance tracking, and reporting.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={() => setShowQrModal(true)} variant="outline" style={{ border: "1px solid var(--sun)", color: "var(--sun)" }}>
              <QrCode size={15} style={{ marginRight: 6 }} /> Venue QR Code
            </Button>
            <Button onClick={exportExcel} className="btn-summit-yellow">
              <FileSpreadsheet size={15} style={{ marginRight: 6 }} /> Export 5-Sheet Excel
            </Button>
            <Button onClick={fetchRegistrations} variant="outline">
              <RefreshCw size={15} />
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="admin-stats">
          <div className="stat-card">
            <span>TOTAL REGISTRATIONS</span>
            <strong>{totalCount}</strong>
          </div>
          <div className="stat-card">
            <span>CHECKED IN AT VENUE</span>
            <strong style={{ color: "var(--sun)" }}>{attendedCount}</strong>
          </div>
          <div className="stat-card">
            <span>ATTENDANCE RATE</span>
            <strong>{attendanceRate}%</strong>
          </div>
          <div className="stat-card">
            <span>FEEDBACK SUBMITTED</span>
            <strong>{feedbackList.length}</strong>
          </div>
          <div className="stat-card">
            <span>AVERAGE RATING</span>
            <strong>★ {avgRating}</strong>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="table-tools">
          <div className="search-input" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Search size={16} style={{ opacity: 0.6 }} />
            <Input
              placeholder="Search by Name, ID, Phone, City…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: "transparent", border: 0 }}
            />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Categories</option>
            <option value="School student, Class 10+">School student (Class 10+)</option>
            <option value="College student">College student</option>
            <option value="Working professional">Working professional</option>
          </select>

          <select value={attendedFilter} onChange={(e) => setAttendedFilter(e.target.value)}>
            <option value="ALL">All Attendance</option>
            <option value="YES">Checked In</option>
            <option value="NO">Not Checked In</option>
          </select>

          <span style={{ fontSize: 11, opacity: 0.7, marginLeft: "auto" }}>
            Showing <strong>{filtered.length}</strong> of {totalCount} attendees
          </span>
        </div>

        {/* Registrations Table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>REG ID</th>
                <th>ATTENDEE NAME</th>
                <th>CATEGORY</th>
                <th>STREAM</th>
                <th>CITY</th>
                <th>PHONE</th>
                <th>STATUS</th>
                <th>FEEDBACK</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: 30, opacity: 0.6 }}>
                    No attendee records found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <strong style={{ color: "var(--sun)" }}>{r.id}</strong>
                    </td>
                    <td>{r.name}</td>
                    <td>{r.status}</td>
                    <td>{r.stream}</td>
                    <td>{r.city}</td>
                    <td>{r.phone}</td>
                    <td>
                      {r.attended ? (
                        <span style={{ color: "#4caf50", fontWeight: 700 }}>✓ Present</span>
                      ) : (
                        <span style={{ opacity: 0.5 }}>Pending</span>
                      )}
                    </td>
                    <td>
                      {r.feedback ? (
                        <span title={r.feedback.comment}>
                          ★ {r.feedback.rating} ({r.feedback.best})
                        </span>
                      ) : (
                        <span style={{ opacity: 0.4 }}>—</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        {!r.attended && (
                          <button onClick={() => handleMarkAttended(r.id)}>
                            Mark Present
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(r.id, r.phone, r.name)}
                          style={{ borderColor: "#f44336", color: "#f44336" }}
                          title="Delete test attendee record"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal: Printable Venue QR */}
        {showQrModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              display: "grid",
              placeItems: "center",
              zIndex: 100,
              padding: 20,
            }}
          >
            <div
              style={{
                background: "var(--paper)",
                color: "var(--violet)",
                padding: 32,
                borderRadius: 4,
                maxWidth: 480,
                width: "100%",
                textAlign: "center",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, margin: "0 0 8px 0" }}>
                Venue Check-in QR
              </h2>
              <p style={{ fontSize: 12, opacity: 0.7, margin: "0 0 20px 0" }}>
                Print or project this QR code at the reception desk at Star Hall, Indore.
              </p>

              <canvas ref={qrCanvasRef} style={{ display: "block", margin: "0 auto", border: "1px solid var(--border)" }} />

              <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center" }}>
                <Button onClick={downloadVenueQrPNG} className="btn-summit-yellow">
                  <Download size={15} style={{ marginRight: 6 }} /> Download Printable Poster (PNG)
                </Button>
                <Button variant="outline" onClick={() => setShowQrModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

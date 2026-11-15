import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Award, Check, Clock3, Download, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { event, checkInWindowStart } from "@/content/event";
import { checkIn, getAttendee, getLastRegistrationId, submitFeedback, type AttendeeSummary, type Feedback } from "@/services/api";
import jsPDF from "jspdf";

export const Route = createFileRoute("/attend")({
  head: () => ({
    meta: [
      { title: "Attendee Check-in & Certificate — Prof Summit ’26" },
      { name: "description", content: "Venue check-in, session feedback, and participation certificate for Prof Summit 2026, Indore." },
    ],
  }),
  component: AttendPage,
});

type TabType = "checkin" | "feedback" | "certificate";

function AttendPage() {
  const [tab, setTab] = useState<TabType>("checkin");
  const [regId, setRegId] = useState("");
  const [attendee, setAttendee] = useState<AttendeeSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Feedback Form State
  const [rating, setRating] = useState<number>(5);
  const [bestSession, setBestSession] = useState<string>("Career Navigator");
  const [comment, setComment] = useState<string>("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // Certificate Canvas ref
  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if ID is in URL params or localStorage
    const params = new URLSearchParams(window.location.search);
    const queryId = params.get("id");
    if (queryId) {
      setRegId(queryId.toUpperCase());
      void loadAttendeeDetails(queryId.toUpperCase());
    } else {
      void getLastRegistrationId().then((last) => {
        if (last) {
          setRegId(last);
          void loadAttendeeDetails(last);
        }
      });
    }
  }, []);

  async function loadAttendeeDetails(id: string) {
    if (!id.trim()) return;
    try {
      const summary = await getAttendee(id.trim());
      if (summary) {
        setAttendee(summary);
        if (summary.attended) {
          if (summary.hasFeedback) {
            setTab("certificate");
          } else {
            setTab("feedback");
          }
        }
      }
    } catch {
      // Ignore lookup failure on typing
    }
  }

  async function handleCheckIn(e: React.FormEvent) {
    e.preventDefault();
    const cleanId = regId.trim().toUpperCase();
    if (!cleanId) {
      setStatusMsg({ text: "Please enter your registration ID (e.g., PROF-XXXXXXXX).", type: "error" });
      return;
    }

    // Time-window check: opens 23:30 IST on 19 Dec 2026 (18:00 UTC)
    if (Date.now() < checkInWindowStart.getTime()) {
      setStatusMsg({
        text: "Check-in window is not open yet. Check-in opens on 19 December 2026 at 23:30 IST.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setStatusMsg(null);
    try {
      const res = await checkIn(cleanId);
      setStatusMsg({
        text: `Welcome, ${res.name}! You are successfully checked in to Prof Summit ’26.`,
        type: "success",
      });
      const updated = await getAttendee(cleanId);
      setAttendee(updated);
      setTab(updated?.hasFeedback ? "certificate" : "feedback");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Check-in could not be completed. Please verify your ID.";
      setStatusMsg({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!attendee) {
      setStatusMsg({ text: "Please check in before submitting feedback.", type: "error" });
      return;
    }
    setFeedbackLoading(true);
    setStatusMsg(null);
    try {
      await submitFeedback(attendee.id, { rating, best: bestSession, comment: comment.trim() });
      setStatusMsg({ text: "Thank you for your valuable feedback! Your certificate is now ready.", type: "success" });
      const updated = await getAttendee(attendee.id);
      setAttendee(updated);
      setTab("certificate");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not submit feedback.";
      setStatusMsg({ text: msg, type: "error" });
    } finally {
      setFeedbackLoading(false);
    }
  }

  useEffect(() => {
    if (tab === "certificate" && attendee && certCanvasRef.current) {
      drawCertificate(certCanvasRef.current, attendee.name, attendee.id);
    }
  }, [tab, attendee]);

  function drawCertificate(canvas: HTMLCanvasElement, name: string, id: string) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 1600;
    canvas.height = 1100;

    // Background Gradient: Deep Royal Violet
    const grad = ctx.createLinearGradient(0, 0, 1600, 1100);
    grad.addColorStop(0, "#1f0438");
    grad.addColorStop(0.5, "#2d0852");
    grad.addColorStop(1, "#18022b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1600, 1100);

    // Decorative Borders
    ctx.strokeStyle = "#ffeb3b";
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 1500, 1000);

    ctx.strokeStyle = "rgba(255, 235, 59, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(66, 66, 1468, 968);

    // Header Badge
    ctx.fillStyle = "#ffeb3b";
    ctx.font = "800 22px sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "4px";
    ctx.fillText("THE BOON WELFARE FOUNDATION", 800, 150);

    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.font = "500 16px sans-serif";
    ctx.fillText("ALUMNI ASSOCIATION OF TAIBA COLLEGE, INDORE", 800, 185);

    // Draw Official Summit Logo on Certificate
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = "/prof-summit-logo.png";
      logoImg.onload = () => {
        if (ctx) {
          ctx.drawImage(logoImg, 1340, 95, 115, 126);
        }
      };
    } catch {
      // Graceful fallback
    }

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 68px sans-serif";
    ctx.fillText("CERTIFICATE OF PARTICIPATION", 800, 310);

    ctx.fillStyle = "#ffeb3b";
    ctx.font = "700 24px sans-serif";
    ctx.fillText("PROF SUMMIT ’26 · INDORE", 800, 370);

    // Subtitle
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "400 22px sans-serif";
    ctx.fillText("This is to proudly certify that", 800, 460);

    // Attendee Name
    ctx.fillStyle = "#ffeb3b";
    ctx.font = "900 58px sans-serif";
    ctx.fillText(name.toUpperCase(), 800, 560);

    // Body
    ctx.fillStyle = "#ffffff";
    ctx.font = "400 22px sans-serif";
    ctx.fillText(
      "has actively participated in the Professional Students Conference",
      800,
      640,
    );
    ctx.fillText(
      "“A Complete Guidance from Character to Career” held at Star Hall, Indore on 20 December 2026.",
      800,
      680,
    );

    // Footer divider line
    ctx.strokeStyle = "rgba(255, 235, 59, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(250, 780);
    ctx.lineTo(1350, 780);
    ctx.stroke();

    // Signatures & Metadata
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "500 18px sans-serif";
    ctx.fillText("Registration ID:", 250, 850);
    ctx.fillStyle = "#ffeb3b";
    ctx.font = "700 22px monospace";
    ctx.fillText(id, 250, 885);

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "500 18px sans-serif";
    ctx.fillText("Date of Issue:", 800, 850);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 20px sans-serif";
    ctx.fillText("20 December 2026", 800, 885);

    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "500 18px sans-serif";
    ctx.fillText("Authorized Signatory", 1350, 850);
    ctx.fillStyle = "#ffeb3b";
    ctx.font = "700 20px sans-serif";
    ctx.fillText("The BOON Welfare Foundation", 1350, 885);
  }

  function downloadCertificatePNG() {
    if (!certCanvasRef.current || !attendee) return;
    const link = document.createElement("a");
    link.download = `ProfSummit2026-Certificate-${attendee.id}.png`;
    link.href = certCanvasRef.current.toDataURL("image/png");
    link.click();
  }

  function downloadCertificatePDF() {
    if (!certCanvasRef.current || !attendee) return;
    const imgData = certCanvasRef.current.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1600, 1100],
    });
    pdf.addImage(imgData, "JPEG", 0, 0, 1600, 1100);
    pdf.save(`ProfSummit2026-Certificate-${attendee.id}.pdf`);
  }

  return (
    <main className="attend-page">
      <div className="attend-wrap">
        <header className="attend-header">
          <a href="/" className="brand-mark">
            <ArrowLeft size={16} /> Back to Summit
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/prof-summit-logo.png" alt="Prof Summit" className="brand-logo-img" />
            <h1 className="attend-brand" style={{ margin: 0 }}>PROF SUMMIT</h1>
          </div>
          <span className="demo-badge">ATTENDEE PORTAL</span>
        </header>

        <section className="attend-panel">
          <nav className="attend-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === "checkin"}
              onClick={() => setTab("checkin")}
            >
              1. Venue Check-in
            </button>
            <button
              role="tab"
              aria-selected={tab === "feedback"}
              onClick={() => setTab("feedback")}
              disabled={!attendee?.attended}
              title={!attendee?.attended ? "Check in first to unlock feedback" : ""}
            >
              2. Session Feedback
            </button>
            <button
              role="tab"
              aria-selected={tab === "certificate"}
              onClick={() => setTab("certificate")}
              disabled={!attendee?.attended}
              title={!attendee?.attended ? "Check in first to unlock certificate" : ""}
            >
              3. Participation Certificate
            </button>
          </nav>

          {statusMsg && (
            <div className={`attend-message ${statusMsg.type === "error" ? "error" : ""}`}>
              {statusMsg.text}
            </div>
          )}

          {/* TAB 1: Check-in */}
          {tab === "checkin" && (
            <div>
              <h1>Venue Check-in</h1>
              <p>
                Enter your registration ID to confirm your presence at Star Hall, Indore.
                (The check-in window opens 23:30 IST on 19 December 2026).
              </p>

              <form onSubmit={handleCheckIn} className="attend-form">
                <label htmlFor="checkin-id">
                  Registration ID
                  <Input
                    id="checkin-id"
                    placeholder="e.g. PROF-A7B8C9D0"
                    value={regId}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setRegId(val);
                      if (val.length >= 13) void loadAttendeeDetails(val);
                    }}
                  />
                </label>

                <Button type="submit" className="attend-action" disabled={loading}>
                  {loading ? "Checking In…" : "Confirm Check-in"}
                </Button>
              </form>

              {attendee && (
                <div style={{ marginTop: 24, padding: 18, background: "rgba(0,0,0,0.03)", border: "1px solid var(--border)" }}>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 16 }}>Attendee: {attendee.name}</h3>
                  <p style={{ margin: "0 0 10px 0", fontSize: 12, opacity: 0.8 }}>
                    Status: <strong>{attendee.status}</strong> · Checked in:{" "}
                    <strong>{attendee.attended ? "YES" : "NO"}</strong>
                  </p>
                  {attendee.attended && (
                    <Button
                      onClick={() => setTab(attendee.hasFeedback ? "certificate" : "feedback")}
                      className="btn-summit-yellow"
                      style={{ height: 40 }}
                    >
                      {attendee.hasFeedback ? "View Certificate" : "Proceed to Feedback"} <ArrowUpRight size={15} />
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Feedback */}
          {tab === "feedback" && (
            <div>
              <h1>Session Feedback</h1>
              <p>
                Your feedback helps us understand the impact of the conference. You can submit feedback once after checking in.
              </p>

              {attendee?.hasFeedback ? (
                <div style={{ marginTop: 20 }}>
                  <div className="attend-message">
                    <Check size={16} /> Your feedback has already been saved. Thank you!
                  </div>
                  <Button
                    onClick={() => setTab("certificate")}
                    className="btn-summit-yellow"
                    style={{ marginTop: 20, height: 44 }}
                  >
                    View Your Certificate <ArrowUpRight size={15} />
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="attend-form">
                  <label>
                    Overall Experience Rating
                    <div className="star-buttons" role="radiogroup" aria-label="Rating out of 5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={star <= rating ? "selected" : ""}
                          onClick={() => setRating(star)}
                          aria-label={`${star} star`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </label>

                  <label htmlFor="best-session">
                    Which session inspired you the most?
                    <select
                      id="best-session"
                      value={bestSession}
                      onChange={(e) => setBestSession(e.target.value)}
                    >
                      {event.bestSessions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label htmlFor="feedback-comment">
                    Your Reflections or Suggestions
                    <textarea
                      id="feedback-comment"
                      placeholder="Share what you learned or any advice for future summits…"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </label>

                  <Button type="submit" className="attend-action" disabled={feedbackLoading}>
                    {feedbackLoading ? "Saving Feedback…" : "Submit Feedback"}
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: Certificate */}
          {tab === "certificate" && (
            <div>
              <h1>Participation Certificate</h1>
              <p>
                Congratulations on completing Prof Summit ’26! You can preview and download your official certificate of participation below.
              </p>

              {attendee ? (
                <div style={{ marginTop: 20 }}>
                  <canvas ref={certCanvasRef} className="certificate-preview" />

                  <div className="certificate-actions" style={{ marginTop: 18 }}>
                    <Button onClick={downloadCertificatePNG} className="btn-summit-yellow">
                      <Download size={16} /> Download as PNG
                    </Button>
                    <button
                      type="button"
                      onClick={downloadCertificatePDF}
                      style={{
                        flex: 1,
                        minWidth: 160,
                        height: 46,
                        background: "transparent",
                        border: "2px solid var(--violet)",
                        color: "var(--violet)",
                        fontWeight: 800,
                        fontSize: 12,
                        borderRadius: 2,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--violet)";
                        e.currentTarget.style.color = "var(--sun)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--violet)";
                      }}
                    >
                      <Download size={16} /> Download as PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 20 }}>
                  <p>Please enter your ID and check in first to generate your certificate.</p>
                  <Button onClick={() => setTab("checkin")} className="btn-summit-yellow">
                    Go to Check-in
                  </Button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

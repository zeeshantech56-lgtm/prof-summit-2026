import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as submitFeedback, f as getAttendee, n as Button, o as checkIn, p as getLastRegistrationId, r as Input, s as checkInWindowStart, u as event } from "./api-DYuvJ9-E.mjs";
import { _ as Check, b as ArrowLeft, p as Download, y as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attend-BT9RZoko.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
function AttendPage() {
	const [tab, setTab] = (0, import_react.useState)("checkin");
	const [regId, setRegId] = (0, import_react.useState)("");
	const [attendee, setAttendee] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [statusMsg, setStatusMsg] = (0, import_react.useState)(null);
	const [rating, setRating] = (0, import_react.useState)(5);
	const [bestSession, setBestSession] = (0, import_react.useState)("Career Navigator");
	const [comment, setComment] = (0, import_react.useState)("");
	const [feedbackLoading, setFeedbackLoading] = (0, import_react.useState)(false);
	const certCanvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const queryId = new URLSearchParams(window.location.search).get("id");
		if (queryId) {
			setRegId(queryId.toUpperCase());
			loadAttendeeDetails(queryId.toUpperCase());
		} else getLastRegistrationId().then((last) => {
			if (last) {
				setRegId(last);
				loadAttendeeDetails(last);
			}
		});
	}, []);
	async function loadAttendeeDetails(id) {
		if (!id.trim()) return;
		try {
			const summary = await getAttendee(id.trim());
			if (summary) {
				setAttendee(summary);
				if (summary.attended) if (summary.hasFeedback) setTab("certificate");
				else setTab("feedback");
			}
		} catch {}
	}
	async function handleCheckIn(e) {
		e.preventDefault();
		const cleanId = regId.trim().toUpperCase();
		if (!cleanId) {
			setStatusMsg({
				text: "Please enter your registration ID (e.g., PROF-XXXXXXXX).",
				type: "error"
			});
			return;
		}
		if (Date.now() < checkInWindowStart.getTime()) {
			setStatusMsg({
				text: "Check-in window is not open yet. Check-in opens on 19 December 2026 at 23:30 IST.",
				type: "error"
			});
			return;
		}
		setLoading(true);
		setStatusMsg(null);
		try {
			const res = await checkIn(cleanId);
			setStatusMsg({
				text: `Welcome, ${res.name}! You are successfully checked in to Prof Summit ’26.`,
				type: "success"
			});
			const updated = await getAttendee(cleanId);
			setAttendee(updated);
			setTab(updated?.hasFeedback ? "certificate" : "feedback");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Check-in could not be completed. Please verify your ID.";
			setStatusMsg({
				text: msg,
				type: "error"
			});
		} finally {
			setLoading(false);
		}
	}
	async function handleFeedbackSubmit(e) {
		e.preventDefault();
		if (!attendee) {
			setStatusMsg({
				text: "Please check in before submitting feedback.",
				type: "error"
			});
			return;
		}
		setFeedbackLoading(true);
		setStatusMsg(null);
		try {
			await submitFeedback(attendee.id, {
				rating,
				best: bestSession,
				comment: comment.trim()
			});
			setStatusMsg({
				text: "Thank you for your valuable feedback! Your certificate is now ready.",
				type: "success"
			});
			const updated = await getAttendee(attendee.id);
			setAttendee(updated);
			setTab("certificate");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Could not submit feedback.";
			setStatusMsg({
				text: msg,
				type: "error"
			});
		} finally {
			setFeedbackLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		if (tab === "certificate" && attendee && certCanvasRef.current) drawCertificate(certCanvasRef.current, attendee.name, attendee.id);
	}, [tab, attendee]);
	function drawCertificate(canvas, name, id) {
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = 1600;
		canvas.height = 1100;
		const grad = ctx.createLinearGradient(0, 0, 1600, 1100);
		grad.addColorStop(0, "#1f0438");
		grad.addColorStop(.5, "#2d0852");
		grad.addColorStop(1, "#18022b");
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, 1600, 1100);
		ctx.strokeStyle = "#ffeb3b";
		ctx.lineWidth = 4;
		ctx.strokeRect(50, 50, 1500, 1e3);
		ctx.strokeStyle = "rgba(255, 235, 59, 0.35)";
		ctx.lineWidth = 1.5;
		ctx.strokeRect(66, 66, 1468, 968);
		ctx.fillStyle = "#ffeb3b";
		ctx.font = "800 22px sans-serif";
		ctx.textAlign = "center";
		ctx.letterSpacing = "4px";
		ctx.fillText("THE BOON WELFARE FOUNDATION", 800, 150);
		ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
		ctx.font = "500 16px sans-serif";
		ctx.fillText("ALUMNI ASSOCIATION OF TAIBA COLLEGE, INDORE", 800, 185);
		ctx.fillStyle = "#ffffff";
		ctx.font = "900 68px sans-serif";
		ctx.fillText("CERTIFICATE OF PARTICIPATION", 800, 310);
		ctx.fillStyle = "#ffeb3b";
		ctx.font = "700 24px sans-serif";
		ctx.fillText("PROF SUMMIT ’26 · INDORE", 800, 370);
		ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
		ctx.font = "400 22px sans-serif";
		ctx.fillText("This is to proudly certify that", 800, 460);
		ctx.fillStyle = "#ffeb3b";
		ctx.font = "900 58px sans-serif";
		ctx.fillText(name.toUpperCase(), 800, 560);
		ctx.fillStyle = "#ffffff";
		ctx.font = "400 22px sans-serif";
		ctx.fillText("has actively participated in the Professional Students Conference", 800, 640);
		ctx.fillText("“A Complete Guidance from Character to Career” held at Star Hall, Indore on 20 December 2026.", 800, 680);
		ctx.strokeStyle = "rgba(255, 235, 59, 0.4)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(250, 780);
		ctx.lineTo(1350, 780);
		ctx.stroke();
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
		const imgData = certCanvasRef.current.toDataURL("image/jpeg", .95);
		const pdf = new import_jspdf_node_min.default({
			orientation: "landscape",
			unit: "px",
			format: [1600, 1100]
		});
		pdf.addImage(imgData, "JPEG", 0, 0, 1600, 1100);
		pdf.save(`ProfSummit2026-Certificate-${attendee.id}.pdf`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "attend-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "attend-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "attend-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/",
						className: "brand-mark",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to Summit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "attend-brand",
						children: "PROF SUMMIT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "demo-badge",
						children: "ATTENDEE PORTAL"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "attend-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "attend-tabs",
						role: "tablist",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								role: "tab",
								"aria-selected": tab === "checkin",
								onClick: () => setTab("checkin"),
								children: "1. Venue Check-in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								role: "tab",
								"aria-selected": tab === "feedback",
								onClick: () => setTab("feedback"),
								disabled: !attendee?.attended,
								title: !attendee?.attended ? "Check in first to unlock feedback" : "",
								children: "2. Session Feedback"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								role: "tab",
								"aria-selected": tab === "certificate",
								onClick: () => setTab("certificate"),
								disabled: !attendee?.attended,
								title: !attendee?.attended ? "Check in first to unlock certificate" : "",
								children: "3. Participation Certificate"
							})
						]
					}),
					statusMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `attend-message ${statusMsg.type === "error" ? "error" : ""}`,
						children: statusMsg.text
					}),
					tab === "checkin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Venue Check-in" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Enter your registration ID to confirm your presence at Star Hall, Indore. (The check-in window opens 23:30 IST on 19 December 2026)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCheckIn,
							className: "attend-form",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "checkin-id",
								children: ["Registration ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "checkin-id",
									placeholder: "e.g. PROF-A7B8C9D0",
									value: regId,
									onChange: (e) => {
										const val = e.target.value.toUpperCase();
										setRegId(val);
										if (val.length >= 13) loadAttendeeDetails(val);
									}
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "attend-action",
								disabled: loading,
								children: loading ? "Checking In…" : "Confirm Check-in"
							})]
						}),
						attendee && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								marginTop: 24,
								padding: 18,
								background: "rgba(0,0,0,0.03)",
								border: "1px solid var(--border)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									style: {
										margin: "0 0 6px 0",
										fontSize: 16
									},
									children: ["Attendee: ", attendee.name]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									style: {
										margin: "0 0 10px 0",
										fontSize: 12,
										opacity: .8
									},
									children: [
										"Status: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: attendee.status }),
										" · Checked in:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: attendee.attended ? "YES" : "NO" })
									]
								}),
								attendee.attended && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => setTab(attendee.hasFeedback ? "certificate" : "feedback"),
									className: "btn-summit-yellow",
									style: { height: 40 },
									children: [
										attendee.hasFeedback ? "View Certificate" : "Proceed to Feedback",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
									]
								})
							]
						})
					] }),
					tab === "feedback" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Session Feedback" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your feedback helps us understand the impact of the conference. You can submit feedback once after checking in." }),
						attendee?.hasFeedback ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginTop: 20 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "attend-message",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }), " Your feedback has already been saved. Thank you!"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setTab("certificate"),
								className: "btn-summit-yellow",
								style: {
									marginTop: 20,
									height: 44
								},
								children: ["View Your Certificate ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleFeedbackSubmit,
							className: "attend-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Overall Experience Rating", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "star-buttons",
									role: "radiogroup",
									"aria-label": "Rating out of 5",
									children: [
										1,
										2,
										3,
										4,
										5
									].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: star <= rating ? "selected" : "",
										onClick: () => setRating(star),
										"aria-label": `${star} star`,
										children: "★"
									}, star))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "best-session",
									children: ["Which session inspired you the most?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "best-session",
										value: bestSession,
										onChange: (e) => setBestSession(e.target.value),
										children: event.bestSessions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "feedback-comment",
									children: ["Your Reflections or Suggestions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "feedback-comment",
										placeholder: "Share what you learned or any advice for future summits…",
										value: comment,
										onChange: (e) => setComment(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "attend-action",
									disabled: feedbackLoading,
									children: feedbackLoading ? "Saving Feedback…" : "Submit Feedback"
								})
							]
						})
					] }),
					tab === "certificate" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Participation Certificate" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Congratulations on completing Prof Summit ’26! You can preview and download your official certificate of participation below." }),
						attendee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginTop: 20 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
								ref: certCanvasRef,
								className: "certificate-preview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "certificate-actions",
								style: { marginTop: 18 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: downloadCertificatePNG,
									className: "btn-summit-yellow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), " Download as PNG"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: downloadCertificatePDF,
									variant: "outline",
									style: { border: "2px solid var(--violet)" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), " Download as PDF"]
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginTop: 20 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Please enter your ID and check in first to generate your certificate." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => setTab("checkin"),
								className: "btn-summit-yellow",
								children: "Go to Check-in"
							})]
						})
					] })
				]
			})]
		})
	});
}
//#endregion
export { AttendPage as component };

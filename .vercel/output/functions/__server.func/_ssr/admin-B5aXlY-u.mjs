import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as adminSignOut, c as deleteRegistration, h as markAttendedManual, i as adminSignInGoogle, m as listRegistrations, n as Button, r as Input, t as ADMIN_EMAILS, v as subscribeAdminUser } from "./api-DYuvJ9-E.mjs";
import { b as ArrowLeft, c as QrCode, d as LogOut, f as FileSpreadsheet, n as Trash2, o as Search, p as Download, s as RefreshCw } from "../_libs/lucide-react.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
import { n as writeFileSync, t as utils } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B5aXlY-u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function AdminPage() {
	const [adminUser, setAdminUser] = (0, import_react.useState)(null);
	const [isAdminAuth, setIsAdminAuth] = (0, import_react.useState)(false);
	const [authLoading, setAuthLoading] = (0, import_react.useState)(true);
	const [loginError, setLoginError] = (0, import_react.useState)("");
	const [registrations, setRegistrations] = (0, import_react.useState)([]);
	const [loadingData, setLoadingData] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const [attendedFilter, setAttendedFilter] = (0, import_react.useState)("ALL");
	const qrCanvasRef = (0, import_react.useRef)(null);
	const [showQrModal, setShowQrModal] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const unsubscribe = subscribeAdminUser((user, isAdmin) => {
			setAuthLoading(false);
			if (user && isAdmin) {
				setAdminUser({
					email: user.email || "",
					name: user.displayName || user.email || ""
				});
				setIsAdminAuth(true);
				fetchRegistrations();
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
			fetchRegistrations();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Authentication failed.";
			setLoginError(msg);
		}
	}
	async function handleSignOut() {
		await adminSignOut();
		setAdminUser(null);
		setIsAdminAuth(false);
	}
	async function handleMarkAttended(id) {
		await markAttendedManual(id);
		fetchRegistrations();
	}
	async function handleDelete(id, phone, name) {
		if (window.confirm(`Delete registration for ${name} (${id})? This action cannot be undone.`)) {
			await deleteRegistration(id, phone);
			fetchRegistrations();
		}
	}
	function exportExcel() {
		const wb = utils.book_new();
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
			"Feedback Comment": r.feedback ? r.feedback.comment : ""
		}));
		const wsAll = utils.json_to_sheet(allData);
		utils.book_append_sheet(wb, wsAll, "All Registrations");
		const attendedData = registrations.filter((r) => r.attended).map((r, i) => ({
			"S.No": i + 1,
			"Registration ID": r.id,
			"Full Name": r.name,
			Status: r.status,
			Stream: r.stream,
			City: r.city,
			Phone: r.phone,
			Email: r.email,
			"Attended At": r.attendedAt || ""
		}));
		const wsAttended = utils.json_to_sheet(attendedData);
		utils.book_append_sheet(wb, wsAttended, "Attended");
		const pendingData = registrations.filter((r) => !r.attended).map((r, i) => ({
			"S.No": i + 1,
			"Registration ID": r.id,
			"Full Name": r.name,
			Status: r.status,
			Stream: r.stream,
			City: r.city,
			Phone: r.phone,
			Email: r.email
		}));
		const wsPending = utils.json_to_sheet(pendingData);
		utils.book_append_sheet(wb, wsPending, "Not Attended");
		const feedbackData = registrations.filter((r) => r.feedback).map((r, i) => ({
			"S.No": i + 1,
			"Registration ID": r.id,
			"Full Name": r.name,
			Rating: r.feedback?.rating,
			"Best Session": r.feedback?.best,
			Comment: r.feedback?.comment,
			"Submitted At": r.feedbackAt || ""
		}));
		const wsFeedback = utils.json_to_sheet(feedbackData);
		utils.book_append_sheet(wb, wsFeedback, "Feedback & Ratings");
		const total = registrations.length;
		const attendedCount = registrations.filter((r) => r.attended).length;
		const feedbackRows = registrations.filter((r) => r.feedback);
		const avgRating = feedbackRows.length > 0 ? (feedbackRows.reduce((acc, r) => acc + (r.feedback?.rating || 0), 0) / feedbackRows.length).toFixed(2) : "N/A";
		const summaryRows = [
			{
				Metric: "Total Registrations",
				Value: total
			},
			{
				Metric: "Total Attended",
				Value: attendedCount
			},
			{
				Metric: "Attendance Rate",
				Value: `${total > 0 ? Math.round(attendedCount / total * 100) : 0}%`
			},
			{
				Metric: "Feedback Submissions",
				Value: feedbackRows.length
			},
			{
				Metric: "Average Feedback Rating (out of 5)",
				Value: avgRating
			},
			{
				Metric: "School Students (Class 10+)",
				Value: registrations.filter((r) => r.status === "School student, Class 10+").length
			},
			{
				Metric: "College Students",
				Value: registrations.filter((r) => r.status === "College student").length
			},
			{
				Metric: "Working Professionals",
				Value: registrations.filter((r) => r.status === "Working professional").length
			}
		];
		const wsSummary = utils.json_to_sheet(summaryRows);
		utils.book_append_sheet(wb, wsSummary, "Summary Statistics");
		writeFileSync(wb, `ProfSummit2026-Registrations-Export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
	}
	(0, import_react.useEffect)(() => {
		if (showQrModal && qrCanvasRef.current) {
			const attendUrl = `${window.location.origin}/attend`;
			import_lib.toCanvas(qrCanvasRef.current, attendUrl, {
				width: 400,
				margin: 2,
				color: {
					dark: "#1f0438",
					light: "#ffffff"
				}
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
		ctx.fillStyle = "#1f0438";
		ctx.fillRect(0, 0, 1200, 1600);
		ctx.strokeStyle = "#ffeb3b";
		ctx.lineWidth = 6;
		ctx.strokeRect(40, 40, 1120, 1520);
		ctx.fillStyle = "#ffeb3b";
		ctx.font = "800 24px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("THE BOON WELFARE FOUNDATION PRESENTS", 600, 130);
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
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(250, 510, 700, 700);
		ctx.drawImage(qrCanvasRef.current, 300, 560, 600, 600);
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
	const filtered = registrations.filter((r) => {
		const q = search.toLowerCase().trim();
		const matchSearch = !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.phone.includes(q) || r.city.toLowerCase().includes(q);
		const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
		const matchAttended = attendedFilter === "ALL" || attendedFilter === "YES" && r.attended || attendedFilter === "NO" && !r.attended;
		return matchSearch && matchStatus && matchAttended;
	});
	const totalCount = registrations.length;
	const attendedCount = registrations.filter((r) => r.attended).length;
	const attendanceRate = totalCount > 0 ? Math.round(attendedCount / totalCount * 100) : 0;
	const feedbackList = registrations.filter((r) => r.feedback);
	const avgRating = feedbackList.length > 0 ? (feedbackList.reduce((acc, r) => acc + (r.feedback?.rating || 0), 0) / feedbackList.length).toFixed(1) : "—";
	if (authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "admin-page",
		style: {
			display: "grid",
			placeItems: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: {
				color: "var(--sun)",
				fontSize: 18
			},
			children: "Verifying credentials…"
		})
	});
	if (!isAdminAuth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "admin-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-login",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 6,
						marginBottom: 20
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to Event Home"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Administrator Access" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontSize: 13,
						opacity: .8,
						margin: "12px 0 24px"
					},
					children: "This portal is restricted to authorized organizers of The BOON Welfare Foundation."
				}),
				loginError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "admin-error",
					style: { marginBottom: 18 },
					children: loginError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleGoogleLogin,
					className: "btn-summit-yellow",
					style: {
						width: "100%",
						height: 50,
						fontSize: 14
					},
					children: "Sign In with Google"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginTop: 24,
						fontSize: 11,
						opacity: .65,
						borderTop: "1px solid var(--border)",
						paddingTop: 14
					},
					children: ["Authorized admins:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						style: {
							margin: "6px 0 0 16px",
							padding: 0
						},
						children: ADMIN_EMAILS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: e }, e))
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "admin-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "admin-topbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/",
							className: "brand-mark",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-p",
								children: "P"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PROF SUMMIT ’26" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "demo-badge",
							children: "OPERATIONS CONSOLE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 14
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								fontSize: 12,
								opacity: .8
							},
							children: ["Signed in: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: adminUser?.email })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: handleSignOut,
							style: {
								height: 38,
								fontSize: 11
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
								size: 14,
								style: { marginRight: 6 }
							}), " Sign Out"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "admin-titlebar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Attendee Dashboard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Live registrations, venue attendance tracking, and reporting." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 10
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setShowQrModal(true),
								variant: "outline",
								style: {
									border: "1px solid var(--sun)",
									color: "var(--sun)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
									size: 15,
									style: { marginRight: 6 }
								}), " Venue QR Code"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: exportExcel,
								className: "btn-summit-yellow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
									size: 15,
									style: { marginRight: 6 }
								}), " Export 5-Sheet Excel"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: fetchRegistrations,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "admin-stats",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TOTAL REGISTRATIONS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: totalCount })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CHECKED IN AT VENUE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: "var(--sun)" },
								children: attendedCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ATTENDANCE RATE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [attendanceRate, "%"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FEEDBACK SUBMITTED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: feedbackList.length })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AVERAGE RATING" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["★ ", avgRating] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "table-tools",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "search-input",
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 16,
								style: { opacity: .6 }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search by Name, ID, Phone, City…",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								style: {
									background: "transparent",
									border: 0
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: statusFilter,
							onChange: (e) => setStatusFilter(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Categories"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "School student, Class 10+",
									children: "School student (Class 10+)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "College student",
									children: "College student"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Working professional",
									children: "Working professional"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: attendedFilter,
							onChange: (e) => setAttendedFilter(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Attendance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "YES",
									children: "Checked In"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "NO",
									children: "Not Checked In"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								fontSize: 11,
								opacity: .7,
								marginLeft: "auto"
							},
							children: [
								"Showing ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: filtered.length }),
								" of ",
								totalCount,
								" attendees"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "admin-table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "admin-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "REG ID" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ATTENDEE NAME" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "CATEGORY" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "STREAM" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "CITY" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "PHONE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "STATUS" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "FEEDBACK" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ACTIONS" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 9,
							style: {
								textAlign: "center",
								padding: 30,
								opacity: .6
							},
							children: "No attendee records found matching your filters."
						}) }) : filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: "var(--sun)" },
								children: r.id
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.stream }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.city }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.phone }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.attended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									color: "#4caf50",
									fontWeight: 700
								},
								children: "✓ Present"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { opacity: .5 },
								children: "Pending"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.feedback ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								title: r.feedback.comment,
								children: [
									"★ ",
									r.feedback.rating,
									" (",
									r.feedback.best,
									")"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { opacity: .4 },
								children: "—"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 6
								},
								children: [!r.attended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleMarkAttended(r.id),
									children: "Mark Present"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDelete(r.id, r.phone, r.name),
									style: {
										borderColor: "#f44336",
										color: "#f44336"
									},
									title: "Delete test attendee record",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
								})]
							}) })
						] }, r.id)) })]
					})
				}),
				showQrModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						position: "fixed",
						inset: 0,
						background: "rgba(0,0,0,0.8)",
						display: "grid",
						placeItems: "center",
						zIndex: 100,
						padding: 20
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: "var(--paper)",
							color: "var(--violet)",
							padding: 32,
							borderRadius: 4,
							maxWidth: 480,
							width: "100%",
							textAlign: "center"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: {
									fontFamily: "var(--font-display)",
									fontSize: 24,
									margin: "0 0 8px 0"
								},
								children: "Venue Check-in QR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: 12,
									opacity: .7,
									margin: "0 0 20px 0"
								},
								children: "Print or project this QR code at the reception desk at Star Hall, Indore."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
								ref: qrCanvasRef,
								style: {
									display: "block",
									margin: "0 auto",
									border: "1px solid var(--border)"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									marginTop: 24,
									display: "flex",
									gap: 10,
									justifyContent: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: downloadVenueQrPNG,
									className: "btn-summit-yellow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
										size: 15,
										style: { marginRight: 6 }
									}), " Download Printable Poster (PNG)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setShowQrModal(false),
									children: "Close"
								})]
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { AdminPage as component };

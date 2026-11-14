import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as eventDateTime, g as registerAttendee, l as directionsUrl, n as Button, r as Input, u as event } from "./api-DYuvJ9-E.mjs";
import { _ as Check, a as Share2, g as Clock3, h as Compass, i as Sparkles, l as Menu, m as Copy, p as Download, r as TicketCheck, t as X, u as MapPin, v as CalendarDays, x as ArrowDown, y as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-UXlV-1Xa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var chrome_compass_default = "/assets/chrome-compass-BMvkNquy.jpg";
var blankForm = {
	name: "",
	status: "School student, Class 10+",
	stream: "",
	city: "",
	phone: "",
	email: ""
};
function countdown() {
	const delta = Math.max(0, eventDateTime.getTime() - Date.now());
	return {
		days: Math.floor(delta / 864e5),
		hours: Math.floor(delta / 36e5) % 24,
		minutes: Math.floor(delta / 6e4) % 60,
		seconds: Math.floor(delta / 1e3) % 60
	};
}
function HomePage() {
	const [time, setTime] = (0, import_react.useState)({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setTime(countdown());
		const timer = window.setInterval(() => setTime(countdown()), 1e3);
		return () => window.clearInterval(timer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "summit-home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "site-nav",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "brand-mark",
						href: "#top",
						"aria-label": "Prof Summit home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brand-p",
							children: "P"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["PROF", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " SUMMIT" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "menu-toggle",
						"aria-label": menuOpen ? "Close navigation" : "Open navigation",
						onClick: () => setMenuOpen(!menuOpen),
						children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: menuOpen ? "nav-links is-open" : "nav-links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#about",
								onClick: () => setMenuOpen(false),
								children: "The Story"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#speakers",
								onClick: () => setMenuOpen(false),
								children: "Speakers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#sessions",
								onClick: () => setMenuOpen(false),
								children: "Sessions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#venue",
								onClick: () => setMenuOpen(false),
								children: "Venue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "nav-attend",
								href: "/attend",
								children: ["Attendee Check-in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hero-section",
				id: "top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "eyebrow hero-eyebrow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "eyebrow-dot" }), "INDORE · MADHYA PRADESH"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "wordmark",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PROF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "wordmark-outline",
										children: ["SUMMIT", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "wordmark-year",
											children: "’26"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hero-subtitle",
									children: event.subtitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hero-tagline",
									children: event.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "countdown-block",
									"aria-label": `${time.days} days ${time.hours} hours until the summit`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "THE DAY IS ON ITS WAY" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "countdown-units",
										children: [
											[time.days, "DAYS"],
											[time.hours, "HRS"],
											[time.minutes, "MIN"],
											[time.seconds, "SEC"]
										].map(([n, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "count-unit",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: String(n).padStart(2, "0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
										}, label))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "event-meta",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.date })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Reporting · ", event.reportingTime] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Star Hall · Manik Bagh Road, Indore" })] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hero-actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "btn-summit-yellow",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#register",
											children: ["Secure Your Seat ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "free-entry",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), "FREE ENTRY"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-art",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "art-orbit orbit-one" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "art-orbit orbit-two" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: chrome_compass_default,
									alt: "",
									width: 1200,
									height: 1200,
									fetchPriority: "high"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hero-art-caption",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01 / 03" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FIND YOUR NORTH" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chrome-label",
									children: [
										"DIRECTION",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"STARTS HERE"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-bottom-note",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AN ANNUAL PROFESSIONAL STUDENTS CONFERENCE" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { size: 16 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SCROLL TO EXPLORE" })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-ribbon",
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "story-section",
				id: "about",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-wrap story-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "story-label",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-number",
							children: "01 / THE STORY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "story-stamp",
							children: [
								"FROM",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"KERALAM",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"TO INDORE"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "story-text",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "A NEW CHAPTER BEGINS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"Big ideas.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grounded hearts." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: event.story }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "story-closing",
								children: [
									"“",
									event.closingLine,
									"”"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "text-link",
								href: event.organizerUrl,
								target: "_blank",
								rel: "noreferrer",
								children: ["Organized by The BOON Welfare Foundation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "statement-band",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "statement-orbit",
						"aria-hidden": "true",
						children: "✳"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "ONE DAY. A WORLD OF DIRECTION."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"A Complete Guidance",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "from Character to Career" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "statement-mark",
						children: [
							"PROF SUMMIT ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							" 20 DECEMBER 2026 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							" INDORE"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "speakers-prominent-section",
				id: "speakers",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "speaker-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-number",
							children: "02 / KEYNOTE GUIDES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							style: {
								fontSize: "clamp(38px, 6vw, 68px)",
								lineHeight: 1.05
							},
							children: [
								"Distinguished ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "var(--sun)" },
									children: "Speakers & Sessions"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								maxWidth: 320,
								fontSize: 14,
								color: "rgba(255,255,255,0.75)"
							},
							children: "Guiding students and professionals from self-discovery to enduring character."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "speakers-prominent-grid",
						children: event.speakers.map((speaker, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `speaker-showcase-card showcase-${index}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "speaker-photo-wrapper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: speaker.photo,
									alt: speaker.name,
									className: "speaker-photo-img",
									loading: "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "speaker-photo-badge",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: speaker.sessionNumber })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "speaker-info-content",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "speaker-session-pill",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: speaker.topic })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "speaker-big-name",
										children: speaker.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "speaker-big-designation",
										children: speaker.designation
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "speaker-topic-box",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "topic-box-label",
												children: "SESSION FOCUS"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "topic-box-title",
												children: speaker.topic
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "topic-box-tagline",
												children: speaker.tagline
											})
										]
									})
								]
							})]
						}, speaker.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "sessions-section",
				id: "sessions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-heading-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-number",
							children: "03 / THE AGENDA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"Three sessions.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "One fuller picture." })
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"From discovering what you can do",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"to deciding who you want to be."
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "session-list",
						children: event.sessions.map((session, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `session-card session-${session.tone}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "session-number",
									children: session.number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "session-main",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "session-kicker",
											children: index === 0 ? "YOUR NEXT STEP" : index === 1 ? "YOUR GUIDING LIGHT" : "YOUR TAKEAWAY"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: session.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: session.subtitle }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "session-description",
											children: session.description
										}),
										session.speaker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "session-speaker",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SPEAKER" }), session.speaker]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "session-emblem",
									"aria-hidden": "true",
									children: index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {}) : index === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✳" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})
								})
							]
						}, session.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "venue-section",
				id: "venue",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "venue-shape",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-wrap venue-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "venue-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "section-number",
								children: "04 / VENUE & LOGISTICS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "A PLACE TO COME TOGETHER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"See you",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"in ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Indore." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "venue-address",
								children: [
									"Star Hall",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Manik Bagh Road",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Indore, Madhya Pradesh"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "venue-date",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [event.date, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Reporting at ", event.reportingTime] })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "btn-map",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: directionsUrl,
									target: "_blank",
									rel: "noreferrer",
									children: ["Get directions on Google Maps ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "venue-map-art",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "map-lines" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "map-pin",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"STAR HALL",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"INDORE"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "map-coord",
								children: "22°42′ N\xA0 75°51′ E"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "map-label",
								children: "MANIK BAGH ROAD"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "register-section",
				id: "register",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-wrap register-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "register-intro",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "section-number",
								children: "05 / FREE REGISTRATION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "YOUR PLACE IN THE ROOM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"Start your",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "next chapter." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A day for better questions, new direction and a future built with purpose." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "register-detail",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "20 DEC 2026" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STAR HALL, INDORE" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FREE ENTRY" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "register-flower",
								"aria-hidden": "true",
								children: "✳"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterForm, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "site-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "footer-brand",
						href: event.organizerUrl,
						target: "_blank",
						rel: "noreferrer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "boon-mark",
								children: "B"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "THE BOON" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "WELFARE FOUNDATION" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "footer-whatsapp",
						href: event.whatsappUrl,
						target: "_blank",
						rel: "noreferrer",
						children: ["Join our WhatsApp channel ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-bottom",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Organized by The BOON Welfare Foundation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE ALUMNI ASSOCIATION OF TAIBA COLLEGE, INDORE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/admin",
							children: "OPERATIONS PORTAL"
						})
					]
				})]
			})
		]
	});
}
function RegisterForm() {
	const [form, setForm] = (0, import_react.useState)(blankForm);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [registeredId, setRegisteredId] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [serviceError, setServiceError] = (0, import_react.useState)("");
	const validate = (values) => {
		const next = {};
		if (values.name.trim().length < 2) next.name = "Enter your full name (at least 2 characters).";
		if (!event.audiences.includes(values.status)) next.status = "Choose the option that describes you.";
		if (values.stream.trim().length < 2) next.stream = "Enter your stream, subject or professional field.";
		if (values.city.trim().length < 2) next.city = "Enter your city.";
		if (!/^[6-9]\d{9}$/.test(values.phone)) next.phone = "Enter a valid 10-digit Indian mobile number starting with 6–9.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
		return next;
	};
	const change = (key, value) => {
		const updated = {
			...form,
			[key]: value
		};
		setForm(updated);
		if (errors[key]) setErrors(validate(updated));
	};
	async function submit(e) {
		e.preventDefault();
		const next = validate(form);
		setErrors(next);
		setServiceError("");
		if (Object.keys(next).length) return;
		setLoading(true);
		try {
			const result = await registerAttendee({
				...form,
				name: form.name.trim(),
				stream: form.stream.trim(),
				city: form.city.trim()
			});
			setRegisteredId(result.id);
		} catch (error) {
			setServiceError(error instanceof Error ? error.message : "Registration could not be completed. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	async function downloadTicket() {
		const canvas = document.createElement("canvas");
		canvas.width = 1400;
		canvas.height = 820;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const violet = "#1f0438", yellow = "#ffeb3b";
		ctx.fillStyle = violet;
		ctx.fillRect(0, 0, 1400, 820);
		ctx.strokeStyle = yellow;
		ctx.lineWidth = 4;
		ctx.strokeRect(38, 38, 1324, 744);
		ctx.fillStyle = yellow;
		ctx.font = "800 28px sans-serif";
		ctx.fillText("PROF SUMMIT ’26 · INDORE", 82, 115);
		ctx.fillStyle = "#ffffff";
		ctx.font = "900 70px sans-serif";
		ctx.fillText("YOUR SEAT IS SECURED.", 82, 256);
		ctx.font = "600 34px sans-serif";
		ctx.fillText(form.name.toUpperCase(), 82, 340);
		ctx.fillStyle = yellow;
		ctx.font = "800 42px monospace";
		ctx.fillText(registeredId, 82, 435);
		ctx.fillStyle = "#ffffff";
		ctx.font = "500 26px sans-serif";
		ctx.fillText("20 DECEMBER 2026  ·  REPORTING 10:30 AM", 82, 530);
		ctx.fillText("STAR HALL, MANIK BAGH ROAD, INDORE", 82, 580);
		ctx.fillStyle = yellow;
		ctx.font = "700 24px sans-serif";
		ctx.fillText("ORGANIZED BY THE BOON WELFARE FOUNDATION", 82, 700);
		ctx.fillStyle = "rgba(255,255,255,0.7)";
		ctx.font = "500 20px sans-serif";
		ctx.fillText(event.tagline, 82, 740);
		const link = document.createElement("a");
		link.download = `ProfSummit2026-Ticket-${registeredId}.png`;
		link.href = canvas.toDataURL("image/png");
		link.click();
	}
	if (registeredId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "register-success",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "success-confetti",
				"aria-hidden": "true",
				children: "✳"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "success-kicker",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), " YOU’RE ON THE LIST"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
				"Let the journey",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"begin."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your official registration ID. Keep it safe for entry & certificate:" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "attendee-id",
				children: registeredId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "success-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => {
						navigator.clipboard.writeText(registeredId).then(() => {
							setCopied(true);
							window.setTimeout(() => setCopied(false), 2200);
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied ? "Copied" : "Copy ID"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void downloadTicket(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download My Ticket (PNG)"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: "whatsapp-pill",
				href: event.whatsappUrl,
				target: "_blank",
				rel: "noreferrer",
				children: ["Join our WhatsApp channel ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: "invite-link",
				href: `https://wa.me/?text=${encodeURIComponent(`Join me at Prof Summit: 20 Dec 2026, Star Hall, Manik Bagh Road, Indore. Free entry. Register here: ${window.location.origin}`)}`,
				target: "_blank",
				rel: "noreferrer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), " Invite a friend on WhatsApp"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "keep-id",
				children: "Present this ID at the venue on 20 Dec 2026."
			})
		]
	});
	const field = (key, label, placeholder, type = "text") => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "form-field",
		htmlFor: `reg-${key}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: `reg-${key}`,
				type,
				autoComplete: key === "name" ? "name" : key === "email" ? "email" : key === "phone" ? "tel" : "off",
				placeholder,
				value: form[key],
				"aria-invalid": Boolean(errors[key]),
				"aria-describedby": errors[key] ? `error-${key}` : void 0,
				onChange: (e) => change(key, e.target.value)
			}),
			errors[key] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				id: `error-${key}`,
				className: "field-error",
				children: errors[key]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "registration-form",
		onSubmit: submit,
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-heading",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PROF SUMMIT · 2026" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Count me in." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your next chapter starts with a conversation." })
				]
			}),
			serviceError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "form-error",
				role: "alert",
				children: serviceError
			}),
			field("name", "Full name", "Enter your full name"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "form-field",
				htmlFor: "reg-status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I am a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "reg-status",
						value: form.status,
						onChange: (e) => change("status", e.target.value),
						children: event.audiences.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: option }, option))
					}),
					errors.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "field-error",
						children: errors.status
					})
				]
			}),
			field("stream", "Stream, Subject or Field", form.status === "Working professional" ? "e.g. Software, Healthcare, Business" : "e.g. Science, Commerce, Arts"),
			errors.stream && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "field-error",
				children: errors.stream
			}),
			field("city", "City", "e.g. Indore, Bhopal, Ujjain"),
			field("phone", "WhatsApp / Contact Number", "10-digit mobile number starting with 6–9", "tel"),
			field("email", "Email Address", "name@example.com", "email"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "submit-seat",
				disabled: loading,
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "button-spinner" }), "Saving your seat…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Secure my seat ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "form-note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, { size: 15 }), " Entry is free · Your details stay strictly with your registration"]
			})
		]
	});
}
//#endregion
export { HomePage as component };

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  Copy,
  Download,
  MapPin,
  Menu,
  Share2,
  Sparkles,
  TicketCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { event, eventDateTime, directionsUrl } from "@/content/event";
import { registerAttendee, type AttendeeStatus, type RegistrationForm } from "@/services/api";
import compassArt from "@/assets/chrome-compass.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prof Summit ’26 — Character to Career | Indore" },
      {
        name: "description",
        content:
          "Professional Students Conference organized by The BOON Welfare Foundation. 20 December 2026, Star Hall, Indore. Free registration.",
      },
      { property: "og:title", content: "Prof Summit ’26 — Character to Career" },
      {
        property: "og:description",
        content:
          "A Complete Guidance from Character to Career. Featuring Mohammad Raza Mulla and Dr. Sayed Mohammad Fazlullah Chishti. Free Entry in Indore.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const blankForm: RegistrationForm = {
  name: "",
  status: "School student, Class 10+",
  stream: "",
  city: "",
  phone: "",
  email: "",
};

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function countdown(): Countdown {
  const delta = Math.max(0, eventDateTime.getTime() - Date.now());
  return {
    days: Math.floor(delta / 86400000),
    hours: Math.floor(delta / 3600000) % 24,
    minutes: Math.floor(delta / 60000) % 60,
    seconds: Math.floor(delta / 1000) % 60,
  };
}

function HomePage() {
  const [time, setTime] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTime(countdown());
    const timer = window.setInterval(() => setTime(countdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="summit-home">
      {/* Navigation */}
      <header className="site-nav">
        <a className="brand-mark" href="#top" aria-label="Prof Summit home">
          <img src="/prof-summit-logo.png" alt="Prof Summit" className="brand-logo-img" />
          <span>
            PROF<span> SUMMIT</span>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            The Story
          </a>
          <a href="#speakers" onClick={() => setMenuOpen(false)}>
            Speakers
          </a>
          <a href="#sessions" onClick={() => setMenuOpen(false)}>
            Sessions
          </a>
          <a href="#venue" onClick={() => setMenuOpen(false)}>
            Venue
          </a>
          <a className="nav-attend" href="/attend">
            Attendee Check-in <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="top">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-dot" />
              INDORE · MADHYA PRADESH
            </p>
            <h1 className="wordmark">
              <span>PROF</span>
              <span className="wordmark-outline">
                SUMMIT<span className="wordmark-year">’26</span>
              </span>
            </h1>
            <p className="hero-subtitle">{event.subtitle}</p>
            <p className="hero-tagline">{event.tagline}</p>
            <div className="countdown-block" aria-label={`${time.days} days ${time.hours} hours until the summit`}>
              <p>THE DAY IS ON ITS WAY</p>
              <div className="countdown-units">
                {(
                  [
                    [time.days, "DAYS"],
                    [time.hours, "HRS"],
                    [time.minutes, "MIN"],
                    [time.seconds, "SEC"],
                  ] as const
                ).map(([n, label]) => (
                  <div className="count-unit" key={label}>
                    <strong>{String(n).padStart(2, "0")}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="event-meta">
              <div>
                <CalendarDays />
                <span>{event.date}</span>
              </div>
              <div>
                <Clock3 />
                <span>Reporting · {event.reportingTime}</span>
              </div>
              <div>
                <MapPin />
                <span>Star Hall · Manik Bagh Road, Indore</span>
              </div>
            </div>
            <div className="hero-actions">
              <Button asChild className="btn-summit-yellow">
                <a href="#register">
                  Secure Your Seat <ArrowUpRight />
                </a>
              </Button>
              <span className="free-entry">
                <span />
                FREE ENTRY
              </span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <img src={compassArt} alt="" width={1200} height={1200} fetchPriority="high" />
            <div className="hero-art-caption">
              <span>01 / 03</span>
              <span>FIND YOUR NORTH</span>
            </div>
            <span className="chrome-label">
              DIRECTION
              <br />
              STARTS HERE
            </span>
          </div>
          <div className="hero-bottom-note">
            <span>AN ANNUAL PROFESSIONAL STUDENTS CONFERENCE</span>
            <ArrowDown size={16} />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
        <div className="hero-ribbon" aria-hidden="true" />
      </section>

      {/* The Story Section */}
      <section className="story-section" id="about">
        <div className="section-wrap story-grid">
          <div className="story-label">
            <span className="section-number">01 / THE STORY</span>
            <span className="story-stamp">
              FROM
              <br />
              KERALAM
              <br />
              TO INDORE
            </span>
          </div>
          <div className="story-text">
            <p className="eyebrow">A NEW CHAPTER BEGINS</p>
            <h2>
              Big ideas.
              <br />
              <span>Grounded hearts.</span>
            </h2>
            <p>{event.story}</p>
            <p className="story-closing">“{event.closingLine}”</p>
            <a className="text-link" href={event.organizerUrl} target="_blank" rel="noreferrer">
              Organized by The BOON Welfare Foundation <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* Statement Band */}
      <section className="statement-band">
        <div className="statement-orbit" aria-hidden="true">
          ✳
        </div>
        <p className="eyebrow">ONE DAY. A WORLD OF DIRECTION.</p>
        <h2>
          A Complete Guidance
          <br />
          <span>from Character to Career</span>
        </h2>
        <div className="statement-mark">
          PROF SUMMIT <span>·</span> 20 DECEMBER 2026 <span>·</span> INDORE
        </div>
      </section>

      {/* FEATURED SPEAKERS (Big, Prominent, High Aesthetic Quality) */}
      <section className="speakers-prominent-section" id="speakers">
        <div className="section-wrap">
          <div className="speaker-head">
            <div>
              <span className="section-number">02 / KEYNOTE GUIDES</span>
              <h2 style={{ fontSize: "clamp(38px, 6vw, 68px)", lineHeight: 1.05 }}>
                Distinguished <br />
                <span style={{ color: "var(--sun)" }}>Speakers & Sessions</span>
              </h2>
            </div>
            <p style={{ maxWidth: 320, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              Guiding students and professionals from self-discovery to enduring character.
            </p>
          </div>

          <div className="speakers-prominent-grid">
            {event.speakers.map((speaker, index) => (
              <article className={`speaker-showcase-card showcase-${index}`} key={speaker.name}>
                <div className="speaker-photo-wrapper">
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className="speaker-photo-img"
                    loading="lazy"
                  />
                  <div className="speaker-photo-badge">
                    <span>{speaker.sessionNumber}</span>
                  </div>
                </div>

                <div className="speaker-info-content">
                  <div className="speaker-session-pill">
                    <Sparkles size={14} />
                    <span>{speaker.topic}</span>
                  </div>

                  <h3 className="speaker-big-name">{speaker.name}</h3>
                  <p className="speaker-big-designation">{speaker.designation}</p>

                  <div className="speaker-topic-box">
                    <span className="topic-box-label">SESSION FOCUS</span>
                    <h4 className="topic-box-title">{speaker.topic}</h4>
                    <p className="topic-box-tagline">{speaker.tagline}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      <section className="sessions-section" id="sessions">
        <div className="section-wrap">
          <div className="section-heading-row">
            <div>
              <span className="section-number">03 / THE AGENDA</span>
              <h2>
                Three sessions.
                <br />
                <span>One fuller picture.</span>
              </h2>
            </div>
            <p>
              From discovering what you can do
              <br />
              to deciding who you want to be.
            </p>
          </div>
          <div className="session-list">
            {event.sessions.map((session, index) => (
              <article className={`session-card session-${session.tone}`} key={session.title}>
                <span className="session-number">{session.number}</span>
                <div className="session-main">
                  <p className="session-kicker">
                    {index === 0 ? "YOUR NEXT STEP" : index === 1 ? "YOUR GUIDING LIGHT" : "YOUR TAKEAWAY"}
                  </p>
                  <h3>{session.title}</h3>
                  <h4>{session.subtitle}</h4>
                  <p className="session-description">{session.description}</p>
                  {session.speaker && (
                    <p className="session-speaker">
                      <span>SPEAKER</span>
                      {session.speaker}
                    </p>
                  )}
                </div>
                <div className="session-emblem" aria-hidden="true">
                  {index === 0 ? <Compass /> : index === 1 ? <span>✳</span> : <ArrowUpRight />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="venue-section" id="venue">
        <div className="venue-shape" aria-hidden="true" />
        <div className="section-wrap venue-grid">
          <div className="venue-copy">
            <span className="section-number">04 / VENUE & LOGISTICS</span>
            <p className="eyebrow">A PLACE TO COME TOGETHER</p>
            <h2>
              See you
              <br />
              in <span>Indore.</span>
            </h2>
            <p className="venue-address">
              Star Hall
              <br />
              Manik Bagh Road
              <br />
              Indore, Madhya Pradesh
            </p>
            <div className="venue-date">
              <CalendarDays />
              <span>
                {event.date}
                <small>Reporting at {event.reportingTime}</small>
              </span>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0 22px",
                height: 48,
                background: "transparent",
                border: "2px solid var(--violet)",
                color: "var(--violet)",
                fontWeight: 800,
                fontSize: 13,
                textDecoration: "none",
                borderRadius: 2,
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
              Get directions on Google Maps <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="venue-map-art" aria-hidden="true">
            <div className="map-lines" />
            <div className="map-pin">
              <MapPin />
              <span>
                STAR HALL
                <br />
                INDORE
              </span>
            </div>
            <div className="map-coord">22°42′ N&nbsp; 75°51′ E</div>
            <span className="map-label">MANIK BAGH ROAD</span>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="register-section" id="register">
        <div className="section-wrap register-grid">
          <div className="register-intro">
            <span className="section-number">05 / FREE REGISTRATION</span>
            <p className="eyebrow">YOUR PLACE IN THE ROOM</p>
            <h2>
              Start your
              <br />
              <span>next chapter.</span>
            </h2>
            <p>A day for better questions, new direction and a future built with purpose.</p>
            <div className="register-detail">
              <span>20 DEC 2026</span>
              <i />
              <span>STAR HALL, INDORE</span>
              <i />
              <span>FREE ENTRY</span>
            </div>
            <span className="register-flower" aria-hidden="true">
              ✳
            </span>
          </div>
          <RegisterForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-top">
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <img src="/prof-summit-logo.png" alt="Prof Summit" className="brand-logo-img" style={{ height: 42 }} />
            <a
              className="footer-brand"
              href={event.organizerUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="The BOON Welfare Foundation"
            >
              <img
                src="/boon-logo-white.png"
                alt="The BOON Welfare Foundation"
                style={{ height: 42, width: "auto", objectFit: "contain" }}
              />
              <ArrowUpRight />
            </a>
          </div>
          <a className="footer-whatsapp" href={event.whatsappUrl} target="_blank" rel="noreferrer">
            Join our WhatsApp channel <ArrowUpRight />
          </a>
        </div>
        <div className="footer-bottom">
          <span>Organized by The BOON Welfare Foundation</span>
          <span>THE ALUMNI ASSOCIATION OF TAIBA COLLEGE, INDORE</span>
          <a href="/admin">OPERATIONS PORTAL</a>
        </div>
      </footer>
    </main>
  );
}

function RegisterForm() {
  const [form, setForm] = useState<RegistrationForm>(blankForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [registeredId, setRegisteredId] = useState("");
  const [copied, setCopied] = useState(false);
  const [serviceError, setServiceError] = useState("");

  const validate = (values: RegistrationForm) => {
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name (at least 2 characters).";
    if (!event.audiences.includes(values.status)) next.status = "Choose the option that describes you.";
    if (values.stream.trim().length < 2) next.stream = "Enter your stream, subject or professional field.";
    if (values.city.trim().length < 2) next.city = "Enter your city.";
    if (!/^[6-9]\d{9}$/.test(values.phone)) next.phone = "Enter a valid 10-digit Indian mobile number starting with 6–9.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
    return next;
  };

  const change = (key: keyof RegistrationForm, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    if (errors[key]) setErrors(validate(updated));
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
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
        city: form.city.trim(),
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
    const violet = "#1f0438",
      yellow = "#ffeb3b";
    ctx.fillStyle = violet;
    ctx.fillRect(0, 0, 1400, 820);
    ctx.strokeStyle = yellow;
    ctx.lineWidth = 4;
    ctx.strokeRect(38, 38, 1324, 744);

    ctx.fillStyle = yellow;
    ctx.font = "800 28px sans-serif";
    ctx.fillText("PROF SUMMIT ’26 · INDORE", 82, 115);

    // Draw Official Summit Logo on ticket
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = "/prof-summit-logo.png";
      await new Promise((resolve) => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve;
      });
      if (logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.drawImage(logoImg, 1220, 68, 100, 110);
      }
    } catch {
      // Graceful fallback if image load is blocked
    }

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

  if (registeredId) {
    return (
      <div className="register-success">
        <div className="success-confetti" aria-hidden="true">
          ✳
        </div>
        <span className="success-kicker">
          <Check size={14} /> YOU’RE ON THE LIST
        </span>
        <h3>
          Let the journey
          <br />
          begin.
        </h3>
        <p>Your official registration ID. Keep it safe for entry & certificate:</p>
        <div className="attendee-id">{registeredId}</div>
        <div className="success-actions">
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(registeredId).then(() => {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2200);
              });
            }}
            style={{
              background: "transparent",
              border: "1.5px solid var(--violet)",
              color: "var(--violet)",
              padding: "0 18px",
              height: 43,
              fontWeight: 800,
              fontSize: 11,
              borderRadius: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Copy size={13} />
            {copied ? "Copied" : "Copy ID"}
          </button>
          <Button onClick={() => void downloadTicket()}>
            <Download />
            Download My Ticket (PNG)
          </Button>
        </div>
        <a className="whatsapp-pill" href={event.whatsappUrl} target="_blank" rel="noreferrer">
          Join our WhatsApp channel <ArrowUpRight />
        </a>
        <a
          className="invite-link"
          href={`https://wa.me/?text=${encodeURIComponent(
            `Join me at Prof Summit: 20 Dec 2026, Star Hall, Manik Bagh Road, Indore. Free entry. Register here: ${window.location.origin}`
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <Share2 /> Invite a friend on WhatsApp
        </a>
        <p className="keep-id">Present this ID at the venue on 20 Dec 2026.</p>
      </div>
    );
  }

  const field = (key: keyof RegistrationForm, label: string, placeholder: string, type = "text") => (
    <label className="form-field" htmlFor={`reg-${key}`}>
      <span>{label}</span>
      <Input
        id={`reg-${key}`}
        type={type}
        autoComplete={key === "name" ? "name" : key === "email" ? "email" : key === "phone" ? "tel" : "off"}
        placeholder={placeholder}
        value={form[key]}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `error-${key}` : undefined}
        onChange={(e) => change(key, e.target.value)}
      />
      {errors[key] && (
        <small id={`error-${key}`} className="field-error">
          {errors[key]}
        </small>
      )}
    </label>
  );

  return (
    <form className="registration-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span>PROF SUMMIT · 2026</span>
        <h3>Count me in.</h3>
        <p>Your next chapter starts with a conversation.</p>
      </div>
      {serviceError && (
        <p className="form-error" role="alert">
          {serviceError}
        </p>
      )}
      {field("name", "Full name", "Enter your full name")}
      <label className="form-field" htmlFor="reg-status">
        <span>I am a</span>
        <select id="reg-status" value={form.status} onChange={(e) => change("status", e.target.value as AttendeeStatus)}>
          {event.audiences.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {errors.status && <small className="field-error">{errors.status}</small>}
      </label>
      {field(
        "stream",
        "Stream, Subject or Field",
        form.status === "Working professional" ? "e.g. Software, Healthcare, Business" : "e.g. Science, Commerce, Arts"
      )}
      {errors.stream && <small className="field-error">{errors.stream}</small>}
      {field("city", "City", "e.g. Indore, Bhopal, Ujjain")}
      {field("phone", "WhatsApp / Contact Number", "10-digit mobile number starting with 6–9", "tel")}
      {field("email", "Email Address", "name@example.com", "email")}
      <Button className="submit-seat" disabled={loading}>
        {loading ? (
          <>
            <span className="button-spinner" />
            Saving your seat…
          </>
        ) : (
          <>
            Secure my seat <ArrowUpRight />
          </>
        )}
      </Button>
      <p className="form-note">
        <TicketCheck size={15} /> Entry is free · Your details stay strictly with your registration
      </p>
    </form>
  );
}

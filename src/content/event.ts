export const event = {
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
  whatsappUrl: "https://whatsapp.com/channel/0029Vb1y6FMJUM2cn8H5Ll2K",
  story:
    "Prof Summit is an annual professional students' conference originating in Keralam, bringing together students from diverse universities, colleges and professional institutions for learning, networking and career development. Inspired by this initiative, The Boon Welfare Foundation proudly introduces Prof Summit in Madhya Pradesh for the first time, in Indore. Guided by the vision 'A Complete Guidance from Character to Career', Prof Summit inspires professional excellence, strong character and spiritual growth while keeping young minds connected to Deen and Islamic values.",
  closingLine:
    "True success is not just about what you achieve, but who you become.",
  sessions: [
    {
      title: "Career Navigator",
      subtitle: "Discover Your Direction · Academic & Professional Guidance",
      description:
        "Choosing the right academic path and career direction is one of the most significant decisions in a young person's life. Gain valuable insights into emerging fields, professional courses, and the skills needed to succeed in today's world.",
      speaker: "Mohammad Raza Mulla",
      number: "01",
      tone: "violet",
    },
    {
      title: "Prophetic Blueprint",
      subtitle:
        "The Way of Living Through Seerah, Tazkiyah & Character Development",
      description:
        "The life of Prophet Muhammad ﷺ is the ultimate example of guidance, compassion, integrity, and excellence. Learn how the Prophetic way of life guides personal conduct, relationships, decisions, and professional responsibilities.",
      speaker: "Dr. Sayed Mohammad Fazlullah Chishti",
      number: "02",
      tone: "yellow",
    },
    {
      title: "Minds Together",
      subtitle:
        "From Learning to Implementation · Group Discussion & Interactive Reflection",
      description:
        "An interactive session where participants come together to reflect on the key learnings, exchange perspectives, and develop actionable ideas for personal, academic, and professional growth.",
      speaker: null,
      number: "03",
      tone: "white",
    },
  ],
  speakers: [
    {
      name: "Mohammad Raza Mulla",
      designation: "Co Founder & COO at CoSapiens Consulting",
      session: "Career Navigator",
      sessionNumber: "SESSION 01",
      initials: "MR",
      photo: "/speakers/raza-mulla.jpg",
      topic: "CAREER NAVIGATOR",
      tagline: "Discover Your Direction · Academic & Professional Guidance",
    },
    {
      name: "Dr. Sayed Mohammad Fazlullah Chishti",
      designation: "Founder - Falaah Research Foundation",
      session: "Prophetic Blueprint",
      sessionNumber: "SESSION 02",
      initials: "FC",
      photo: "/speakers/fazlullah-chishti.jpg",
      topic: "PROPHETIC BLUEPRINT",
      tagline: "The Way of Living Through Seerah, Tazkiyah & Character Development",
    },
  ],
  audiences: ["School student, Class 10+", "College student", "Working professional"],
  bestSessions: ["Career Navigator", "Prophetic Blueprint", "Minds Together"],
} as const;

export const eventDateTime = new Date("2026-12-20T05:00:00.000Z");
// Check-in window opens 23:30 IST on 19 Dec 2026 (18:00 UTC)
export const checkInWindowStart = new Date("2026-12-19T18:00:00.000Z");
export const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Star+Hall+Manik+Bagh+Road+Indore";

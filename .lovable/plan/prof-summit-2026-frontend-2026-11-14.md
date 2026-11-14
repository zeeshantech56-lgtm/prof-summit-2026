# Prof Summit 2026 frontend

## Build
- Create the home event site with the requested vivid violet/yellow/white art direction, live countdown, event story, sessions, speakers, venue, registration, ticket actions, and responsive navigation.
- Put event facts and copy in `src/content/event.ts`; keep all attendee/admin persistence, demo records, and artificial latency in the typed browser-only `src/services/api.ts` mock service.
- Add `/attend` check-in, feedback, and downloadable certificate; add `/admin` mock sign-in, demo dashboard, registration table, spreadsheet export, and venue QR; add `/embed-demo` with independent sticky banner and accessible popup.
- Use the supplied logo and speaker/brochure assets if actually available; otherwise avoid fabricating real speaker portraits or logos and use neutral identity treatments.
- Add the requested README handoff notes and focused tests for ID generation and service rules, without connecting a backend.

## Technical details
- Preserve TanStack Start file-based routing, page-specific metadata, existing shadcn controls, and semantic Tailwind v4 tokens.
- Keep browser-only storage access inside the service layer; use client-side rendering for generated ticket/certificate/export media.
- Add only the lightweight client-side export/QR dependencies needed for requested flows, and load heavier libraries on demand.

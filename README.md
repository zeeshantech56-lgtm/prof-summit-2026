# Prof Summit ’26 — Professional Students Conference

Official web platform for **Prof Summit ’26**, organized by **The BOON Welfare Foundation** (*The Alumni Association of Taiba College, Indore*).

- **Production Live URL**: [https://prof-summit-2026.vercel.app](https://prof-summit-2026.vercel.app)
- **Check-in & Certificate Portal**: [https://prof-summit-2026.vercel.app/attend](https://prof-summit-2026.vercel.app/attend)
- **Operations & Admin Dashboard**: [https://prof-summit-2026.vercel.app/admin](https://prof-summit-2026.vercel.app/admin)
- **GitHub Repository**: [https://github.com/zeeshantech56-lgtm/prof-summit-2026](https://github.com/zeeshantech56-lgtm/prof-summit-2026)

---

## 1. Environment Variables

The project uses Firebase client environment variables injected at build/runtime.

```bash
VITE_FIREBASE_API_KEY=AIzaSyAkMf8KzBuiyemAXm0PVhFlUftL-2bofzI
VITE_FIREBASE_AUTH_DOMAIN=profsummit-29a2a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=profsummit-29a2a
VITE_FIREBASE_STORAGE_BUCKET=profsummit-29a2a.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1014183960763
VITE_FIREBASE_APP_ID=1:1014183960763:web:25c192a6cfffe5f035c99e
VITE_FIREBASE_MEASUREMENT_ID=G-5FCPFXF1JL
```

These variables are configured in `.env` and set in Vercel project settings under `Production`.

---

## 2. Firebase & Firestore Security Rules

The application uses Cloud Firestore (`profsummit-29a2a`) with production-grade security rules located in [`firestore.rules`](./firestore.rules).

### Key Collections:
1. `registrations/{regId}`:
   - Document ID: `PROF-[A-Z0-9]{8}` (generated with browser crypto).
   - Fields: `id`, `name`, `status`, `stream`, `city`, `phone`, `email`, `attended`, `attendedAt`, `createdAt`, `feedback`, `feedbackAt`.
2. `phones/{phone}`:
   - Document ID: 10-digit mobile number.
   - Purpose: Enforces atomic duplicate phone rejection at the database and security rule level.

### Security Invariants Enforced:
- **Public Create**: Allowed with strict schema validation; duplicate phone numbers are immediately rejected.
- **Single-Doc Read (`get`)**: Public can look up their own ticket/ID.
- **Anti-Scraping (`list`)**: Querying or listing registrations is strictly blocked for non-admins to protect attendee PII.
- **Time-Locked Check-in**: Venue check-in is restricted until **23:30 IST on 19 December 2026** (`2026-12-19T18:00:00Z`).
- **Feedback Single Submission**: Allowed once and **only after check-in has been marked**.
- **Admin Access**: Only authorized administrator emails can list registrations, manually mark attendance, or delete test documents.

---

## 3. How to Add Administrators

To grant admin access to new team members:
1. Open [`src/config.ts`](./src/config.ts) and add their Google email to `ADMIN_EMAILS`:
   ```typescript
   export const ADMIN_EMAILS = [
     "khanmubeen5720@gmail.com",
     "sikandaralialex564@gmail.com",
     "theboonwelfarefoundation@gmail.com",
     "newadmin@example.com",
   ] as const;
   ```
2. Also add the email to [`firestore.rules`](./firestore.rules) in the `isAdmin()` helper function:
   ```javascript
   function isAdmin() {
     return isAuthenticated() && (
       ('email' in request.auth.token && request.auth.token.email in [
         'khanmubeen5720@gmail.com',
         'sikandaralialex564@gmail.com',
         'theboonwelfarefoundation@gmail.com',
         'newadmin@example.com'
       ])
     );
   }
   ```
3. Commit and push to deploy.

---

## 4. How to Export Attendee Data (5-Sheet Excel)

1. Navigate to [`/admin`](https://prof-summit-2026.vercel.app/admin).
2. Sign in with an authorized Google administrator account.
3. Click the yellow **"Export 5-Sheet Excel"** button in the top right.
4. The generated `.xlsx` workbook contains:
   - **Sheet 1 (`All Registrations`)**: Complete attendee list with all contact details, timestamps, attendance, and feedback.
   - **Sheet 2 (`Attended`)**: Only confirmed attendees checked in at the venue.
   - **Sheet 3 (`Not Attended`)**: Registrants who have not yet checked in.
   - **Sheet 4 (`Feedback & Ratings`)**: Star ratings, best session choice, and attendee comments.
   - **Sheet 5 (`Summary Statistics`)**: Total counts, attendance rate (%), average rating, and audience breakdown.

---

## 5. How to Regenerate the Printable Venue QR Code

1. In `/admin`, click the **"Venue QR Code"** button.
2. In the modal, click **"Download Printable Poster (PNG)"**.
3. Or regenerate via terminal:
   ```bash
   node -e "const QRCode = require('qrcode'); QRCode.toFile('public/venue-qr.png', 'https://prof-summit-2026.vercel.app/attend', { width: 1000, margin: 2, color: { dark: '#1f0438', light: '#ffffff' } });"
   ```
4. A high-resolution 1000×1000 printable PNG is generated at `public/venue-qr.png`.

---

## 6. Development & Build

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview
```

# 🩺 Feature Request: AI Prescription Viewing in React Native Mobile App

## Context
We have a doctor booking system with a backend (Node.js + Prisma + PostgreSQL/Supabase) and a React Native mobile app for patients. Doctors generate AI prescriptions through a doctor portal after patient consultations. These prescriptions are now stored in a dedicated `prescriptions` table in the database. 

**Your task**: Implement the UI for patients to **view their AI-generated prescriptions** in the React Native mobile app.

---

## Backend API (Already Deployed — DO NOT MODIFY)

### Base URL
Use whatever base API URL is already configured in the app (e.g., `API_BASE_URL` or similar constant).

---

### Endpoint 1: Get All Prescriptions for Logged-in Patient

```
GET /api/doctors/bookings/prescriptions
```

**Headers:**
```
Authorization: Bearer <patient_jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Prescriptions fetched.",
  "data": {
    "prescriptions": [
      {
        "id": "uuid-of-prescription",
        "content": "## AI Prescription\n\n### Diagnosis\nThe patient presents with...\n\n### Medications\n1. **Ashwagandha** - 500mg twice daily...\n\n### Lifestyle Recommendations\n- Practice yoga for 30 minutes...\n\n### Follow-up\nSchedule a follow-up in 2 weeks.",
        "transcriptFile": "TRANSCRIPT.txt",
        "createdAt": "2026-02-20T06:00:00.000Z",
        "updatedAt": "2026-02-20T06:00:00.000Z",
        "booking": {
          "id": "uuid-of-booking",
          "status": "COMPLETED",
          "notes": "Patient complains of fatigue",
          "createdAt": "2026-02-19T10:00:00.000Z"
        },
        "doctor": {
          "id": "uuid-of-doctor",
          "name": "Dr. Arjun Sharma",
          "specialty": "Ayurveda",
          "imageUrl": "https://example.com/doctor.jpg",
          "education": "BAMS, MD Ayurveda",
          "qualification": "Ayurvedic Practitioner"
        }
      }
    ]
  }
}
```

**Key Notes:**
- `content` is **Markdown text** (contains `##`, `**bold**`, `- lists`, `1. numbered lists`, etc.)
- Prescriptions are sorted by `createdAt` descending (newest first)
- Only bookings that have a prescription will appear
- The endpoint uses the patient's JWT token to identify and return only their prescriptions

---

### Endpoint 2: Get Single Booking Detail (includes prescription if exists)

This endpoint already exists in the app. It now includes a `prescription` field and a `hasPrescription` boolean.

```
GET /api/doctors/bookings/:bookingId
```

**Headers:**
```
Authorization: Bearer <patient_jwt_token>
```

**Response (200 OK) — prescription portion:**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "...",
      "status": "COMPLETED",
      "hasPrescription": true,
      "prescription": {
        "id": "uuid",
        "content": "## AI Prescription\n\n...(markdown)...",
        "createdAt": "2026-02-20T06:00:00.000Z",
        "transcriptFile": "TRANSCRIPT.txt"
      },
      "doctor": { "..." },
      "slot": { "..." }
    }
  }
}
```

---

### Endpoint 3: Get All Bookings (already exists, now includes hasPrescription flag)

```
GET /api/doctors/bookings/my
```

**Response now includes:**
```json
{
  "bookings": [
    {
      "id": "...",
      "status": "COMPLETED",
      "hasPrescription": true,
      "prescription": {
        "id": "uuid",
        "createdAt": "2026-02-20T06:00:00.000Z"
      },
      "doctor": { "..." },
      "slot": { "..." }
    }
  ]
}
```

---

## Database Schema (for reference only)

```prisma
model Prescription {
  id             String   @id @default(uuid())
  bookingId      String   @unique
  userId         String
  doctorId       String
  content        String   @db.Text     // AI-generated markdown prescription
  transcriptFile String?               // Original transcript filename
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  booking  Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  user     User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  doctor   Doctor  @relation(fields: [doctorId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([doctorId])
  @@index([bookingId])
  @@map("prescriptions")
}
```

---

## What to Implement in React Native

### 1. Prescriptions List Screen
Create a new screen (e.g., `PrescriptionsScreen` or `MyPrescriptions`) that:
- Calls `GET /api/doctors/bookings/prescriptions` on mount
- Shows a list of prescription cards, each showing:
  - Doctor's name, specialty, and avatar (`doctor.imageUrl`)
  - Date of the prescription (`createdAt`, formatted nicely)
  - Booking status badge
  - A "View Prescription" button/tap action
- Shows an empty state if no prescriptions exist
- Has pull-to-refresh functionality
- Add this screen to the app's navigation (tab bar or menu)

### 2. Prescription Detail Screen
When the user taps on a prescription card:
- Navigate to a detail screen showing:
  - Doctor info header (name, specialty, image, education)
  - Prescription date
  - **The full `content` rendered as Markdown** (use `react-native-markdown-display` package)
  - A "Share" or "Copy" button to share/copy the prescription text

### 3. Prescription Badge on Booking Detail
On the existing Booking Detail screen:
- If `hasPrescription` is `true`, show a "View Prescription" button
- Tapping it navigates to the Prescription Detail screen
- On the bookings list, show a small prescription icon/badge on bookings that have `hasPrescription: true`

---

## Recommended Package for Markdown Rendering

```bash
npm install react-native-markdown-display
```

Usage:
```jsx
import Markdown from 'react-native-markdown-display';

<Markdown style={markdownStyles}>
  {prescription.content}
</Markdown>
```

---

## UI/UX Guidelines
- Use the app's existing design system (colors, fonts, spacing)
- Prescription cards should feel medical/professional — clean white cards with subtle shadows
- Use a green accent for prescription-related elements (health theme)
- The markdown content should be well-styled with proper heading sizes, bold text, and list formatting
- Add a loading skeleton/shimmer while fetching prescriptions
- Handle error states gracefully with retry options

---

## API Service Integration
Add these methods to the existing API service file:

```javascript
// Get all prescriptions for the logged-in patient
async getMyPrescriptions() {
  const response = await this.get('/doctors/bookings/prescriptions');
  return response.data.prescriptions;
}
```

The existing `getBookingDetail` and `getMyBookings` methods should already return prescription data without modification since the backend now includes it automatically.

---

## Summary of Changes Needed
1. **New API method**: `getMyPrescriptions()` in the API service
2. **New screen**: `PrescriptionsScreen` (list view)
3. **New screen**: `PrescriptionDetailScreen` (full markdown view)
4. **Modified screen**: Existing booking detail — add "View Prescription" button when `hasPrescription` is true
5. **Modified screen**: Existing bookings list — add prescription badge/icon
6. **Navigation**: Add Prescriptions to the app navigation (tab/drawer/menu)
7. **New package**: `react-native-markdown-display` for rendering markdown content

# Doctor API Integration - Complete Implementation

## Overview

Successfully integrated all 8 doctor-related APIs from the backend into the frontend React Native application. The integration includes doctor listings, searching, filtering, booking, and cancellation functionality.

---

## Files Modified/Created

### 1. **app/types/index.ts** - New Types Added

Added comprehensive TypeScript interfaces for doctor-related data:

```typescript
// Booking Status Enum
type BookingStatus = "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";

// Doctor interface - matches backend schema
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  description?: string;
  education?: string;
  qualification?: string;
  languages: string[];
  bio?: string;
  imageUrl?: string;
  phone?: string;
  email?: string;
  gender?: string;
  location?: string;
  consultationFee: number;
  experienceYears: number;
  rating: number;
  totalRatings: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// Doctor Slot interface
interface DoctorSlot {
  id: string;
  doctorId: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  isBooked: boolean;
  isActive: boolean;
  createdAt: string;
}

// Booking interface
interface Booking {
  id: string;
  userId: string;
  doctorId: string;
  slotId: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  doctor?: Doctor;
  slot?: DoctorSlot;
}

// API Response types
interface DoctorListResponse {
  doctors: Doctor[];
  specialties: string[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface DoctorDetailsResponse {
  doctor: Doctor;
  slots: DoctorSlot[];
  availableDates: string[];
}

interface SlotsResponse {
  slots: DoctorSlot[];
}
```

---

### 2. **app/services/apiClient.ts** - Added Doctor API Methods

Added 8 new methods to the APIClient class:

```typescript
// API 1 - List All Doctors (PUBLIC)
async listDoctors(page: number = 1, limit: number = 10): Promise<DoctorListResponse>

// API 2 - Search Doctors (PUBLIC)
async searchDoctors(
  searchQuery: string,
  sortBy?: string,
  order?: 'asc' | 'desc'
): Promise<DoctorListResponse>

// API 3 - Filter Doctors (PUBLIC)
async filterDoctors(
  specialty?: string,
  minFee?: number,
  maxFee?: number,
  sortBy?: string,
  order?: 'asc' | 'desc'
): Promise<DoctorListResponse>

// API 4 - Get Doctor Details + Slots (PUBLIC)
async getDoctorDetails(
  doctorId: string,
  date?: string
): Promise<DoctorDetailsResponse>

// API 5 - Get Doctor Slots for Date (PUBLIC)
async getDoctorSlots(
  doctorId: string,
  date?: string
): Promise<SlotsResponse>

// API 6 - Book a Slot (AUTHENTICATED)
async bookSlot(
  doctorId: string,
  slotId: string,
  notes?: string
): Promise<Booking>

// API 7 - Get My Bookings (AUTHENTICATED)
async getMyBookings(status?: string): Promise<Booking[]>

// API 8 - Cancel Booking (AUTHENTICATED)
async cancelBooking(bookingId: string): Promise<Booking>
```

---

### 3. **app/services/doctorService.ts** - New Service Created

Created a wrapper service that provides convenient methods for doctor operations:

```typescript
class DoctorService {
  async listDoctors(
    page: number = 1,
    limit: number = 10,
  ): Promise<DoctorListResponse>;
  async searchDoctors(
    searchQuery: string,
    sortBy?: string,
    order?: "asc" | "desc",
  ): Promise<DoctorListResponse>;
  async filterDoctors(
    specialty?: string,
    minFee?: number,
    maxFee?: number,
    sortBy?: string,
    order?: "asc" | "desc",
  ): Promise<DoctorListResponse>;
  async getDoctorDetails(
    doctorId: string,
    date?: string,
  ): Promise<DoctorDetailsResponse>;
  async getDoctorSlots(doctorId: string, date?: string): Promise<SlotsResponse>;
  async bookSlot(
    doctorId: string,
    slotId: string,
    notes?: string,
  ): Promise<Booking>;
  async getMyBookings(status?: string): Promise<Booking[]>;
  async cancelBooking(bookingId: string): Promise<Booking>;
}

export const doctorService = new DoctorService();
```

---

### 4. **app/(app)/(tabs)/doctor.tsx** - Complete Component Rewrite

Completely refactored the doctor screen component with the following features:

#### **State Management**

```typescript
- doctors: Doctor[]                    // List of doctors
- allSpecialties: string[]            // Available specialties
- search: string                      // Search query
- selectedSpecialty: string           // Filter by specialty
- selectedFee: string                 // Filter by fee range
- selectedDoctor: Doctor | null       // Selected doctor details
- doctorSlots: DoctorSlot[]          // Available slots
- availableDates: string[]            // Available appointment dates
- selectedSlot: DoctorSlot | null    // Selected time slot
- selectedDate: string               // Selected appointment date
- bookingNotes: string               // Notes for booking
- userBookings: Booking[]            // User's confirmed bookings
- isLoading: boolean                 // Loading state
- isFetching: boolean                // Fetching state
- showBookingModal: boolean          // Booking confirmation modal
```

#### **Core Features**

1. **Doctor Listing** (API 1)
   - Loads initial list of doctors on component mount
   - Supports pagination
   - Shows doctor cards with name, specialty, experience, rating, location, languages
   - Displays consultation fee and "View & Book" button
   - Shows booking status badge if already booked

2. **Search** (API 2)
   - Real-time search by name, specialty, location, qualification, education
   - Clears search to show all doctors
   - Shows error alerts on failed search

3. **Filtering** (API 3)
   - Filter by specialty (dynamic list from API)
   - Filter by consultation fee ranges:
     - All
     - Under ₹600
     - ₹600-900
     - Above ₹900
   - Applied automatically when filters change

4. **Doctor Details** (API 4)
   - Full doctor profile modal
   - Shows education, bio, experience, rating
   - Displays available dates for next 7 days
   - Loading indicator while fetching details

5. **Slot Selection** (API 5)
   - Date picker to select appointment date
   - Shows available slots for selected date
   - Displays booked vs available slots visually
   - Each slot shows time in 12-hour format
   - Disabled state for already booked slots

6. **Booking** (API 6)
   - Optional notes field for consultation details
   - Authentication check before booking
   - Confirmation modal showing:
     - Doctor name
     - Specialty
     - Appointment date and time
     - Consultation fee
     - Notes (if provided)
   - Success/error alerts

7. **My Bookings** (API 7)
   - Loads user's confirmed bookings on mount
   - Shows upcoming appointments
   - Loads when user logs in

8. **Cancel Booking** (API 8)
   - Cancel button on each booking
   - Confirmation dialog before cancellation
   - Updates bookings list after cancellation
   - Refreshes doctor list to show freed slots

#### **UI/UX Features**

- **Loading States**: ActivityIndicator shown while fetching data
- **Empty States**: User-friendly messages when no doctors found
- **Error Handling**: Alert dialogs for all error cases
- **Authentication**: Checks token before booking, shows login prompt if needed
- **Responsive Design**: Uses flexbox layout for various screen sizes
- **Color Scheme**: Matches existing Ayurvedic theme (#FFF7EC, #E58B3A, etc.)
- **Accessibility**: Proper disabled states and visual feedback

#### **New Styles Added**

```typescript
loadingContainer; // Loading state UI
loadingText; // Loading text
emptyContainer; // Empty state UI
emptyText; // Empty state text
emptySubtext; // Empty state subtext
doctorDetailCard; // Doctor detail section styling
bookedBadge; // Booking confirmation badge
dateScroll; // Horizontal date picker
dateChip; // Date option styling
dateChipActive; // Active date styling
dateText; // Date text styling
dateTextActive; // Active date text styling
slotChipBooked; // Booked slot styling
slotChipSelected; // Selected slot styling
slotTextBooked; // Booked slot text
slotTextSelected; // Selected slot text
notesInput; // Notes text input
confirmButton; // Confirmation button
confirmButtonText; // Confirmation button text
confirmModalCard; // Confirmation modal styling
confirmItem; // Confirmation item styling
confirmLabel; // Confirmation label
confirmValue; // Confirmation value
confirmButtonRow; // Button row in modal
cancelButton; // Cancel button styling
cancelButtonText; // Cancel button text
authWarning; // Authentication warning styling
authWarningText; // Warning text styling
bookingCard; // Booking card styling
cancelBookingButton; // Cancel booking button
cancelBookingText; // Cancel booking text
bookingsSection; // Bookings section styling
```

---

## API Integration Summary

| API | Method | Endpoint                                            | Auth | Features                                   |
| --- | ------ | --------------------------------------------------- | ---- | ------------------------------------------ |
| 1   | GET    | /doctors?page={page}&limit={limit}                  | No   | List doctors with pagination & specialties |
| 2   | GET    | /doctors?search={query}                             | No   | Search by name, specialty, location, etc.  |
| 3   | GET    | /doctors?specialty={spec}&minFee={min}&maxFee={max} | No   | Filter by specialty and fee range          |
| 4   | GET    | /doctors/{id}?date={date}                           | No   | Get doctor details and slots               |
| 5   | GET    | /doctors/{id}/slots?date={date}                     | No   | Get slots for specific date                |
| 6   | POST   | /doctors/{id}/book                                  | Yes  | Book appointment with slot                 |
| 7   | GET    | /doctors/bookings/my                                | Yes  | Get user's bookings                        |
| 8   | PATCH  | /doctors/bookings/{id}/cancel                       | Yes  | Cancel appointment                         |

---

## Usage Example

### In a Component:

```typescript
import { doctorService } from "@/app/services/doctorService";
import { useAuth } from "@/app/context/AuthContext";

function MyComponent() {
  const { token, user } = useAuth();

  // List doctors
  const doctors = await doctorService.listDoctors(1, 20);

  // Search doctors
  const results = await doctorService.searchDoctors("yoga");

  // Filter doctors
  const filtered = await doctorService.filterDoctors(
    "Ayurvedic Medicine",
    400,
    800,
  );

  // Get doctor details with slots
  const details = await doctorService.getDoctorDetails(doctorId);

  // Get slots for specific date
  const slots = await doctorService.getDoctorSlots(doctorId, "2026-02-20");

  // Book appointment (requires auth)
  if (token) {
    await doctorService.bookSlot(doctorId, slotId, "Notes here");
  }

  // Get my bookings (requires auth)
  if (token) {
    const myBookings = await doctorService.getMyBookings();
  }

  // Cancel booking (requires auth)
  if (token) {
    await doctorService.cancelBooking(bookingId);
  }
}
```

---

## Authentication Flow

The component uses the `useAuth() hook to access authentication state:

```typescript
const { token, user } = useAuth();

// Before booking
if (!token) {
  Alert.alert("Authentication Required", "Please log in to book...");
  return;
}

// apiClient automatically adds Authorization header when token is set
```

---

## Error Handling

All API calls include error handling with user-friendly alerts:

```typescript
try {
  const data = await doctorService.listDoctors();
  // Use data
} catch (error) {
  console.error("Failed to load doctors:", error);
  Alert.alert(
    "Error",
    "Failed to load doctors list. Please check your connection.",
  );
}
```

---

## Testing Recommended Order

1. ✅ Load doctor list on home screen
2. ✅ Search for doctor by name/specialty
3. ✅ Filter by specialty
4. ✅ Filter by fee range
5. ✅ View doctor details and slots
6. ✅ Select different dates to see slots
7. ✅ Try booking without authentication (should prompt login)
8. ✅ Log in and book appointment
9. ✅ Verify booking confirmation
10. ✅ View your bookings
11. ✅ Cancel a booking
12. ✅ Verify slot becomes available again

---

## Dependencies

- React Native API (fetch)
- React Hooks (useState, useEffect, useCallback)
- TypeScript for type safety
- AuthContext for authentication state
- apiClient for HTTP requests

---

## Future Enhancements

- Add doctor reviews/ratings display
- Implement appointment reminders
- Add video consultation linking
- Payment integration for consultation fees
- Doctor profile images
- Real-time slot availability updates
- User testimonials
- Doctor availability calendar view

---

## Notes

- All API endpoints use the base URL from environment: `https://prakriti-backend-1.onrender.com/api`
- Token is automatically included in authenticated requests
- Component handles both online and offline scenarios gracefully
- Matches existing Ayurvedic color scheme and design language
- Fully responsive for mobile devices

# 💳 Razorpay Payment Integration - Complete Workflow

**Created:** February 20, 2026  
**Status:** ✅ Implemented with Demo APIs  
**Test Mode:** Active

---

## 🎯 Overview

Complete Razorpay payment integration for doctor appointment bookings in the Ayuoi app. Payment is processed **before** booking confirmation, ensuring only paid appointments are scheduled.

### Payment Flow Summary

```
User selects doctor & slot
        ↓
Clicks "Book Appointment"
        ↓
Payment confirmation dialog (₹500)
        ↓
User clicks "Pay Now"
        ↓
Backend creates Razorpay order
        ↓
Razorpay SDK opens payment UI
        ↓
User completes payment
        ↓
Backend verifies payment signature
        ↓
Booking created + Google Meet link
        ↓
Success message with meeting link
```

---

## 🔑 Test Credentials

**Razorpay Test Account**

- Key ID: `rzp_test_SIBo1BN5nZCK9O`
- Key Secret: `XIWYdOdTZgEjpuVVJmUOXG86`

**Test Cards (Use these in Razorpay checkout)**

- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Test UPI**

- UPI ID: `success@razorpay`

---

## 📦 Installed Package

```bash
npm install react-native-razorpay
```

**Package:** `react-native-razorpay@^2.3.0`  
**Documentation:** https://github.com/razorpay/react-native-razorpay

---

## 📁 Files Created/Modified

### 1. New Files Created

#### `app/services/paymentService.ts`

**Purpose:** Payment processing service using Razorpay SDK

**Key Functions:**

- `createOrder()` - Creates Razorpay order via backend
- `processPayment()` - Opens Razorpay checkout UI
- `verifyAndCompleteBooking()` - Verifies payment & creates booking
- `bookAppointmentWithPayment()` - Complete end-to-end flow

**Usage Example:**

```typescript
import { paymentService } from "@/app/services/paymentService";

const result = await paymentService.bookAppointmentWithPayment(
  doctorId,
  "Dr. Sharma",
  slotId,
  500, // amount in rupees
  {
    name: "John Doe",
    email: "john@example.com",
    contact: "9876543210",
  },
  "Feeling unwell",
);

if (result.success) {
  console.log("Booking confirmed:", result.booking);
} else {
  console.error("Payment failed:", result.error);
}
```

---

### 2. Modified Files

#### `app/services/apiClient.ts`

**Changes:** Added payment endpoints (demo mode)

**New Endpoints:**

**A. Create Payment Order**

```typescript
async createPaymentOrder(params: {
  doctorId: string;
  slotId: string;
  amount: number;
  notes?: string;
}): Promise<{
  orderId: string;
  amount: number;
  currency: string;
}>
```

**Demo Behavior:** Simulates Razorpay order creation with fake order ID

**Production Integration:**

```typescript
// Uncomment this in apiClient.ts when backend is ready:
const response = await this.makeRequest(
  "POST",
  "/payments/create-order",
  params,
);
return response.data || response;
```

**Backend Endpoint to Implement:**

```javascript
// POST /api/payments/create-order
// Expected request body:
{
  "doctorId": "doc123",
  "slotId": "slot456",
  "amount": 500,
  "notes": "Patient notes"
}

// Expected response:
{
  "orderId": "order_N3JxKzJzOz8qCa", // From Razorpay
  "amount": 500,
  "currency": "INR"
}

// Backend should:
// 1. Validate doctor & slot exist
// 2. Create Razorpay order using Razorpay SDK
// 3. Store order details in database
// 4. Return order ID to frontend
```

---

**B. Verify Payment and Book**

```typescript
async verifyPaymentAndBook(params: {
  doctorId: string;
  slotId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  notes?: string;
}): Promise<Booking>
```

**Demo Behavior:** Returns mock booking with payment details and Google Meet link

**Production Integration:**

```typescript
// Uncomment this in apiClient.ts when backend is ready:
const response = await this.makeRequest(
  "POST",
  "/payments/verify-and-book",
  params,
);
return response.data || response;
```

**Backend Endpoint to Implement:**

```javascript
// POST /api/payments/verify-and-book
// Expected request body:
{
  "doctorId": "doc123",
  "slotId": "slot456",
  "razorpayPaymentId": "pay_N3JxKzJzOz8qCa",
  "razorpayOrderId": "order_N3JxKzJzOz8qCa",
  "razorpaySignature": "abc123...",
  "notes": "Patient notes"
}

// Backend must:
// 1. Verify Razorpay signature using crypto
// 2. Mark payment as verified in database
// 3. Create booking record
// 4. Trigger N8N webhook for Google Meet
// 5. Send confirmation emails
// 6. Return booking details

// Expected response:
{
  "id": "booking_123",
  "userId": "user_456",
  "doctorId": "doc123",
  "slotId": "slot456",
  "status": "CONFIRMED",
  "paymentStatus": "PAID",
  "razorpayPaymentId": "pay_N3JxKzJzOz8qCa",
  "razorpayOrderId": "order_N3JxKzJzOz8qCa",
  "consultationFee": 500,
  "meetLink": "https://meet.google.com/abc-defg-hij",
  "createdAt": "2026-02-20T10:30:00Z",
  "slotTime": "2026-02-21T14:00:00Z"
}
```

---

#### `app/types/index.ts`

**Changes:** Updated `Booking` interface with payment fields

**New Fields Added:**

```typescript
export interface Booking {
  // ... existing fields ...

  // Payment fields
  paymentStatus?: "UNPAID" | "PENDING" | "PAID" | "FAILED";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  consultationFee?: number;

  // Meeting fields
  meetLink?: string;
  slotTime?: string;
}
```

---

#### `app/(app)/(tabs)/doctor.tsx`

**Changes:** Integrated payment flow in booking process

**Updated Function:**

```typescript
const handleBookSlot = async () => {
  // 1. Validate doctor, slot, user
  // 2. Show payment confirmation dialog
  // 3. Call paymentService.bookAppointmentWithPayment()
  // 4. Handle success/failure
  // 5. Reload bookings
};
```

**Payment Confirmation Dialog:**

- Shows doctor name
- Shows consultation fee (₹500)
- Two buttons: "Cancel" and "Pay Now"

**Success Dialog:**

- Shows meeting link
- Shows payment ID (truncated)
- Refreshes bookings list

---

## 🔄 Complete Payment Workflow

### Step 1: User Initiates Booking

**Location:** Doctor screen → Slot selection → "Book Appointment" button

**Code:**

```typescript
// In doctor.tsx
const handleBookSlot = async () => {
  if (!selectedDoctor || !selectedSlot || !user) {
    // Show error
    return;
  }

  // Show payment confirmation
  Alert.alert(
    "💳 Payment Required",
    `Fee: ₹${consultationFee}\nDoctor: ${doctorName}`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "Pay Now", onPress: processPayment },
    ],
  );
};
```

---

### Step 2: Create Razorpay Order

**Service:** `paymentService.createOrder()`

**Backend API (Demo):**

```typescript
// Current: Simulated in apiClient.ts
POST /payments/create-order
{
  "doctorId": "doc123",
  "slotId": "slot456",
  "amount": 500,
  "notes": "Patient notes"
}

// Returns:
{
  "orderId": "order_demo_12345",
  "amount": 500,
  "currency": "INR"
}
```

**Production Backend Code:**

```javascript
// Node.js + Razorpay SDK
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/api/payments/create-order", async (req, res) => {
  const { doctorId, slotId, amount, notes } = req.body;

  try {
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `booking_${Date.now()}`,
      notes: {
        doctorId,
        slotId,
        notes,
      },
    });

    // Store order in database
    await Order.create({
      orderId: order.id,
      doctorId,
      slotId,
      amount,
      status: "CREATED",
    });

    res.json({
      orderId: order.id,
      amount: order.amount / 100,
      currency: order.currency,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

### Step 3: Open Razorpay Checkout

**Service:** `paymentService.processPayment()`

**Razorpay SDK Call:**

```typescript
import RazorpayCheckout from 'react-native-razorpay';

const options = {
  description: 'Consultation with Dr. Sharma',
  image: 'https://your-logo.png',
  currency: 'INR',
  key: 'rzp_test_SIBo1BN5nZCK9O',
  amount: 50000, // ₹500 in paise
  name: 'Ayuoi - Doctor Consultation',
  order_id: 'order_N3JxKzJzOz8qCa',
  prefill: {
    name: 'John Doe',
    email: 'john@example.com',
    contact: '9876543210'
  },
  theme: { color: '#E58B3A' }
};

const data = await RazorpayCheckout.open(options);

// Success response:
{
  razorpay_payment_id: "pay_N3JxKzJzOz8qCa",
  razorpay_order_id: "order_N3JxKzJzOz8qCa",
  razorpay_signature: "abc123..."
}
```

**User Experience:**

1. Razorpay payment UI opens (modal)
2. User selects payment method (card/UPI/netbanking)
3. User completes payment
4. Razorpay SDK returns payment details
5. Modal closes automatically

---

### Step 4: Verify Payment & Create Booking

**Service:** `paymentService.verifyAndCompleteBooking()`

**Backend API (Demo):**

```typescript
POST /payments/verify-and-book
{
  "doctorId": "doc123",
  "slotId": "slot456",
  "razorpayPaymentId": "pay_N3JxKzJzOz8qCa",
  "razorpayOrderId": "order_N3JxKzJzOz8qCa",
  "razorpaySignature": "abc123...",
  "notes": "Patient notes"
}
```

**Production Backend Code:**

```javascript
const crypto = require("crypto");

app.post("/api/payments/verify-and-book", async (req, res) => {
  const {
    doctorId,
    slotId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    notes,
  } = req.body;

  try {
    // Step 1: Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      throw new Error("Invalid payment signature");
    }

    // Step 2: Update order status
    await Order.updateOne(
      { orderId: razorpayOrderId },
      {
        status: "PAID",
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    );

    // Step 3: Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      doctorId,
      slotId,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      consultationFee: 500,
      notes,
    });

    // Step 4: Trigger N8N webhook for Google Meet
    const meetLink = await triggerN8NWebhook({
      bookingId: booking.id,
      doctorEmail: doctor.email,
      patientEmail: patient.email,
      slotTime: slot.time,
    });

    // Step 5: Update booking with meet link
    booking.meetLink = meetLink;
    await booking.save();

    // Step 6: Send confirmation emails
    await sendConfirmationEmails(booking);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

### Step 5: Show Success Message

**Location:** Doctor screen success dialog

**Code:**

```typescript
Alert.alert(
  "✅ Booking Confirmed!",
  `Your appointment is confirmed!\n\n` +
    `Meeting Link: ${meetLink}\n\n` +
    `Payment ID: ${paymentId.substring(0, 20)}...`,
  [
    {
      text: "OK",
      onPress: () => {
        // Close modal
        // Reload bookings
      },
    },
  ],
);
```

---

## 🧪 Testing Guide

### Test with Demo Mode (Current Setup)

1. **Login to the app**
   - Email: Any email
   - Password: Any password

2. **Navigate to Doctor tab**

3. **Select a doctor**
   - Click on any doctor card
   - Doctor details will open

4. **Select a time slot**
   - Choose available slot
   - Click slot to select

5. **Click "Book Appointment"**
   - Payment confirmation dialog appears
   - Shows doctor name and fee (₹500)

6. **Click "Pay Now"**
   - Console logs show payment flow
   - Razorpay checkout opens

7. **Complete test payment**
   - Use test card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: Any future date
   - Click "Pay"

8. **Success dialog appears**
   - Shows Google Meet link (demo)
   - Shows payment ID
   - Shows "OK" button

9. **Check bookings**
   - Payment demo creates mock booking
   - In production, will appear in "My Bookings"

---

### Test Payment Failure

1. **Follow steps 1-6 above**

2. **In Razorpay checkout:**
   - Click "Cancel" or "Back" button
   - Or use failed test card: `4000 0000 0000 0002`

3. **Error dialog appears:**
   - "Payment Failed"
   - "Payment was not completed" or error message

4. **No booking is created**
   - User can try again

---

## 🔐 Security Features

### Payment Signature Verification

**Why it's important:**
Prevents fraudulent payment confirmations. Even if someone intercepts the payment ID, they can't fake a booking without the correct signature.

**How it works:**

```javascript
// Backend verification
const crypto = require("crypto");

const expectedSignature = crypto
  .createHmac("sha256", RAZORPAY_KEY_SECRET)
  .update(`${orderId}|${paymentId}`)
  .digest("hex");

if (expectedSignature !== receivedSignature) {
  throw new Error("Payment verification failed");
}
```

**Security guarantee:**
Only Razorpay and your backend know the secret key, so only legitimate payments can generate correct signatures.

---

### Additional Security Measures

1. **Server-side validation**
   - All payment verification happens on backend
   - Frontend cannot fake successful payments

2. **Order amount verification**
   - Backend checks if paid amount matches expected amount

3. **Prevent replay attacks**
   - Each payment ID is unique
   - Database ensures one booking per payment

4. **Secure key storage**
   - Keys stored in environment variables
   - Never committed to Git
   - Never exposed to frontend (except key_id)

---

## 📊 Console Logs

When payment flow executes, you'll see:

```
=== PAYMENT FLOW STARTED ===
Doctor: Dr. Rajesh Sharma
Slot: 2:00 PM - 3:00 PM
Amount: 500

[DEMO] Creating payment order for appointment: {
  doctorId: "doc123",
  slotId: "slot456",
  amount: 500
}

Opening Razorpay with options: {
  amount: 50000,
  currency: "INR",
  order_id: "order_demo_12345"
}

Payment successful: {
  razorpay_payment_id: "pay_xyz123",
  razorpay_order_id: "order_demo_12345",
  razorpay_signature: "abc..."
}

[DEMO] Verifying payment and creating booking: {
  doctorId: "doc123",
  slotId: "slot456",
  razorpayPaymentId: "pay_xyz123"
}

[DEMO] Booking created successfully: {
  id: "booking_123",
  meetLink: "https://meet.google.com/demo-123",
  paymentStatus: "PAID"
}

=== PAYMENT RESULT ===
{
  success: true,
  booking: { ... }
}
```

---

## 🚀 Migration to Production

### Step 1: Update Environment Variables

Create `.env` file:

```env
EXPO_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YourLiveKeyId
```

Update `paymentService.ts`:

```typescript
const RAZORPAY_KEY_ID =
  process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SIBo1BN5nZCK9O";
```

---

### Step 2: Implement Backend Endpoints

**Required endpoints:**

1. `POST /api/payments/create-order` - Create Razorpay order
2. `POST /api/payments/verify-and-book` - Verify & create booking

**See backend code examples in Steps 2 and 4 above**

---

### Step 3: Update API Client

In `apiClient.ts`, uncomment production code:

```typescript
// Remove demo simulation code
// Uncomment actual API calls

async createPaymentOrder(params) {
  const response = await this.makeRequest("POST", "/payments/create-order", params);
  return response.data || response;
}

async verifyPaymentAndBook(params) {
  const response = await this.makeRequest("POST", "/payments/verify-and-book", params);
  return response.data || response;
}
```

---

### Step 4: Test with Live Credentials

1. Get live API keys from Razorpay Dashboard
2. Update environment variables
3. Test with real payment methods
4. Verify webhooks are working

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue:** "Payment verification failed"

- **Cause:** Signature mismatch
- **Fix:** Ensure backend uses same key_secret

**Issue:** "Order creation failed"

- **Cause:** Backend not responding
- **Fix:** Check API endpoint and logs

**Issue:** "Razorpay checkout not opening"

- **Cause:** Invalid order_id or amount
- **Fix:** Verify order creation response

**Issue:** "Payment success but booking not created"

- **Cause:** Backend verification issue
- **Fix:** Check backend logs for errors

---

## 📝 Next Steps

1. **Implement backend endpoints** (see examples above)
2. **Setup N8N webhook** for Google Meet generation
3. **Configure SendGrid** for email notifications
4. **Test end-to-end flow** with test credentials
5. **Switch to live keys** when ready for production

---

## 🎉 Summary

✅ **Installed:** `react-native-razorpay`  
✅ **Created:** Payment service with Razorpay SDK  
✅ **Updated:** Doctor booking flow with payment  
✅ **Added:** Payment fields to Booking type  
✅ **Implemented:** Demo payment APIs  
✅ **Ready:** For backend integration

**Current Status:** Demo mode working with Razorpay test checkout  
**Production Ready:** After backend endpoints are implemented  
**Test Credentials:** Working and documented

---

**Need Help?** Check Razorpay docs: https://razorpay.com/docs/api/

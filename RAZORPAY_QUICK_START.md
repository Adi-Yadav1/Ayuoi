# 🚀 Razorpay Payment - Quick Start Guide

## ⚡ Test the Payment Flow Right Now

### Step 1: Run the App

```bash
npm start
```

### Step 2: Login

- Use any email/password (demo mode)

### Step 3: Book an Appointment

1. **Go to "Doctor" tab** (bottom navigation)
2. **Select any doctor** from the list
3. **View doctor details** (tap on card)
4. **Choose a time slot** (tap on available slot)
5. **Click "Book Appointment"** button
6. **Payment dialog appears:**

   ```
   💳 Payment Required
   Consultation Fee: ₹500
   Doctor: Dr. [Name]

   [Cancel] [Pay Now]
   ```

7. **Click "Pay Now"**

### Step 4: Complete Payment in Razorpay

**Razorpay Test Checkout Opens:**

Use these **test credentials:**

#### Option 1: Credit/Debit Card

```
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: 12/25 (any future date)
Name: Your Name
```

#### Option 2: UPI

```
UPI ID: success@razorpay
```

#### Option 3: Netbanking

- Select any bank
- Username: `razorpay`
- Password: `razorpay`

### Step 5: Success!

**You'll see:**

```
✅ Booking Confirmed!

Your appointment is confirmed!

Meeting Link: https://meet.google.com/demo-123
Payment ID: pay_xyz123...

[OK]
```

---

## 🎯 What Happens Behind the Scenes

```
┌─────────────────────────────────────────────────────────────┐
│                    PAYMENT WORKFLOW                          │
└─────────────────────────────────────────────────────────────┘

1. USER CLICKS "PAY NOW"
   │
   ▼
2. CREATE RAZORPAY ORDER
   ├─ Backend creates order (demo: simulated)
   ├─ Order ID: order_demo_12345
   └─ Amount: ₹500 (50000 paise)
   │
   ▼
3. OPEN RAZORPAY CHECKOUT
   ├─ Razorpay SDK opens payment UI
   ├─ User selects payment method
   └─ User completes payment
   │
   ▼
4. PAYMENT SUCCESS
   ├─ Payment ID: pay_xyz123
   ├─ Order ID: order_demo_12345
   └─ Signature: abc123...
   │
   ▼
5. VERIFY PAYMENT
   ├─ Backend verifies signature (demo: simulated)
   ├─ Signature matches ✓
   └─ Payment confirmed
   │
   ▼
6. CREATE BOOKING
   ├─ Save booking to database (demo: simulated)
   ├─ Generate Google Meet link (demo: simulated)
   └─ Send confirmation emails (demo: simulated)
   │
   ▼
7. SHOW SUCCESS
   ├─ Display meeting link
   ├─ Display payment ID
   └─ Close booking modal

```

---

## 📱 User Experience Flow

```
╔════════════════════════════════════════╗
║        DOCTOR SCREEN                    ║
║                                        ║
║  🔍 Search doctors...                  ║
║                                        ║
║  ┌──────────────────────────────┐    ║
║  │ Dr. Rajesh Sharma            │    ║
║  │ Ayurvedic Specialist         │    ║
║  │ ⭐⭐⭐⭐⭐ 4.8 (124)          │    ║
║  │ ₹500 consultation            │    ║
║  └──────────────────────────────┘    ║
║         ▼ (tap)                       ║
╚════════════════════════════════════════╝
           │
           ▼
╔════════════════════════════════════════╗
║      DOCTOR DETAILS MODAL               ║
║                                        ║
║  Dr. Rajesh Sharma                     ║
║  📞 +91 98765 43210                    ║
║  ✉️ dr.sharma@ayurveda.com            ║
║                                        ║
║  Available Slots:                      ║
║  ┌─────┐ ┌─────┐ ┌─────┐             ║
║  │10 AM│ │2 PM │ │4 PM │             ║
║  └─────┘ └─────┘ └─────┘             ║
║      ▼ (select slot)                  ║
║                                        ║
║  📝 Notes: [Feeling unwell]           ║
║                                        ║
║  [   Book Appointment   ]             ║
║         ▼ (tap)                       ║
╚════════════════════════════════════════╝
           │
           ▼
╔════════════════════════════════════════╗
║    PAYMENT CONFIRMATION ALERT           ║
║                                        ║
║  💳 Payment Required                   ║
║                                        ║
║  Consultation Fee: ₹500                ║
║  Doctor: Dr. Rajesh Sharma             ║
║                                        ║
║  Proceed to payment?                   ║
║                                        ║
║  [ Cancel ]      [ Pay Now ]          ║
║                      ▼ (tap)          ║
╚════════════════════════════════════════╝
           │
           ▼
╔════════════════════════════════════════╗
║      RAZORPAY CHECKOUT MODAL            ║
║                                        ║
║  Ayuoi - Doctor Consultation           ║
║  Amount: ₹500                          ║
║                                        ║
║  💳 Card  UPI  Net Banking  Wallet    ║
║                                        ║
║  Card Number:                          ║
║  [4111 1111 1111 1111]                ║
║                                        ║
║  Expiry:    CVV:                       ║
║  [12/25]    [123]                     ║
║                                        ║
║  [        Pay ₹500        ]           ║
║              ▼ (tap)                  ║
╚════════════════════════════════════════╝
           │
           ▼ (processing...)
           │
╔════════════════════════════════════════╗
║        SUCCESS ALERT                    ║
║                                        ║
║  ✅ Booking Confirmed!                 ║
║                                        ║
║  Your appointment is confirmed!        ║
║                                        ║
║  Meeting Link:                         ║
║  https://meet.google.com/abc-def       ║
║                                        ║
║  Payment ID:                           ║
║  pay_N3JxKzJzOz8qCa...                ║
║                                        ║
║  [          OK          ]             ║
║              ▼                        ║
╚════════════════════════════════════════╝
           │
           ▼ (modal closes)
           │
╔════════════════════════════════════════╗
║        DOCTOR SCREEN                    ║
║                                        ║
║  Booking successful! ✓                 ║
║                                        ║
║  (Bookings list refreshed)             ║
╚════════════════════════════════════════╝
```

---

## 🧪 Testing Scenarios

### ✅ Test 1: Successful Payment

1. Select doctor & slot
2. Click "Pay Now"
3. Use test card: `4111 1111 1111 1111`
4. Complete payment
5. ✓ Success dialog appears
6. ✓ Meeting link shown
7. ✓ Payment ID shown

### ❌ Test 2: User Cancels Payment

1. Select doctor & slot
2. Click "Pay Now"
3. Click "Cancel" in Razorpay
4. ✓ Error dialog: "Payment cancelled by user"
5. ✓ No booking created

### ❌ Test 3: Payment Fails

1. Select doctor & slot
2. Click "Pay Now"
3. Use failed card: `4000 0000 0000 0002`
4. ✓ Error dialog: "Payment failed"
5. ✓ No booking created

---

## 🔍 Debug Logs

Open console to see detailed logs:

```javascript
// Example console output:

=== PAYMENT FLOW STARTED ===
Doctor: Dr. Rajesh Sharma
Slot: 2:00 PM - 3:00 PM
Amount: 500

[DEMO] Creating payment order for appointment: {
  doctorId: "doc_123",
  slotId: "slot_456",
  amount: 500
}

Opening Razorpay with options: {
  description: "Consultation with Dr. Rajesh Sharma",
  amount: 50000,
  currency: "INR",
  key: "rzp_test_SIBo1BN5nZCK9O",
  order_id: "order_demo_1708434567_abc123"
}

Payment successful: {
  razorpay_payment_id: "pay_N3JxKzJzOz8qCa",
  razorpay_order_id: "order_demo_1708434567_abc123",
  razorpay_signature: "a1b2c3d4e5f6..."
}

[DEMO] Verifying payment and creating booking: {
  doctorId: "doc_123",
  slotId: "slot_456",
  razorpayPaymentId: "pay_N3JxKzJzOz8qCa",
  razorpayOrderId: "order_demo_1708434567_abc123",
  razorpaySignature: "a1b2c3d4e5f6..."
}

[DEMO] Booking created successfully: {
  id: "booking_1708434568",
  status: "CONFIRMED",
  paymentStatus: "PAID",
  consultationFee: 500,
  meetLink: "https://meet.google.com/demo-1708434568"
}

=== PAYMENT RESULT ===
{
  success: true,
  booking: { ... }
}
```

---

## 📊 Current Status

| Feature          | Status        | Notes                            |
| ---------------- | ------------- | -------------------------------- |
| Razorpay SDK     | ✅ Installed  | `react-native-razorpay`          |
| Payment Service  | ✅ Created    | `app/services/paymentService.ts` |
| Payment UI       | ✅ Integrated | In doctor booking flow           |
| Demo APIs        | ✅ Working    | Simulated backend responses      |
| Test Credentials | ✅ Provided   | Razorpay test keys               |
| Type Definitions | ✅ Added      | TypeScript support               |
| Error Handling   | ✅ Complete   | Payment failures handled         |
| Success Flow     | ✅ Working    | Shows meeting link               |

---

## 🎯 Next Steps for Production

1. **Implement Backend Endpoints:**
   - `POST /api/payments/create-order`
   - `POST /api/payments/verify-and-book`

2. **Setup Payment Signature Verification:**

   ```javascript
   const crypto = require("crypto");
   const signature = crypto
     .createHmac("sha256", RAZORPAY_KEY_SECRET)
     .update(`${orderId}|${paymentId}`)
     .digest("hex");
   ```

3. **Integrate Google Meet Generation:**
   - Use N8N webhook
   - Generate unique meeting links
   - Store in booking record

4. **Configure Email Notifications:**
   - SendGrid integration
   - Confirmation emails
   - Meeting details

5. **Switch to Live Keys:**

   ```env
   EXPO_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YourLiveKey
   ```

6. **Test End-to-End:**
   - Real payments
   - Meeting links
   - Email delivery

---

## 📚 Documentation Files

1. **RAZORPAY_PAYMENT_WORKFLOW.md**
   - Complete technical documentation
   - Backend code examples
   - Security details

2. **RAZORPAY_QUICK_START.md** (this file)
   - Quick testing guide
   - Visual workflows
   - Debug logs

3. **PAYMENT_N8N_INTEGRATION.md**
   - N8N webhook setup
   - Google Meet generation
   - Email configuration

---

## ❓ FAQ

**Q: Why am I seeing "DEMO" in console logs?**  
A: Backend endpoints are simulated. Replace with real API calls for production.

**Q: Where is the booking saved?**  
A: Currently simulated. Implement database storage on backend.

**Q: Is the Google Meet link real?**  
A: No, it's a demo link. Implement N8N webhook for real links.

**Q: Can I test with real money?**  
A: No, test mode uses Razorpay's sandbox. No real money is charged.

**Q: What if payment succeeds but booking fails?**  
A: Payment verification ensures atomic operation. If verification fails, refund should be initiated.

---

## 🆘 Troubleshooting

### Razorpay checkout not opening

**Fix:** Check console for errors. Ensure order_id is valid.

### Payment success but no booking

**Fix:** Check backend logs. Verify signature validation.

### "Payment verification failed"

**Fix:** Ensure backend uses correct key_secret.

### Meeting link not showing

**Fix:** Check N8N webhook configuration.

---

## ✅ Ready to Test!

Everything is set up. Just follow **Step-by-Step Test** at the top of this file.

**Have fun testing the payment flow! 🎉**

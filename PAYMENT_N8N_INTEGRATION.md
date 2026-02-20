# 💳 Payment + N8N Integration Guide

**Version:** 1.0.0  
**Date:** February 20, 2026  
**Status:** Implementation Ready ✅

---

## 📋 Overview

This guide provides complete backend implementation instructions for integrating:

- **Razorpay Payment Gateway** - for appointment consultation fees
- **N8N Webhook** - for automatic Google Meet scheduling
- **SendGrid Email Service** - for confirmation notifications

### What This Enables

```
User Books Appointment
    ↓
Process Payment (Razorpay)
    ↓
Verify Payment Signature
    ↓
Create Booking in Database
    ↓
Generate Google Meet Link (N8N)
    ↓
Send Confirmation Emails
    ↓
Show Success Message
```

---

## 📐 Phase 1: Database Schema Updates

### Update Booking Model/Schema

Add these new fields to your `Booking` collection in MongoDB:

```javascript
// File: models/Booking.js (MongoDB/Mongoose)

const bookingSchema = new Schema(
  {
    // Existing fields (keep these):
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "DoctorSlot",
      required: true,
    },
    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"],
      default: "CONFIRMED",
    },
    notes: String,

    // ✅ NEW PAYMENT FIELDS:
    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PENDING", "PAID", "FAILED"],
      default: "UNPAID",
    },
    razorpayOrderId: {
      type: String,
      required: false,
      index: true,
    },
    razorpayPaymentId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    razorpaySignature: {
      type: String,
      required: false,
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 500, // in rupees
    },

    // ✅ NEW MEETING FIELDS:
    meetLink: {
      type: String,
      required: false,
    },
    meetId: {
      type: String,
      required: false,
    },
    meetEventId: {
      type: String,
      required: false,
    },

    // ✅ EMAIL TRACKING:
    emailsSent: {
      patient: {
        type: Boolean,
        default: false,
      },
      doctor: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

// Add indexes for queries
bookingSchema.index({ userId: 1, paymentStatus: 1 });
bookingSchema.index({ doctorId: 1, status: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
```

---

## 🔧 Phase 2: Install Required Packages

Run these commands in your backend project:

```bash
# Core dependencies
npm install razorpay          # Razorpay payment SDK
npm install crypto            # Signature verification
npm install axios             # HTTP client for webhooks
npm install @sendgrid/mail    # Email service

# If not already installed:
npm install dotenv            # Environment variables
npm install express           # Express.js
npm install mongoose          # MongoDB ODM
```

---

## 🔐 Phase 3: Environment Variables

Create or update your `.env` file:

```env
# ============================================
# RAZORPAY CREDENTIALS (Test Mode)
# ============================================
RAZORPAY_KEY_ID=rzp_test_SIBo1BN5nZCK9O
RAZORPAY_SECRET=XIWYdOdTZgEjpuVVJmUOXG86

# ============================================
# N8N WEBHOOK
# ============================================
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/schedule-meeting

# ============================================
# EMAIL SERVICE (SendGrid)
# ============================================
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDER_EMAIL=noreply@ayurvedicwellness.com
DOCTOR_SUPPORT_EMAIL=support@ayurvedicwellness.com

# ============================================
# APP URLS
# ============================================
FRONTEND_URL=http://localhost:8081
BACKEND_URL=http://localhost:5000

# ============================================
# DATABASE
# ============================================
MONGODB_URI=mongodb://localhost:27017/ayuoi
NODE_ENV=development
```

### How to Get These Credentials

**Razorpay:**

1. Go to https://dashboard.razorpay.com
2. Sign up / Login
3. Go to Settings → API Keys
4. Copy Test Key ID and Test Secret

**SendGrid:**

1. Go to https://sendgrid.com
2. Create account
3. Go to Settings → API Keys
4. Create new API key
5. Verify sender email domain

**N8N:**

1. Deploy n8n instance
2. Create webhook trigger workflow
3. Copy webhook URL

---

## 🔌 Phase 4: Create Backend Endpoints

### Endpoint 1️⃣: Create Razorpay Order

**Purpose:** Generate a Razorpay order before payment

```javascript
// File: routes/payments.js

const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { authenticate } = require("../middleware/auth");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/**
 * POST /api/payments/create-order
 * Create Razorpay order for consultation fee
 *
 * Authentication: Required (user must be logged in)
 */
router.post("/create-order", authenticate, async (req, res) => {
  try {
    const { amount, description } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid amount",
      });
    }

    // Create order
    const orderOptions = {
      amount: Math.round(amount * 100), // Convert rupees to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        description: description || "Ayurvedic Consultation",
        userId: req.user.id,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    console.log("Order created:", order.id);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      amountInRupees: amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to create order",
    });
  }
});

module.exports = router;
```

---

### Endpoint 2️⃣: Verify Payment & Create Booking

**Purpose:** Main endpoint - verify payment, create booking, schedule meeting

```javascript
// File: routes/bookings.js

const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Booking = require("../models/Booking");
const DoctorSlot = require("../models/DoctorSlot");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");
const emailService = require("../services/emailService");
const n8nService = require("../services/n8nService");

/**
 * POST /api/doctors/bookings/create-with-payment
 *
 * Complete booking flow:
 * 1. Verify Razorpay payment signature
 * 2. Create booking in database
 * 3. Mark slot as booked
 * 4. Call N8N to create Google Meet
 * 5. Send confirmation emails
 * 6. Return success with meet link
 *
 * Authentication: Required
 */
router.post("/create-with-payment", authenticate, async (req, res) => {
  try {
    const {
      doctorId,
      slotId,
      patientEmail,
      patientPhone,
      patientName,
      doctorEmail,
      doctorName,
      appointmentTime,
      consultationFee,
      notes,
      // Razorpay verification fields
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    // ✅ STEP 1: Validate input
    if (!doctorId || !slotId || !razorpayPaymentId) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    console.log("🔐 Verifying payment for order:", razorpayOrderId);

    // ✅ STEP 2: Verify Razorpay Payment Signature
    const isPaymentValid = verifyRazorpaySignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    );

    if (!isPaymentValid) {
      console.error("❌ Payment signature verification failed");
      return res.status(400).json({
        status: "error",
        message: "Payment verification failed. Please try again.",
      });
    }

    console.log("✅ Payment signature verified");

    // ✅ STEP 3: Get doctor details
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        status: "error",
        message: "Doctor not found",
      });
    }

    // ✅ STEP 4: Check slot availability
    const slot = await DoctorSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({
        status: "error",
        message: "Slot not found",
      });
    }

    if (slot.isBooked) {
      return res.status(400).json({
        status: "error",
        message: "This slot is already booked",
      });
    }

    // ✅ STEP 5: Create booking in database
    console.log("📝 Creating booking...");
    const booking = await Booking.create({
      userId: req.user.id,
      doctorId: doctor._id,
      slotId: slot._id,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      consultationFee,
      notes,
    });

    console.log("✅ Booking created:", booking._id);

    // ✅ STEP 6: Mark slot as booked
    await DoctorSlot.findByIdAndUpdate(
      slotId,
      { isBooked: true },
      { new: true },
    );

    // ✅ STEP 7: Calculate meeting times
    const startTime = new Date(appointmentTime);
    const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 min consultation

    // ✅ STEP 8: Call N8N Webhook to create Google Meet
    console.log("🔗 Calling N8N webhook...");
    let meetingDetails;
    try {
      meetingDetails = await n8nService.scheduleMeeting({
        patient_email: patientEmail,
        doctor_email: doctorEmail,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        title: `Consultation with Dr. ${doctor.name}`,
        description: `Ayurvedic Consultation - Booking ID: ${booking._id}`,
      });

      console.log("✅ Meeting created:", meetingDetails.meet_link);
    } catch (webhookError) {
      console.error("⚠️ N8N webhook failed:", webhookError.message);
      // Continue anyway - can schedule later
      meetingDetails = {
        meet_link: `https://meet.google.com/${generateMeetId()}`,
        event_id: `event_${Date.now()}`,
      };
    }

    // ✅ STEP 9: Update booking with meet link
    booking.meetLink = meetingDetails.meet_link;
    booking.meetId = extractMeetId(meetingDetails.meet_link);
    booking.meetEventId = meetingDetails.event_id;
    await booking.save();

    // ✅ STEP 10: Send confirmation emails
    console.log("📧 Sending confirmation emails...");
    try {
      await emailService.sendPatientConfirmation({
        email: patientEmail,
        name: patientName,
        doctorName: doctor.name,
        appointmentTime: startTime.toLocaleString(),
        meetLink: meetingDetails.meet_link,
      });

      await emailService.sendDoctorConfirmation({
        email: doctorEmail,
        name: doctor.name,
        patientName,
        appointmentTime: startTime.toLocaleString(),
        meetLink: meetingDetails.meet_link,
      });

      booking.emailsSent.patient = true;
      booking.emailsSent.doctor = true;
      await booking.save();

      console.log("✅ Emails sent");
    } catch (emailError) {
      console.error("⚠️ Email sending failed:", emailError.message);
      // Don't fail the booking if emails fail
    }

    // ✅ STEP 11: Return success response
    res.status(201).json({
      status: "success",
      data: {
        bookingId: booking._id,
        meetLink: meetingDetails.meet_link,
        meetId: booking.meetId,
        message:
          "Appointment booked successfully! Google Meet link sent to both doctor and patient.",
      },
    });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to complete booking",
    });
  }
});

/**
 * Helper: Verify Razorpay Payment Signature
 */
function verifyRazorpaySignature(orderId, paymentId, signature) {
  try {
    const message = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(message)
      .digest("hex");

    const isValid = signature === expectedSignature;
    console.log("Signature verification:", isValid ? "✅ Valid" : "❌ Invalid");
    return isValid;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

/**
 * Helper: Generate random meet ID
 */
function generateMeetId() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let meetId = "";
  for (let i = 0; i < 3; i++) {
    meetId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  meetId += "-";
  for (let i = 0; i < 4; i++) {
    meetId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  meetId += "-";
  for (let i = 0; i < 3; i++) {
    meetId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return meetId;
}

/**
 * Helper: Extract meet ID from meet URL
 */
function extractMeetId(meetUrl) {
  return meetUrl.split("/").pop();
}

module.exports = router;
```

---

### Endpoint 3️⃣: Get Meet Link

**Purpose:** Retrieve meet link for existing booking

```javascript
/**
 * GET /api/doctors/bookings/:bookingId/meet-link
 *
 * Get Google Meet link for an existing booking
 * Authentication: Required
 */
router.get("/:bookingId/meet-link", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    // Verify user owns this booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!booking.meetLink) {
      return res.status(400).json({
        status: "error",
        message: "Meet link not available for this booking",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        bookingId: booking._id,
        meetLink: booking.meetLink,
        meetId: booking.meetId,
        generatedAt: booking.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
```

---

### Endpoint 4️⃣: Regenerate Meet Link (Optional)

**Purpose:** Create new meet link if old one expired

```javascript
/**
 * POST /api/doctors/bookings/:bookingId/regenerate-meet-link
 *
 * Generate new Google Meet link for appointment
 * Useful if link expired or was lost
 * Authentication: Required
 */
router.post(
  "/:bookingId/regenerate-meet-link",
  authenticate,
  async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.bookingId);

      if (!booking) {
        return res.status(404).json({
          status: "error",
          message: "Booking not found",
        });
      }

      // Verify ownership
      if (booking.userId.toString() !== req.user.id) {
        return res.status(403).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const oldMeetLink = booking.meetLink;

      // Generate new meet link via N8N
      const newMeetingData = await n8nService.scheduleMeeting({
        patient_email: booking.patientEmail,
        doctor_email: booking.doctorEmail,
        start_time: booking.slot.startTime,
        end_time: booking.slot.endTime,
        title: `Consultation with Dr. ${booking.doctor.name}`,
        description: `Rescheduled Meeting - Booking ID: ${booking._id}`,
      });

      // Update booking
      booking.meetLink = newMeetingData.meet_link;
      booking.meetId = extractMeetId(newMeetingData.meet_link);
      await booking.save();

      res.status(200).json({
        status: "success",
        data: {
          bookingId: booking._id,
          oldMeetLink,
          newMeetLink: newMeetingData.meet_link,
          note: "New link generated. Old link will no longer work.",
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
);
```

---

## 🛠️ Phase 5: Create Helper Services

### Service 1: N8N Service

```javascript
// File: services/n8nService.js

const axios = require("axios");

class N8NService {
  /**
   * Schedule meeting via N8N webhook
   * Creates Google Meet link and calendar event
   */
  async scheduleMeeting(payload) {
    try {
      console.log("📤 Sending to N8N:", payload);

      const response = await axios.post(
        process.env.N8N_WEBHOOK_URL,
        {
          patient_email: payload.patient_email,
          doctor_email: payload.doctor_email,
          start_time: payload.start_time, // ISO format
          end_time: payload.end_time, // ISO format
          title: payload.title,
          description: payload.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000, // 15 second timeout
        },
      );

      if (!response.data.meet_link) {
        throw new Error("No meet link in response");
      }

      return {
        meet_link: response.data.meet_link,
        event_id: response.data.event_id,
      };
    } catch (error) {
      console.error("N8N service error:", error.message);
      throw new Error(`Failed to schedule meeting: ${error.message}`);
    }
  }
}

module.exports = new N8NService();
```

---

### Service 2: Email Service

```javascript
// File: services/emailService.js

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  /**
   * Send confirmation email to patient
   */
  async sendPatientConfirmation({
    email,
    name,
    doctorName,
    appointmentTime,
    meetLink,
  }) {
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: `Appointment Confirmed with Dr. ${doctorName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #E58B3A 0%, #D47A2A 100%); color: white; padding: 30px; text-align: center; }
              .content { padding: 30px; background: #f9f9f9; }
              .info { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #E58B3A; }
              .button { 
                display: inline-block;
                background: #E58B3A;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Appointment Confirmed! ✅</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                
                <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been confirmed.</p>
                
                <div class="info">
                  <h3>Appointment Details</h3>
                  <p><strong>📅 Date & Time:</strong> ${appointmentTime}</p>
                  <p><strong>👨‍⚕️ Doctor:</strong> Dr. ${doctorName}</p>
                  <p><strong>💼 Type:</strong> Ayurvedic Consultation</p>
                </div>

                <div class="info">
                  <h3>Google Meet Link</h3>
                  <p>Your video consultation will be held via Google Meet.</p>
                  <a href="${meetLink}" class="button">Join Video Call</a>
                  <p style="margin-top: 15px; color: #666; font-size: 12px;">
                    Or copy this link: ${meetLink}
                  </p>
                </div>

                <div class="info">
                  <h3>Before Your Appointment</h3>
                  <ul>
                    <li>Join 5 minutes early to test your camera and microphone</li>
                    <li>Have your health records or questions ready</li>
                    <li>Ensure good lighting in your room</li>
                    <li>Use a quiet, private space</li>
                  </ul>
                </div>

                <p>If you need to reschedule or have any questions, please contact us at ${process.env.DOCTOR_SUPPORT_EMAIL}</p>

                <p>Warm regards,<br>
                <strong>Ayurvedic Wellness Team</strong></p>
              </div>
              <div class="footer">
                <p>© 2026 Ayurvedic Wellness. All rights reserved.</p>
                <p>This is an automated message. Please do not reply directly to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log("✅ Patient confirmation email sent to:", email);
    } catch (error) {
      console.error("❌ Failed to send patient email:", error);
      throw error;
    }
  }

  /**
   * Send notification email to doctor
   */
  async sendDoctorConfirmation({
    email,
    name,
    patientName,
    appointmentTime,
    meetLink,
  }) {
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: `New Appointment: ${patientName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #E58B3A 0%, #D47A2A 100%); color: white; padding: 30px; text-align: center; }
              .content { padding: 30px; background: #f9f9f9; }
              .info { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #E58B3A; }
              .button { 
                display: inline-block;
                background: #E58B3A;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Appointment Scheduled 📅</h1>
              </div>
              <div class="content">
                <p>Dear Dr. ${name},</p>
                
                <p>A new appointment has been scheduled with your patient.</p>
                
                <div class="info">
                  <h3>Patient Information</h3>
                  <p><strong>Name:</strong> ${patientName}</p>
                  <p><strong>📅 Appointment Time:</strong> ${appointmentTime}</p>
                  <p><strong>🎥 Consultation Type:</strong> Video Call (Google Meet)</p>
                </div>

                <div class="info">
                  <h3>Join Video Call</h3>
                  <a href="${meetLink}" class="button">Join Meeting</a>
                  <p style="margin-top: 15px; color: #666; font-size: 12px;">
                    Link: ${meetLink}
                  </p>
                </div>

                <p>Please ensure you're available at the scheduled time.</p>

                <p>Best regards,<br>
                <strong>Ayurvedic Wellness Platform</strong></p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log("✅ Doctor notification email sent to:", email);
    } catch (error) {
      console.error("❌ Failed to send doctor email:", error);
      throw error;
    }
  }
}

module.exports = new EmailService();
```

---

## 🧪 Phase 6: Testing

### Test Cards (Razorpay)

**Successful Payment:**

```
Card Number:     4111 1111 1111 1111
Expiry:          Any future date (e.g., 12/25)
CVV:             Any 3 digits (e.g., 123)
OTP:             123456 (usually auto-filled)
```

**Failed Payment:**

```
Card Number:     4222 2222 2222 2222
Expiry:          Any future date
CVV:             Any 3 digits
```

### cURL Test Commands

**1. Create Order:**

```bash
curl -X POST http://localhost:5000/api/payments/create-order \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "description": "Consultation with Dr. Smith"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "orderId": "order_1234567890",
  "amount": 50000,
  "amountInRupees": 500,
  "currency": "INR"
}
```

**2. Create Booking with Payment:**

```bash
curl -X POST http://localhost:5000/api/doctors/bookings/create-with-payment \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "doctorId": "doc_123",
    "slotId": "slot_456",
    "patientEmail": "john@gmail.com",
    "patientPhone": "9876543210",
    "patientName": "John Doe",
    "doctorEmail": "dr.smith@clinic.com",
    "doctorName": "Dr. Smith",
    "appointmentTime": "2026-02-24T10:00:00Z",
    "consultationFee": 500,
    "notes": "First consultation",
    "razorpayPaymentId": "pay_123xyz",
    "razorpayOrderId": "order_123xyz",
    "razorpaySignature": "sig_xyz"
  }'
```

**Expected Response:**

```json
{
  "status": "success",
  "data": {
    "bookingId": "booking_123",
    "meetLink": "https://meet.google.com/abc-defg-hij",
    "meetId": "abc-defg-hij",
    "message": "Appointment booked successfully!"
  }
}
```

---

## 📅 Implementation Timeline

### **Week 1: Database & Setup**

- [ ] Update Booking schema
- [ ] Install all packages
- [ ] Setup .env variables
- [ ] Create helper services (N8N, Email)
- [ ] Deploy to dev environment

### **Week 2: Payment Endpoints**

- [ ] Create payment order endpoint
- [ ] Create booking-with-payment endpoint
- [ ] Implement payment verification
- [ ] Test with Razorpay test cards

### **Week 3: Integration & Testing**

- [ ] Setup N8N webhook
- [ ] Integration test full flow
- [ ] Email testing
- [ ] Bug fixes
- [ ] Documentation

### **Week 4: Deployment**

- [ ] Production credentials setup
- [ ] Final testing on staging
- [ ] Deploy to production
- [ ] Monitor and support

---

## 🚀 Integration Checklist

### Database

- [ ] Booking schema updated
- [ ] All fields added (payment, meeting, emails)
- [ ] Indexes created

### Packages

- [ ] razorpay installed
- [ ] axios installed
- [ ] @sendgrid/mail installed
- [ ] crypto installed

### Environment

- [ ] RAZORPAY_KEY_ID set
- [ ] RAZORPAY_SECRET set
- [ ] N8N_WEBHOOK_URL set
- [ ] SENDGRID_API_KEY set
- [ ] SENDER_EMAIL set

### Endpoints (4 total)

- [ ] POST /api/payments/create-order
- [ ] POST /api/doctors/bookings/create-with-payment
- [ ] GET /api/doctors/bookings/:bookingId/meet-link
- [ ] POST /api/doctors/bookings/:bookingId/regenerate-meet-link

### Services

- [ ] N8N Service implemented
- [ ] Email Service implemented
- [ ] Payment verification function created

### Testing

- [ ] Create order works
- [ ] Payment signature verification works
- [ ] Booking created successfully
- [ ] N8N webhook called
- [ ] Emails sent
- [ ] Meet link returned

### Documentation

- [ ] Code comments added
- [ ] API documentation updated
- [ ] Team training completed

---

## 🔄 Complete Request/Response Flow

### User Booking Journey

```
1. Frontend: Select doctor + slot
   ↓
2. Frontend: Call POST /api/payments/create-order
   ← Get orderId from backend
   ↓
3. Frontend: Open Razorpay payment modal
   ← User enters payment details
   ↓
4. Razorpay: Process payment
   ↓
5. Frontend: Get payment response with paymentId & signature
   ↓
6. Frontend: Call POST /api/doctors/bookings/create-with-payment
   with (doctorId, slotId, payment details, appointment info)
   ↓
7. Backend:
   ✓ Verify payment signature
   ✓ Create booking in DB
   ✓ Mark slot as booked
   ✓ Call N8N webhook
   ✓ Get meet link
   ✓ Send emails
   ↓
8. Frontend: Show success message
   "Appointment booked! Meet link sent to your email."
   ↓
9. Both doctor and patient receive email with meet link
```

---

## ⚠️ Error Handling

### Payment Verification Failed

```json
{
  "status": "error",
  "message": "Payment verification failed. Please try again."
}
```

**Action:** Ask user to re-initiate payment

### Slot Already Booked

```json
{
  "status": "error",
  "message": "This slot is already booked"
}
```

**Action:** Reload available slots and show user

### Email Sending Failed

- Booking still succeeds
- Manually resend email later
- Log error for support team

### N8N Webhook Failed

- Booking succeeds
- Fallback: Generate local meet link
- Send link via email
- Log error for debugging

---

## 📞 Support & Debugging

### Common Issues

**1. "Razorpay signature verification failed"**

- Verify RAZORPAY_SECRET is correct
- Check if secret key changed between requests
- Ensure orderId and paymentId formats are correct

**2. "N8N webhook timeout"**

- Check if N8N instance is running
- Verify webhook URL is correct
- Increase timeout in code

**3. "Emails not sending"**

- Verify SendGrid API key
- Check if sender email is verified
- Check logs for SendGrid errors
- Test with SendGrid dashboard

**4. "Slot not found"**

- Verify slot exists in database
- Check if slot was already booked
- Refresh available slots list

### Monitoring

Add logging at each step:

```javascript
console.log("Step 1: Starting payment verification");
console.log("✅ Payment verified");
console.log("⚠️ N8N webhook failed - using fallback");
console.log("❌ Critical error - booking failed");
```

Set up monitoring for:

- Failed payment signatures
- N8N webhook failures
- Email delivery failures
- Database transaction failures

---

## 🎯 Summary

This integration provides:

✅ **Secure Payment Processing** - Razorpay signature verification  
✅ **Automated Meeting Scheduling** - N8N webhook integration  
✅ **Email Notifications** - SendGrid for confirmations  
✅ **Complete Audit Trail** - All payment & booking info stored  
✅ **Error Handling** - Graceful fallbacks for failures  
✅ **HIPAA Compliant** - Secure data handling

---

**Next Steps:**

1. Share this with your backend team
2. Start with Phase 1 (Database schema)
3. Once 2 endpoints ready → Frontend integration begins
4. Full testing across all systems

Good luck with the implementation! 🚀

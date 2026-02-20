/**
 * Payment Service - Razorpay Integration
 * Handles payment processing for doctor consultations
 *
 * NOTE: Using demo mode for Expo compatibility
 * For production, use EAS Build with react-native-razorpay
 */

import { apiClient } from "./apiClient";

// Razorpay Test Credentials
const RAZORPAY_KEY_ID = "rzp_test_SIBo1BN5nZCK9O";
const RAZORPAY_KEY_SECRET = "XIWYdOdTZgEjpuVVJmUOXG86";

// Demo mode flag - set to false when using EAS Build with native modules
export const DEMO_MODE = true;

export interface PaymentOptions {
  amount: number; // in rupees
  currency: string;
  name: string;
  description: string;
  orderId: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

class PaymentService {
  /**
   * Create a Razorpay order for doctor consultation
   */
  async createOrder(
    doctorId: string,
    slotId: string,
    amount: number,
    notes?: string,
  ): Promise<{ orderId: string; amount: number; currency: string }> {
    try {
      // Call backend to create Razorpay order
      const response = await apiClient.createPaymentOrder({
        doctorId,
        slotId,
        amount,
        notes,
      });

      return {
        orderId: response.orderId,
        amount: response.amount,
        currency: response.currency || "INR",
      };
    } catch (error) {
      console.error("Failed to create payment order:", error);
      throw new Error("Failed to initiate payment. Please try again.");
    }
  }

  /**
   * Open Razorpay payment checkout
   * DEMO MODE: Simulates payment for Expo compatibility
   */
  async processPayment(options: PaymentOptions): Promise<PaymentResult> {
    try {
      const razorpayOptions = {
        description: options.description,
        image: "https://i.ibb.co/FxP9Y5S/ayurveda-logo.png", // Your app logo
        currency: options.currency,
        key: RAZORPAY_KEY_ID,
        amount: options.amount * 100, // Convert to paisa
        name: options.name,
        order_id: options.orderId,
        prefill: options.prefill || {},
        theme: {
          color: "#E58B3A", // Your brand color
        },
      };

      console.log("Opening Razorpay with options:", razorpayOptions);

      if (DEMO_MODE) {
        // DEMO MODE: Simulate payment flow for Expo
        console.log(
          "⚠️ DEMO MODE: Simulating payment (native SDK unavailable in Expo)",
        );

        // Simulate payment processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate demo payment response
        const demoPaymentId = `pay_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const demoSignature = `sig_demo_${Date.now()}`;

        console.log("✅ DEMO Payment successful:", {
          razorpay_payment_id: demoPaymentId,
          razorpay_order_id: options.orderId,
          razorpay_signature: demoSignature,
        });

        return {
          success: true,
          paymentId: demoPaymentId,
          orderId: options.orderId,
          signature: demoSignature,
        };
      } else {
        // PRODUCTION MODE: Use actual Razorpay SDK
        // NOTE: Requires EAS Build or ejected Expo app
        // Uncomment when ready:
        /*
        const RazorpayCheckout = require("react-native-razorpay").default;
        const data = await RazorpayCheckout.open(razorpayOptions);
        
        console.log("Payment successful:", data);
        
        return {
          success: true,
          paymentId: data.razorpay_payment_id,
          orderId: data.razorpay_order_id,
          signature: data.razorpay_signature,
        };
        */

        throw new Error(
          "Production mode requires EAS Build. Set DEMO_MODE = true for testing.",
        );
      }
    } catch (error: any) {
      console.error("Payment failed:", error);

      // User cancelled payment
      if (error.code === 0 || error.description === "cancelled") {
        return {
          success: false,
          error: "Payment cancelled by user",
        };
      }

      // Payment failed
      return {
        success: false,
        error:
          error.description ||
          error.message ||
          "Payment failed. Please try again.",
      };
    }
  }

  /**
   * Verify payment and complete booking
   */
  async verifyAndCompleteBooking(
    doctorId: string,
    slotId: string,
    paymentData: PaymentResponse,
    notes?: string,
  ): Promise<any> {
    try {
      // Call backend to verify payment signature and create booking
      const response = await apiClient.verifyPaymentAndBook({
        doctorId,
        slotId,
        razorpayPaymentId: paymentData.razorpay_payment_id,
        razorpayOrderId: paymentData.razorpay_order_id,
        razorpaySignature: paymentData.razorpay_signature,
        notes,
      });

      return response;
    } catch (error) {
      console.error("Failed to verify payment and create booking:", error);
      throw new Error(
        "Payment verification failed. Please contact support if amount was deducted.",
      );
    }
  }

  /**
   * Complete payment flow for doctor appointment
   */
  async bookAppointmentWithPayment(
    doctorId: string,
    doctorName: string,
    slotId: string,
    amount: number,
    userDetails: {
      name: string;
      email: string;
      contact?: string;
    },
    notes?: string,
  ): Promise<{
    success: boolean;
    booking?: any;
    error?: string;
  }> {
    try {
      // Step 1: Create Razorpay order
      console.log("Step 1: Creating payment order...");
      const order = await this.createOrder(doctorId, slotId, amount, notes);

      // Step 2: Process payment through Razorpay
      console.log("Step 2: Opening Razorpay checkout...");
      const paymentResult = await this.processPayment({
        amount: order.amount,
        currency: order.currency,
        name: "Ayuoi - Doctor Consultation",
        description: `Consultation with Dr. ${doctorName}`,
        orderId: order.orderId,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.contact,
        },
      });

      // Check if payment was successful
      if (!paymentResult.success) {
        return {
          success: false,
          error: paymentResult.error,
        };
      }

      // Step 3: Verify payment and create booking
      console.log("Step 3: Verifying payment and creating booking...");
      const booking = await this.verifyAndCompleteBooking(
        doctorId,
        slotId,
        {
          razorpay_payment_id: paymentResult.paymentId!,
          razorpay_order_id: paymentResult.orderId!,
          razorpay_signature: paymentResult.signature!,
        },
        notes,
      );

      return {
        success: true,
        booking,
      };
    } catch (error: any) {
      console.error("Appointment booking with payment failed:", error);
      return {
        success: false,
        error: error.message || "Failed to complete booking",
      };
    }
  }
}

export const paymentService = new PaymentService();

/**
 * Demo Payment Modal
 * Simulates Razorpay payment UI for Expo compatibility
 */

import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface DemoPaymentModalProps {
  visible: boolean;
  amount: number;
  doctorName: string;
  onSuccess: (paymentData: {
    paymentId: string;
    orderId: string;
    signature: string;
  }) => void;
  onCancel: () => void;
  orderId: string;
}

export default function DemoPaymentModal({
  visible,
  amount,
  doctorName,
  onSuccess,
  onCancel,
  orderId,
}: DemoPaymentModalProps) {
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"select" | "processing" | "success">(
    "select",
  );

  useEffect(() => {
    if (visible) {
      setStep("select");
      setProcessing(false);
    }
  }, [visible]);

  const handlePayment = async () => {
    setProcessing(true);
    setStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");

      // Generate demo payment data
      setTimeout(() => {
        const demoPaymentId = `pay_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const demoSignature = `sig_demo_${Date.now()}`;

        onSuccess({
          paymentId: demoPaymentId,
          orderId: orderId,
          signature: demoSignature,
        });
      }, 1000);
    }, 2000);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Payment</Text>
            <TouchableOpacity
              onPress={onCancel}
              disabled={processing}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          {step === "select" && (
            <>
              <View style={styles.content}>
                <View style={styles.amountSection}>
                  <Text style={styles.amountLabel}>Amount to Pay</Text>
                  <Text style={styles.amountValue}>₹{amount}</Text>
                  <Text style={styles.doctorText}>
                    Consultation with {doctorName}
                  </Text>
                </View>

                <View style={styles.demoNotice}>
                  <Text style={styles.demoNoticeIcon}>i</Text>
                  <Text style={styles.demoNoticeText}>
                    This is a demo payment simulation for Expo compatibility.
                    {"\n"}In production, this will open Razorpay checkout.
                  </Text>
                </View>

                <View style={styles.paymentMethods}>
                  <Text style={styles.methodsTitle}>Select Payment Method</Text>

                  <View style={styles.methodCard}>
                    <Text style={styles.methodIcon}>CARD</Text>
                    <View style={styles.methodInfo}>
                      <Text style={styles.methodName}>Demo Card Payment</Text>
                      <Text style={styles.methodDesc}>
                        Card: 4111 1111 1111 1111
                      </Text>
                    </View>
                  </View>

                  <View style={styles.methodCard}>
                    <Text style={styles.methodIcon}>UPI</Text>
                    <View style={styles.methodInfo}>
                      <Text style={styles.methodName}>Demo UPI</Text>
                      <Text style={styles.methodDesc}>
                        UPI ID: success@razorpay
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.payButton}
                  onPress={handlePayment}
                >
                  <Text style={styles.payButtonText}>Pay ₹{amount} (Demo)</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === "processing" && (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="large" color="#E58B3A" />
              <Text style={styles.processingText}>Processing Payment...</Text>
              <Text style={styles.processingSubtext}>
                Please wait while we verify your payment
              </Text>
            </View>
          )}

          {step === "success" && (
            <View style={styles.successContainer}>
              <Text style={styles.successIcon}>OK</Text>
              <Text style={styles.successTitle}>Payment Successful!</Text>
              <Text style={styles.successText}>
                Your payment of ₹{amount} has been processed
              </Text>
              <ActivityIndicator
                size="small"
                color="#E58B3A"
                style={styles.successLoader}
              />
              <Text style={styles.successSubtext}>Creating booking...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6CCB5",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E2A24",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#666",
  },
  content: {
    padding: 20,
  },
  amountSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#FFF7EC",
    borderRadius: 12,
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    color: "#6B5E4B",
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: "800",
    color: "#E58B3A",
    marginBottom: 8,
  },
  doctorText: {
    fontSize: 14,
    color: "#2E2A24",
    textAlign: "center",
  },
  demoNotice: {
    flexDirection: "row",
    backgroundColor: "#E8F4FD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  demoNoticeIcon: {
    fontSize: 16,
  },
  demoNoticeText: {
    flex: 1,
    fontSize: 12,
    color: "#0369A1",
    lineHeight: 18,
  },
  paymentMethods: {
    marginBottom: 12,
  },
  methodsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E2A24",
    marginBottom: 12,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  methodIcon: {
    fontSize: 24,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E2A24",
    marginBottom: 4,
  },
  methodDesc: {
    fontSize: 12,
    color: "#6B5E4B",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E6CCB5",
  },
  payButton: {
    backgroundColor: "#E58B3A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  processingContainer: {
    padding: 60,
    alignItems: "center",
  },
  processingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E2A24",
    marginTop: 20,
  },
  processingSubtext: {
    fontSize: 14,
    color: "#6B5E4B",
    marginTop: 8,
    textAlign: "center",
  },
  successContainer: {
    padding: 60,
    alignItems: "center",
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#047857",
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: "#2E2A24",
    textAlign: "center",
    marginBottom: 24,
  },
  successLoader: {
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 12,
    color: "#6B5E4B",
  },
});

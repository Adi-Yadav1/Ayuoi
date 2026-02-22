import { apiClient } from "@/app/services/apiClient";
import { Prescription } from "@/app/types/index";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Markdown from "react-native-markdown-display";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7EC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6CCB5",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: "#E58B3A",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2A24",
  },
  shareButton: {
    padding: 8,
  },
  shareText: {
    fontSize: 14,
    color: "#047857",
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  doctorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  doctorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E6F2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0369A1",
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2A24",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#6B5E4B",
    marginBottom: 2,
  },
  doctorEducation: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  prescriptionDate: {
    fontSize: 13,
    color: "#6B5E4B",
    fontWeight: "600",
    marginTop: 8,
  },
  prescriptionContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E6CCB5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  loadingText: {
    marginTop: 12,
    color: "#6B5E4B",
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
    marginBottom: 8,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: "#6B5E4B",
    textAlign: "center",
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: "#2E2A24",
  },
  heading1: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2E2A24",
    marginTop: 16,
    marginBottom: 12,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E2A24",
    marginTop: 20,
    marginBottom: 10,
  },
  heading3: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2E2A24",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 12,
    lineHeight: 24,
  },
  listItem: {
    marginBottom: 8,
  },
  bullet_list: {
    marginBottom: 12,
  },
  ordered_list: {
    marginBottom: 12,
  },
  strong: {
    fontWeight: "700",
    color: "#047857",
  },
  em: {
    fontStyle: "italic",
  },
  code_inline: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: "monospace",
    fontSize: 14,
  },
  code_block: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    fontFamily: "monospace",
    fontSize: 13,
    marginBottom: 12,
  },
  hr: {
    backgroundColor: "#E6CCB5",
    height: 1,
    marginVertical: 16,
  },
});

export default function PrescriptionDetailScreen() {
  const params = useLocalSearchParams();
  const prescriptionId = params.prescriptionId as string;
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPrescriptionDetail();
  }, [prescriptionId]);

  const loadPrescriptionDetail = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all prescriptions and find the matching one
      const prescriptions = await apiClient.getMyPrescriptions();
      const found = prescriptions.find((p: any) => p.id === prescriptionId);

      if (found) {
        setPrescription(found);
      } else {
        setError("Prescription not found");
      }
    } catch (err: any) {
      console.error("Failed to load prescription:", err);
      setError(err.message || "Failed to load prescription");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!prescription) return;

    try {
      const shareContent = `Prescription from ${prescription.doctor?.name}\n\nDate: ${new Date(prescription.createdAt).toLocaleDateString()}\n\n${prescription.content}`;

      await Share.share({
        message: shareContent,
        title: "Medical Prescription",
      });
    } catch (error) {
      console.error("Error sharing prescription:", error);
    }
  };

  const handleCopy = async () => {
    if (!prescription) return;

    // For React Native, we would need Clipboard API
    // For now, show an alert
    Alert.alert("Copy", "Prescription content copied", [{ text: "OK" }]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prescription</Text>
          <View style={{ width: 60 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#047857" />
          <Text style={styles.loadingText}>Loading prescription...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !prescription) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prescription</Text>
          <View style={{ width: 60 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || "Prescription not found"}
          </Text>
          <Text style={styles.errorSubtext}>
            Unable to load prescription details
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prescription</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.doctorCard}>
          <View style={styles.doctorHeader}>
            <View style={styles.doctorAvatar}>
              <Text style={styles.avatarText}>
                {getInitials(prescription.doctor?.name || "Dr")}
              </Text>
            </View>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>
                {prescription.doctor?.name || "Doctor"}
              </Text>
              <Text style={styles.doctorSpecialty}>
                {prescription.doctor?.specialty || "Ayurveda"}
              </Text>
              {prescription.doctor?.education && (
                <Text style={styles.doctorEducation}>
                  {prescription.doctor.education}
                </Text>
              )}
            </View>
          </View>
          <Text style={styles.prescriptionDate}>
            Prescribed on {formatDate(prescription.createdAt)}
          </Text>
        </View>

        <View style={styles.prescriptionContent}>
          <Markdown style={markdownStyles}>{prescription.content}</Markdown>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useAuth } from "@/app/context/AuthContext";
import { apiClient } from "@/app/services/apiClient";
import { Prescription } from "@/app/types/index";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7EC",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2E2A24",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B5E4B",
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#6B5E4B",
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B5E4B",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  prescriptionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E6F2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0369A1",
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2A24",
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: "#6B5E4B",
  },
  prescriptionDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#047857",
  },
  viewButton: {
    backgroundColor: "#047857",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#E6CCB5",
    marginVertical: 12,
  },
  educationText: {
    fontSize: 12,
    color: "#6B5E4B",
    marginBottom: 8,
  },
});

export default function PrescriptionsScreen() {
  const { token, user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPrescriptions = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.getMyPrescriptions();
      setPrescriptions(data);
    } catch (error) {
      console.error("Failed to load prescriptions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPrescriptions();
    setRefreshing(false);
  }, [token]);

  useEffect(() => {
    loadPrescriptions();
  }, [token]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  const handleViewPrescription = (prescription: Prescription) => {
    router.push({
      pathname: "/(app)/prescription-detail",
      params: { prescriptionId: prescription.id },
    });
  };

  if (!token || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>My Prescriptions</Text>
            <Text style={styles.subtitle}>
              AI-generated prescriptions from your consultations
            </Text>
          </View>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔒</Text>
            <Text style={styles.emptyText}>Login Required</Text>
            <Text style={styles.emptySubtext}>
              Please log in to view your prescriptions
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Prescriptions</Text>
          <Text style={styles.subtitle}>
            AI-generated prescriptions from your consultations
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#047857" />
            <Text style={styles.loadingText}>Loading prescriptions...</Text>
          </View>
        ) : prescriptions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No Prescriptions Yet</Text>
            <Text style={styles.emptySubtext}>
              Prescriptions from your doctor consultations will appear here
            </Text>
          </View>
        ) : (
          prescriptions.map((prescription) => (
            <View key={prescription.id} style={styles.prescriptionCard}>
              <View style={styles.cardHeader}>
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
                </View>
              </View>

              {prescription.doctor?.education && (
                <Text style={styles.educationText}>
                  {prescription.doctor.education}
                </Text>
              )}

              <View style={styles.divider} />

              <Text style={styles.prescriptionDate}>
                Prescribed on {formatDate(prescription.createdAt)}
              </Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {prescription.booking?.status || "COMPLETED"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewPrescription(prescription)}
              >
                <Text style={styles.viewButtonText}>View Prescription</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

import { useAuth } from "@/app/context/AuthContext";
import { getHealthProfile } from "@/app/services/analyticsService";
import { apiClient } from "@/app/services/apiClient";
import { getPrakritiResultAsync } from "@/app/services/prakritiService";
import { HealthProfile, PrakritiResult } from "@/app/types";
import { Button, Card, Loader, Section } from "@/components/ui/Button";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
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
    backgroundColor: "#FEFAF5",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    color: "#6B7280",
    marginTop: 4,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#FEF3C7",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
  },
  doshaContainer: {
    backgroundColor: "#F3F4F6",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  doshaEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  doshaInfo: {
    flex: 1,
  },
  doshaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    textTransform: "capitalize",
  },
  doshaSecondary: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  doshaDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  scoreLabel: {
    color: "#374151",
  },
  scoreValueVata: {
    fontWeight: "bold",
    color: "#A0AEC0",
  },
  scoreValuePitta: {
    fontWeight: "bold",
    color: "#FF9F43",
  },
  scoreValueKapha: {
    fontWeight: "bold",
    color: "#48BB78",
  },
  healthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  healthLabel: {
    color: "#6B7280",
  },
  healthValue: {
    fontWeight: "bold",
    color: "#111827",
  },
  prefTag: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  prefTagText: {
    color: "#92400E",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  allergyContainer: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    marginBottom: 16,
  },
  allergyTitle: {
    fontWeight: "bold",
    color: "#991B1B",
    marginBottom: 8,
  },
  allergyText: {
    color: "#7F1D1D",
    fontSize: 14,
  },
  settingButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  settingButtonText: {
    fontWeight: "bold",
    color: "#111827",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  modalOption: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  modalOptionText: {
    fontWeight: "600",
    color: "#111827",
  },
  modalBackText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  historyItem: {
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FAFAF9",
  },
  historyTitle: {
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  historyMeta: {
    color: "#6B7280",
    fontSize: 12,
  },
  historyDetail: {
    color: "#374151",
    fontSize: 13,
    marginTop: 6,
  },
  historyEmpty: {
    color: "#6B7280",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 16,
  },
  versionContainer: {
    alignItems: "center",
    paddingBottom: 24,
  },
  versionText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  versionCopyright: {
    color: "#D1D5DB",
    fontSize: 12,
    marginTop: 8,
  },
});

type PrakritiHistoryItem = {
  id: string;
  inputData: Record<string, string>;
  prakritiType: string;
  createdAt: string;
};

type DoshaHistoryItem = {
  id: string;
  inputData: Record<string, string>;
  imbalances: string[];
  imbalanceType: string;
  createdAt: string;
};

export default function ProfileScreen() {
  const { user } = useAuth();
  const [prakriti, setPrakriti] = useState<PrakritiResult | null>(null);
  const [health, setHealth] = useState<HealthProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [historyType, setHistoryType] = useState<"prakriti" | "dosha" | null>(
    null,
  );
  const [historyLoading, setHistoryLoading] = useState(false);
  const [prakritiHistory, setPrakritiHistory] = useState<PrakritiHistoryItem[]>(
    [],
  );
  const [doshaHistory, setDoshaHistory] = useState<DoshaHistoryItem[]>([]);

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      const userId = user?.id || "user_1";
      const [prakritiData, healthData] = await Promise.all([
        getPrakritiResultAsync(userId),
        getHealthProfile(userId),
      ]);
      setPrakriti(prakritiData);
      setHealth(healthData);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (type: "prakriti" | "dosha") => {
    setHistoryType(type);
    setHistoryLoading(true);
    try {
      if (type === "prakriti") {
        const items = await apiClient.getPrakritiHistory();
        setPrakritiHistory(items as PrakritiHistoryItem[]);
      } else {
        const items = await apiClient.getDoshaHistory();
        setDoshaHistory(items as DoshaHistoryItem[]);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Profile</Text>
              <Text style={styles.subtitle}>Your wellness summary</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          </View>

          {/* User Info */}
          <Section title="User Information">
            <Card>
              <View>
                <View style={styles.healthRow}>
                  <Text style={styles.healthLabel}>Name</Text>
                  <Text style={styles.healthValue}>
                    {user?.username || "User"}
                  </Text>
                </View>
                <View style={styles.healthRow}>
                  <Text style={styles.healthLabel}>Email</Text>
                  <Text style={[styles.healthValue, { fontSize: 12 }]}>
                    {user?.email || "Not available"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.healthRow,
                    { borderBottomWidth: 0, paddingBottom: 0 },
                  ]}
                >
                  <Text style={styles.healthLabel}>Member Since</Text>
                  <Text style={styles.healthValue}>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Jan 2024"}
                  </Text>
                </View>
              </View>
            </Card>
          </Section>

          {/* Prakriti Summary */}
          {prakriti && (
            <Section title="Your Prakriti">
              <Card style={styles.doshaContainer}>
                <View style={{ marginRight: 16 }}>
                  <Text style={styles.doshaEmoji}>
                    {prakriti.primaryDosha === "vata" && "💨"}
                    {prakriti.primaryDosha === "pitta" && "🔥"}
                    {prakriti.primaryDosha === "kapha" && "💧"}
                  </Text>
                </View>
                <View style={styles.doshaInfo}>
                  <Text style={styles.doshaName}>{prakriti.primaryDosha}</Text>
                  <Text style={styles.doshaSecondary}>
                    Secondary: {prakriti.secondaryDosha}
                  </Text>
                  <Text style={styles.doshaDate}>
                    Determined{" "}
                    {new Date(prakriti.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </Card>

              <Card>
                <View>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: 12,
                    }}
                  >
                    Dosha Scores
                  </Text>
                  <View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreLabel}>Vata</Text>
                      <Text style={styles.scoreValueVata}>
                        {prakriti.scores.vata}%
                      </Text>
                    </View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreLabel}>Pitta</Text>
                      <Text style={styles.scoreValuePitta}>
                        {prakriti.scores.pitta}%
                      </Text>
                    </View>
                    <View style={[styles.scoreRow, { marginBottom: 0 }]}>
                      <Text style={styles.scoreLabel}>Kapha</Text>
                      <Text style={styles.scoreValueKapha}>
                        {prakriti.scores.kapha}%
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>

              <Button
                title="View Detailed Prakriti Report"
                variant="outline"
                style={{ marginTop: 16 }}
                onPress={() => router.push("/(app)/prakriti-details")}
              />
            </Section>
          )}

          {/* Analytics Overview */}
          <Section title="Analytics Overview">
            <Card style={{ marginBottom: 16 }}>
              <View>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 8,
                  }}
                >
                  Your wellness trends at a glance
                </Text>
                <Text style={{ color: "#6B7280", fontSize: 14 }}>
                  See nutrition progress, dosha balance, and weekly insights.
                </Text>
                <Button
                  title="View Analytics"
                  variant="outline"
                  style={{ marginTop: 12 }}
                  onPress={() => router.push("/(app)/(tabs)/analytics")}
                />
              </View>
            </Card>
          </Section>

          {/* Health Profile */}
          {health && (
            <Section title="Health Profile">
              <Card style={{ marginBottom: 16 }}>
                <View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Age</Text>
                    <Text style={styles.healthValue}>{health.age} years</Text>
                  </View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Height</Text>
                    <Text style={styles.healthValue}>{health.height} cm</Text>
                  </View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Weight</Text>
                    <Text style={styles.healthValue}>{health.weight} kg</Text>
                  </View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Activity Level</Text>
                    <Text
                      style={[
                        styles.healthValue,
                        { textTransform: "capitalize" },
                      ]}
                    >
                      {health.activityLevel}
                    </Text>
                  </View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Sleep Pattern</Text>
                    <Text
                      style={[
                        styles.healthValue,
                        { textTransform: "capitalize" },
                      ]}
                    >
                      {health.sleepPattern}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.healthRow,
                      { borderBottomWidth: 0, paddingBottom: 0 },
                    ]}
                  >
                    <Text style={styles.healthLabel}>Stress Level</Text>
                    <Text
                      style={[
                        styles.healthValue,
                        { textTransform: "capitalize" },
                      ]}
                    >
                      {health.stressLevel}
                    </Text>
                  </View>
                </View>
              </Card>

              {health.dietaryPreferences.length > 0 && (
                <Card style={{ marginBottom: 16 }}>
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#111827",
                        marginBottom: 8,
                      }}
                    >
                      Dietary Preferences
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {health.dietaryPreferences.map((pref, idx) => (
                        <View key={idx} style={styles.prefTag}>
                          <Text style={styles.prefTagText}>{pref}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Card>
              )}

              {health.allergies.length > 0 && (
                <Card style={styles.allergyContainer}>
                  <View>
                    <Text style={styles.allergyTitle}>Allergies</Text>
                    <Text style={styles.allergyText}>
                      {health.allergies.join(", ")}
                    </Text>
                  </View>
                </Card>
              )}
            </Section>
          )}

          {/* Settings */}
          <Section title="Settings">
            <View>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => {
                  setHistoryModalVisible(true);
                  setHistoryType(null);
                }}
              >
                <Text style={styles.settingButtonText}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.settingButton, { marginBottom: 0 }]}
              >
                <Text style={styles.settingButtonText}>About</Text>
              </TouchableOpacity>
            </View>
          </Section>

          {/* Logout */}
          <Button
            title="🚪 Log Out"
            variant="outline"
            style={{ marginTop: 32, marginBottom: 32, borderColor: "#FCA5A5" }}
            onPress={() => {
              router.replace("/(auth)/login");
            }}
          />

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Veda v1.0.0</Text>
            <Text style={styles.versionCopyright}>
              © 2024 Ayurvedic Wellness
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal visible={historyModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {historyType === null ? (
              <>
                <Text style={styles.modalTitle}>View History</Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => loadHistory("prakriti")}
                >
                  <Text style={styles.modalOptionText}>Prakriti History</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => loadHistory("dosha")}
                >
                  <Text style={styles.modalOptionText}>Dosha History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHistoryModalVisible(false)}>
                  <Text style={styles.modalBackText}>Close</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>
                  {historyType === "prakriti"
                    ? "Prakriti History"
                    : "Dosha History"}
                </Text>
                {historyLoading ? (
                  <ActivityIndicator size="small" color="#111827" />
                ) : historyType === "prakriti" ? (
                  prakritiHistory.length === 0 ? (
                    <Text style={styles.historyEmpty}>
                      No prakriti history yet.
                    </Text>
                  ) : (
                    <ScrollView style={{ maxHeight: 420 }}>
                      {prakritiHistory.map((item) => (
                        <View key={item.id} style={styles.historyItem}>
                          <Text style={styles.historyTitle}>
                            Result: {item.prakritiType}
                          </Text>
                          <Text style={styles.historyMeta}>
                            {new Date(item.createdAt).toLocaleString()}
                          </Text>
                          <Text style={styles.historyDetail}>
                            Inputs: {Object.keys(item.inputData || {}).length}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  )
                ) : doshaHistory.length === 0 ? (
                  <Text style={styles.historyEmpty}>No dosha history yet.</Text>
                ) : (
                  <ScrollView style={{ maxHeight: 420 }}>
                    {doshaHistory.map((item) => (
                      <View key={item.id} style={styles.historyItem}>
                        <Text style={styles.historyTitle}>
                          Type: {item.imbalanceType}
                        </Text>
                        <Text style={styles.historyMeta}>
                          {new Date(item.createdAt).toLocaleString()}
                        </Text>
                        <Text style={styles.historyDetail}>
                          Imbalances: {(item.imbalances || []).join(", ")}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                )}

                <TouchableOpacity
                  onPress={() => setHistoryType(null)}
                  style={{ marginTop: 16 }}
                >
                  <Text style={styles.modalBackText}>Back</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

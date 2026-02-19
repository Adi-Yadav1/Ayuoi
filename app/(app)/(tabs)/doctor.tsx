import { useAuth } from "@/app/context/AuthContext";
import { doctorService } from "@/app/services/doctorService";
import { Booking, Doctor, DoctorSlot } from "@/app/types/index";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2E2A24",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B5E4B",
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E6CCB5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    color: "#2F2A23",
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  filterChip: {
    borderWidth: 1,
    borderColor: "#F2D2B5",
    backgroundColor: "#FFF0DE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  filterChipActive: {
    backgroundColor: "#E58B3A",
    borderColor: "#E58B3A",
  },
  filterText: {
    color: "#5F5344",
    fontSize: 12,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFF7ED",
  },
  doctorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1D9C4",
    marginBottom: 12,
  },
  doctorDetailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1D9C4",
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2A24",
    marginBottom: 6,
  },
  doctorMeta: {
    fontSize: 12,
    color: "#6B5E4B",
    marginBottom: 6,
  },
  doctorAbout: {
    fontSize: 12,
    color: "#6B5E4B",
    marginBottom: 10,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feeText: {
    fontWeight: "700",
    color: "#E58B3A",
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: "#E58B3A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  bookButtonText: {
    color: "#FFF7ED",
    fontWeight: "700",
    fontSize: 12,
  },
  bookedBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#D4EDDA",
    borderRadius: 8,
  },
  bookedBadgeText: {
    color: "#155724",
    fontSize: 12,
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#FFF7EC",
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2E2A24",
  },
  closeText: {
    color: "#E58B3A",
    fontWeight: "700",
    fontSize: 14,
  },
  dateScroll: {
    marginBottom: 16,
  },
  dateChip: {
    backgroundColor: "#FFF0DE",
    borderWidth: 1,
    borderColor: "#F2D2B5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
  },
  dateChipActive: {
    backgroundColor: "#E58B3A",
    borderColor: "#E58B3A",
  },
  dateText: {
    fontSize: 12,
    color: "#5F5344",
    fontWeight: "600",
  },
  dateTextActive: {
    color: "#FFF7ED",
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  slotChip: {
    backgroundColor: "#FFF0DE",
    borderWidth: 1,
    borderColor: "#F2D2B5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  slotChipBooked: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
  },
  slotChipSelected: {
    backgroundColor: "#E58B3A",
    borderColor: "#E58B3A",
  },
  slotText: {
    fontSize: 12,
    color: "#5F5344",
    fontWeight: "600",
  },
  slotTextBooked: {
    color: "#999",
  },
  slotTextSelected: {
    color: "#FFF7ED",
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#E6CCB5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    color: "#2F2A23",
    marginBottom: 12,
    textAlignVertical: "top",
  },
  confirmButton: {
    backgroundColor: "#E58B3A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  confirmButtonText: {
    color: "#FFF7ED",
    fontWeight: "700",
    fontSize: 14,
  },
  confirmModalCard: {
    backgroundColor: "#FFF7EC",
    borderRadius: 16,
    padding: 20,
  },
  confirmItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1D9C4",
  },
  confirmLabel: {
    fontSize: 12,
    color: "#6B5E4B",
    fontWeight: "600",
    marginBottom: 4,
  },
  confirmValue: {
    fontSize: 14,
    color: "#2E2A24",
    fontWeight: "600",
  },
  confirmButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6CCB5",
  },
  cancelButtonText: {
    color: "#5F5344",
    fontWeight: "700",
    fontSize: 12,
  },
  authWarning: {
    backgroundColor: "#FFF0DE",
    borderWidth: 1,
    borderColor: "#F2D2B5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  authWarningText: {
    color: "#C08944",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    color: "#6B5E4B",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#6B5E4B",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  emptySubtext: {
    color: "#6B5E4B",
    fontSize: 12,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1D9C4",
    marginBottom: 12,
  },
  cancelBookingButton: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFE4E1",
    borderRadius: 10,
  },
  cancelBookingText: {
    color: "#CC4444",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  bookingsSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    backgroundColor: "#FFF7EC",
  },
});

export default function DoctorScreen() {
  const { token, user } = useAuth();

  // State management
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedFee, setSelectedFee] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctorSlots, setDoctorSlots] = useState<DoctorSlot[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<DoctorSlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [bookingNotes, setBookingNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const feeFilters = ["All", "Under 600", "600-900", "Above 900"];

  // Fetch initial doctors list
  useEffect(() => {
    loadInitialDoctors();
  }, []);

  // Fetch user bookings when user is available
  useEffect(() => {
    if (token && user) {
      loadUserBookings();
    }
  }, [token, user]);

  const loadInitialDoctors = async () => {
    try {
      setIsLoading(true);
      const data = await doctorService.listDoctors(1, 20);
      setDoctors(data.doctors);
      setAllSpecialties(data.specialties || []);
    } catch (error) {
      console.error("Failed to load doctors:", error);
      Alert.alert(
        "Error",
        "Failed to load doctors list. Please check your connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserBookings = async () => {
    if (!token) return;
    try {
      const bookings = await doctorService.getMyBookings();
      setUserBookings(bookings.filter((b) => b.status === "CONFIRMED"));
    } catch (error) {
      console.error("Failed to load bookings:", error);
    }
  };

  const loadDoctorDetails = async (doctorId: string) => {
    try {
      setIsFetching(true);
      const details = await doctorService.getDoctorDetails(
        doctorId,
        selectedDate,
      );
      setDoctorSlots(details.slots);
      setAvailableDates(details.availableDates);
      setSelectedSlot(null);
    } catch (error) {
      console.error("Failed to load doctor details:", error);
      Alert.alert("Error", "Failed to load doctor details.");
    } finally {
      setIsFetching(false);
    }
  };

  const loadSlotsForDate = async (doctorId: string, date: string) => {
    try {
      setIsFetching(true);
      const response = await doctorService.getDoctorSlots(doctorId, date);
      setDoctorSlots(response.slots);
    } catch (error) {
      console.error("Failed to load slots:", error);
      Alert.alert("Error", "Failed to load available slots.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    setSearch(query);
    if (query.trim() === "") {
      loadInitialDoctors();
      return;
    }

    try {
      setIsLoading(true);
      const data = await doctorService.searchDoctors(query);
      setDoctors(data.doctors);
    } catch (error) {
      console.error("Search failed:", error);
      Alert.alert("Error", "Failed to search doctors.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilter = useCallback(async () => {
    try {
      setIsLoading(true);
      let specialty =
        selectedSpecialty === "All" ? undefined : selectedSpecialty;
      let minFee: number | undefined;
      let maxFee: number | undefined;

      if (selectedFee === "Under 600") {
        maxFee = 600;
      } else if (selectedFee === "600-900") {
        minFee = 600;
        maxFee = 900;
      } else if (selectedFee === "Above 900") {
        minFee = 900;
      }

      const data = await doctorService.filterDoctors(specialty, minFee, maxFee);
      setDoctors(data.doctors);
    } catch (error) {
      console.error("Filter failed:", error);
      Alert.alert("Error", "Failed to filter doctors.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedSpecialty, selectedFee]);

  useEffect(() => {
    handleFilter();
  }, [selectedSpecialty, selectedFee, handleFilter]);

  const handleDoctorSelect = async (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    await loadDoctorDetails(doctor.id);
  };

  const handleDateChange = async (doctor: Doctor, date: string) => {
    setSelectedDate(date);
    await loadSlotsForDate(doctor.id, date);
  };

  const handleBookSlot = async () => {
    if (!selectedDoctor || !selectedSlot) {
      Alert.alert("Error", "Please select a slot");
      return;
    }

    if (!token) {
      Alert.alert(
        "Authentication Required",
        "Please log in to book an appointment",
      );
      return;
    }

    try {
      setIsFetching(true);
      await doctorService.bookSlot(
        selectedDoctor.id,
        selectedSlot.id,
        bookingNotes,
      );
      Alert.alert("Success", "Appointment booked successfully!");
      setShowBookingModal(false);
      setSelectedSlot(null);
      setBookingNotes("");
      setSelectedDoctor(null);
      await loadUserBookings();
      await loadInitialDoctors();
    } catch (error: any) {
      console.error("Booking failed:", error);
      const message =
        error.message || "Failed to book appointment. Please try again.";
      Alert.alert("Booking Error", message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", onPress: () => {}, style: "cancel" },
        {
          text: "Yes, Cancel",
          onPress: async () => {
            try {
              setIsFetching(true);
              await doctorService.cancelBooking(bookingId);
              Alert.alert("Success", "Appointment cancelled successfully");
              await loadUserBookings();
              await loadInitialDoctors();
            } catch (error) {
              console.error("Cancellation failed:", error);
              Alert.alert("Error", "Failed to cancel appointment");
            } finally {
              setIsFetching(false);
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Ayurvedic Doctors</Text>
        <Text style={styles.subtitle}>Find and book consultations</Text>

        <TextInput
          placeholder="Search by name, specialty..."
          placeholderTextColor="#8B7E6B"
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />

        <View style={styles.filterRow}>
          {["All", ...allSpecialties].map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[
                styles.filterChip,
                selectedSpecialty === spec && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpecialty(spec)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedSpecialty === spec && styles.filterTextActive,
                ]}
              >
                {spec}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.filterRow}>
          {feeFilters.map((fee) => (
            <TouchableOpacity
              key={fee}
              style={[
                styles.filterChip,
                selectedFee === fee && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFee(fee)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFee === fee && styles.filterTextActive,
                ]}
              >
                {fee}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E58B3A" />
            <Text style={styles.loadingText}>Loading doctors...</Text>
          </View>
        ) : doctors.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No doctors found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          doctors.map((doc) => (
            <View key={doc.id} style={styles.doctorCard}>
              <Text style={styles.doctorName}>{doc.name}</Text>
              <Text style={styles.doctorMeta}>
                {doc.specialty} · {doc.experienceYears} yrs · {doc.location}
              </Text>
              <Text style={styles.doctorMeta}>
                ⭐ {doc.rating} ({doc.totalRatings} reviews) ·{" "}
                {doc.languages.join(", ")}
              </Text>
              <Text style={styles.doctorAbout}>
                {doc.description ||
                  doc.bio ||
                  "Experienced Ayurvedic practitioner"}
              </Text>
              <View style={styles.feeRow}>
                <Text style={styles.feeText}>₹ {doc.consultationFee}</Text>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleDoctorSelect(doc)}
                >
                  <Text style={styles.bookButtonText}>View & Book</Text>
                </TouchableOpacity>
              </View>

              {userBookings.some((b) => b.doctorId === doc.id) && (
                <View style={styles.bookedBadge}>
                  <Text style={styles.bookedBadgeText}>
                    ✓ Booking Confirmed
                  </Text>
                </View>
              )}
            </View>
          ))
        )}

        {/* User Bookings Section */}
        {userBookings.length > 0 && (
          <>
            <View style={{ marginTop: 24, marginBottom: 16 }}>
              <Text style={styles.title}>Your Upcoming Appointments</Text>
            </View>
            {userBookings.map((booking) => (
              <View key={booking.id} style={styles.bookingCard}>
                <Text style={styles.doctorName}>
                  {booking.doctor?.name || "Doctor"}
                </Text>
                <Text style={styles.doctorMeta}>
                  {new Date(booking.slot?.startTime || "").toLocaleDateString()}{" "}
                  at{" "}
                  {new Date(booking.slot?.startTime || "").toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    },
                  )}
                </Text>
                <Text style={styles.doctorMeta}>Status: {booking.status}</Text>
                <TouchableOpacity
                  style={styles.cancelBookingButton}
                  onPress={() => handleCancelBooking(booking.id)}
                  disabled={isFetching}
                >
                  <Text style={styles.cancelBookingText}>Cancel Booking</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Doctor Details Modal */}
      <Modal visible={!!selectedDoctor} transparent animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedDoctor(null)}>
              <Text style={styles.closeText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Doctor Profile</Text>
            <View style={{ width: 50 }} />
          </View>

          {selectedDoctor && (
            <ScrollView contentContainerStyle={styles.content}>
              <View style={styles.doctorDetailCard}>
                <Text style={styles.doctorName}>{selectedDoctor.name}</Text>
                <Text style={styles.doctorMeta}>
                  {selectedDoctor.specialty} · {selectedDoctor.experienceYears}{" "}
                  years experience
                </Text>
                <Text style={styles.doctorMeta}>
                  ⭐ {selectedDoctor.rating} · Available:{" "}
                  {selectedDoctor.isAvailable ? "Yes" : "No"}
                </Text>

                {selectedDoctor.education && (
                  <>
                    <Text
                      style={[
                        styles.doctorName,
                        { fontSize: 14, marginTop: 12 },
                      ]}
                    >
                      Education
                    </Text>
                    <Text style={styles.doctorAbout}>
                      {selectedDoctor.education}
                    </Text>
                  </>
                )}

                {selectedDoctor.bio && (
                  <>
                    <Text
                      style={[
                        styles.doctorName,
                        { fontSize: 14, marginTop: 12 },
                      ]}
                    >
                      About
                    </Text>
                    <Text style={styles.doctorAbout}>{selectedDoctor.bio}</Text>
                  </>
                )}

                <Text
                  style={[styles.doctorName, { fontSize: 14, marginTop: 12 }]}
                >
                  Consultation Fee: ₹{selectedDoctor.consultationFee}
                </Text>
              </View>

              <Text
                style={[styles.doctorName, { fontSize: 14, marginTop: 16 }]}
              >
                Select Appointment Date
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.dateScroll}
              >
                {availableDates.map((date) => (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.dateChip,
                      selectedDate === date && styles.dateChipActive,
                    ]}
                    onPress={() => handleDateChange(selectedDoctor, date)}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        selectedDate === date && styles.dateTextActive,
                      ]}
                    >
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text
                style={[styles.doctorName, { fontSize: 14, marginTop: 12 }]}
              >
                Available Slots
              </Text>
              {isFetching ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#E58B3A" />
                </View>
              ) : doctorSlots.length === 0 ? (
                <Text style={styles.emptyText}>
                  No slots available for this date
                </Text>
              ) : (
                <View style={styles.slotGrid}>
                  {doctorSlots.map((slot) => (
                    <TouchableOpacity
                      key={slot.id}
                      style={[
                        styles.slotChip,
                        slot.isBooked && styles.slotChipBooked,
                        selectedSlot?.id === slot.id && styles.slotChipSelected,
                      ]}
                      onPress={() => !slot.isBooked && setSelectedSlot(slot)}
                      disabled={slot.isBooked}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          slot.isBooked && styles.slotTextBooked,
                          selectedSlot?.id === slot.id &&
                            styles.slotTextSelected,
                        ]}
                      >
                        {new Date(slot.startTime).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {selectedSlot && !token && (
                <View style={styles.authWarning}>
                  <Text style={styles.authWarningText}>
                    Please log in to book an appointment
                  </Text>
                </View>
              )}

              {selectedSlot && token && (
                <>
                  <Text
                    style={[styles.doctorName, { fontSize: 14, marginTop: 16 }]}
                  >
                    Add Notes (optional)
                  </Text>
                  <TextInput
                    style={styles.notesInput}
                    placeholder="E.g., Consultation for Vata imbalance and diet planning"
                    placeholderTextColor="#8B7E6B"
                    multiline
                    numberOfLines={3}
                    value={bookingNotes}
                    onChangeText={setBookingNotes}
                  />

                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => setShowBookingModal(true)}
                    disabled={isFetching}
                  >
                    <Text style={styles.confirmButtonText}>
                      {isFetching ? "Booking..." : "Confirm Booking"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

      {/* Booking Confirmation Modal */}
      <Modal visible={showBookingModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.confirmModalCard}>
            <Text style={styles.modalTitle}>Confirm Appointment</Text>
            {selectedDoctor && selectedSlot && (
              <>
                <View style={styles.confirmItem}>
                  <Text style={styles.confirmLabel}>Doctor:</Text>
                  <Text style={styles.confirmValue}>{selectedDoctor.name}</Text>
                </View>
                <View style={styles.confirmItem}>
                  <Text style={styles.confirmLabel}>Specialty:</Text>
                  <Text style={styles.confirmValue}>
                    {selectedDoctor.specialty}
                  </Text>
                </View>
                <View style={styles.confirmItem}>
                  <Text style={styles.confirmLabel}>Date:</Text>
                  <Text style={styles.confirmValue}>
                    {new Date(selectedSlot.startTime).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.confirmItem}>
                  <Text style={styles.confirmLabel}>Time:</Text>
                  <Text style={styles.confirmValue}>
                    {new Date(selectedSlot.startTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}
                  </Text>
                </View>
                <View style={styles.confirmItem}>
                  <Text style={styles.confirmLabel}>Fee:</Text>
                  <Text style={styles.confirmValue}>
                    ₹{selectedDoctor.consultationFee}
                  </Text>
                </View>
                {bookingNotes && (
                  <View style={styles.confirmItem}>
                    <Text style={styles.confirmLabel}>Notes:</Text>
                    <Text style={styles.confirmValue}>{bookingNotes}</Text>
                  </View>
                )}
              </>
            )}

            <View style={styles.confirmButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowBookingModal(false)}
                disabled={isFetching}
              >
                <Text style={styles.cancelButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleBookSlot}
                disabled={isFetching}
              >
                <Text style={styles.confirmButtonText}>
                  {isFetching ? "Processing..." : "Confirm"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

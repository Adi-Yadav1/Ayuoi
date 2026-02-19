import React, { useMemo, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experienceYears: number;
  consultationFee: number;
  rating: number;
  location: string;
  languages: string[];
  about: string;
};

const doctorData = require('@/app/data/doctors.json') as Doctor[];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EC',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E2A24',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B5E4B',
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E6CCB5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    color: '#2F2A23',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#F2D2B5',
    backgroundColor: '#FFF0DE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  filterChipActive: {
    backgroundColor: '#E58B3A',
    borderColor: '#E58B3A',
  },
  filterText: {
    color: '#5F5344',
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFF7ED',
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1D9C4',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2A24',
    marginBottom: 6,
  },
  doctorMeta: {
    fontSize: 12,
    color: '#6B5E4B',
    marginBottom: 6,
  },
  doctorAbout: {
    fontSize: 12,
    color: '#6B5E4B',
    marginBottom: 10,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeText: {
    fontWeight: '700',
    color: '#E58B3A',
  },
  bookButton: {
    backgroundColor: '#E58B3A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  bookButtonText: {
    color: '#FFF7ED',
    fontWeight: '700',
    fontSize: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFF7EC',
    borderRadius: 16,
    padding: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2E2A24',
  },
  closeText: {
    color: '#E58B3A',
    fontWeight: '700',
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  slotChip: {
    backgroundColor: '#FFF0DE',
    borderWidth: 1,
    borderColor: '#F2D2B5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  slotText: {
    fontSize: 12,
    color: '#5F5344',
    fontWeight: '600',
  },
});

export default function DoctorScreen() {
  const [search, setSearch] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedFee, setSelectedFee] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const specializations = useMemo(() => {
    const unique = Array.from(new Set(doctorData.map((doc) => doc.specialization)));
    return ['All', ...unique];
  }, []);

  const feeFilters = ['All', 'Under 600', '600-900', 'Above 900'];

  const filteredDoctors = useMemo(() => {
    return doctorData.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
      const matchesSpec = selectedSpecialization === 'All' || doc.specialization === selectedSpecialization;
      const matchesFee =
        selectedFee === 'All' ||
        (selectedFee === 'Under 600' && doc.consultationFee < 600) ||
        (selectedFee === '600-900' && doc.consultationFee >= 600 && doc.consultationFee <= 900) ||
        (selectedFee === 'Above 900' && doc.consultationFee > 900);
      return matchesSearch && matchesSpec && matchesFee;
    });
  }, [search, selectedSpecialization, selectedFee]);

  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 15; hour += 1) {
      slots.push(`${hour}:00 AM`);
      slots.push(`${hour}:30 AM`);
    }
    slots.push('4:00 PM');
    return slots;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Ayurvedic Doctors</Text>
        <Text style={styles.subtitle}>Find doctors by specialization or fee</Text>

        <TextInput
          placeholder="Search by doctor name"
          placeholderTextColor="#8B7E6B"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        <View style={styles.filterRow}>
          {specializations.map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[
                styles.filterChip,
                selectedSpecialization === spec && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpecialization(spec)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedSpecialization === spec && styles.filterTextActive,
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
              style={[styles.filterChip, selectedFee === fee && styles.filterChipActive]}
              onPress={() => setSelectedFee(fee)}
            >
              <Text style={[styles.filterText, selectedFee === fee && styles.filterTextActive]}>
                {fee}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredDoctors.map((doc) => (
          <View key={doc.id} style={styles.doctorCard}>
            <Text style={styles.doctorName}>{doc.name}</Text>
            <Text style={styles.doctorMeta}>
              {doc.specialization} · {doc.experienceYears} yrs · {doc.location}
            </Text>
            <Text style={styles.doctorMeta}>
              Rating {doc.rating} · {doc.languages.join(', ')}
            </Text>
            <Text style={styles.doctorAbout}>{doc.about}</Text>
            <View style={styles.feeRow}>
              <Text style={styles.feeText}>₹ {doc.consultationFee}</Text>
              <TouchableOpacity style={styles.bookButton} onPress={() => setSelectedDoctor(doc)}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={!!selectedDoctor} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Doctor Profile</Text>
              <TouchableOpacity onPress={() => setSelectedDoctor(null)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>

            {selectedDoctor && (
              <ScrollView>
                <Text style={styles.doctorName}>{selectedDoctor.name}</Text>
                <Text style={styles.doctorMeta}>
                  {selectedDoctor.specialization} · {selectedDoctor.experienceYears} yrs · {selectedDoctor.location}
                </Text>
                <Text style={styles.doctorMeta}>
                  Rating {selectedDoctor.rating} · {selectedDoctor.languages.join(', ')}
                </Text>
                <Text style={styles.doctorAbout}>{selectedDoctor.about}</Text>
                <Text style={[styles.doctorName, { fontSize: 14, marginTop: 12 }]}>
                  Available Slots
                </Text>
                <View style={styles.slotGrid}>
                  {timeSlots.map((slot) => (
                    <View key={slot} style={styles.slotChip}>
                      <Text style={styles.slotText}>{slot}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

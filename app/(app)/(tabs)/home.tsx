// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { router } from 'expo-router';
// import { getPrakritiResultAsync } from '@/app/services/prakritiService';
// import { getHighPrioritySuggestions } from '@/app/services/dietarySuggestionService';
// import { Card, Section, Button, Loader, DoshaCard, StatItem } from '@/components/ui/Button';
// import { PrakritiResult, DietarySuggestion } from '@/app/types';
// import { useAuth } from '@/app/context/AuthContext';
// import { apiClient } from '@/app/services/apiClient';

// const modelValidValues = require('@/model_valid_values.json') as {
//   Prakriti_Model: Record<string, string[]>;
//   Imbalance_Model: Record<string, string[]>;
// };

// const AYURVEDA_QUOTES = [
//   'When diet is wrong, medicine is of no use.',
//   'Health is the greatest gift; contentment, the greatest wealth.',
//   'Treat the cause, not just the symptom.',
//   'Balance is the key to harmony in body and mind.',
//   'Food is medicine when chosen with awareness.',
// ];

// const PRAKRITI_OPTIONS = {
//   body_size: modelValidValues.Prakriti_Model['Body Size'],
//   body_weight_tendency: modelValidValues.Prakriti_Model['Body Weight'],
//   height: modelValidValues.Prakriti_Model['Height'],
//   bone_structure: modelValidValues.Prakriti_Model['Bone Structure'],
//   complexion: modelValidValues.Prakriti_Model['Complexion'],
//   skin_type: modelValidValues.Prakriti_Model['General feel of skin'],
//   skin_texture: modelValidValues.Prakriti_Model['Texture of Skin'],
//   hair_color: modelValidValues.Prakriti_Model['Hair Color'],
//   hair_appearance: modelValidValues.Prakriti_Model['Appearance of Hair'],
//   face_shape: modelValidValues.Prakriti_Model['Shape of face'],
//   eyes: modelValidValues.Prakriti_Model['Eyes'],
//   eyelashes: modelValidValues.Prakriti_Model['Eyelashes'],
//   blinking_pattern: modelValidValues.Prakriti_Model['Blinking of Eyes'],
//   cheeks: modelValidValues.Prakriti_Model['Cheeks'],
//   nose_shape: modelValidValues.Prakriti_Model['Nose'],
//   teeth_structure: modelValidValues.Prakriti_Model['Teeth and gums'],
//   lips: modelValidValues.Prakriti_Model['Lips'],
//   nails: modelValidValues.Prakriti_Model['Nails'],
//   appetite: modelValidValues.Prakriti_Model['Appetite'],
//   taste_preference: modelValidValues.Prakriti_Model['Liking tastes'],
// };

// const DOSHA_OPTIONS = {
//   sleep_quality: modelValidValues.Imbalance_Model['Sleep Patterns'],
//   stress_level: modelValidValues.Imbalance_Model['Stress Levels'],
//   physical_activity_level: modelValidValues.Imbalance_Model['Physical Activity Levels'],
//   season: modelValidValues.Imbalance_Model['Seasonal Variation'],
//   age_group: modelValidValues.Imbalance_Model['Age Group'],
//   gender: modelValidValues.Imbalance_Model['Gender'],
//   work_type: modelValidValues.Imbalance_Model['Occupation and Lifestyle'],
//   cultural_diet_preference: modelValidValues.Imbalance_Model['Cultural Preferences'],
//   climate_exposure: modelValidValues.Imbalance_Model['Environmental Factors'],
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF7EC',
    
//   },
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     paddingBottom: 32,
//   },
//   heroSection: {
//     paddingHorizontal: 24,
//     paddingTop: 10,
//     paddingBottom: 32,
//     backgroundColor: '#FFF7EC',
//   },
//   greetingContainer: {
//     marginBottom: 24,
//   },
//   greetingSubtitle: {
//     fontSize: 15,
//     color: '#6B7280',
//     marginBottom: 6,
//     fontWeight: '500',
//   },
//   greetingTitle: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#2E2A24',
//     marginBottom: 4,
//     letterSpacing: -0.5,
//   },
//   greetingDate: {
//     fontSize: 14,
//     color: '#6B5E4B',
//     fontWeight: '500',
//   },
//   sectionContainer: {
//     paddingHorizontal: 24,
//     marginBottom: 24,
//   },
//   doshaCardsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   doshaEmoji: {
//     fontSize: 40,
//     marginBottom: 8,
//   },
//   doshaCardContent: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   doshaName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   doshaScore: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   doshaSecondary: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     marginTop: 4,
//   },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   statItemContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   statDivider: {
//     width: 1,
//     backgroundColor: '#E5E7EB',
//   },
//   doshaCardsRow: {
//     flexDirection: 'row',
//     gap: 8,
//     marginBottom: 16,
//   },
//   quickButtonsRow: {
//     flexDirection: 'row',
//     gap: 12,
//     marginBottom: 16,
//   },
//   quickButton: {
//     flex: 1,
//     backgroundColor: '#FFF0DE',
//     borderRadius: 20,
//     paddingVertical: 20,
//     paddingHorizontal: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#E58B3A',
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 6 },
//     elevation: 8,
//     borderWidth: 1,
//     borderColor: '#F2D2B5',
//   },
//   quickButtonAlt: {
//     shadowColor: '#10B981',
//     borderColor: '#D8F2DE',
//     backgroundColor: '#E6F6EA',
//   },
//   quickButtonIcon: {
//     fontSize: 28,
//     marginBottom: 8,
//   },
//   quickButtonText: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#2E2A24',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   quickButtonSubtext: {
//     fontSize: 11,
//     color: '#6B5E4B',
//     marginTop: 2,
//   },
//   prakritiHeroCard: {
//     borderRadius: 24,
//     padding: 24,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     shadowOffset: { width: 0, height: 8 },
//     elevation: 10,
//     overflow: 'hidden',
//   },
//   prakritiCardGradient: {
//     padding: 24,
//     borderRadius: 24,
//   },
//   prakritiCardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   prakritiEmojiLarge: {
//     fontSize: 56,
//     marginRight: 16,
//   },
//   prakritiInfo: {
//     flex: 1,
//   },
//   prakritiLabel: {
//     fontSize: 13,
//     color: '#FFFFFF',
//     opacity: 0.9,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   prakritiType: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#FFFFFF',
//     marginBottom: 4,
//   },
//   prakritiPercentage: {
//     fontSize: 16,
//     color: '#FFFFFF',
//     opacity: 0.95,
//     fontWeight: '600',
//   },
//   prakritiSecondaryInfo: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   prakritiSecondaryText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   statsCard: {
//     backgroundColor: '#FFF0DE',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#E58B3A',
//     shadowOpacity: 0.08,
//     shadowRadius: 16,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 6,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#F2D2B5',
//   },
//   statsTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#2E2A24',
//     marginBottom: 16,
//   },
//   tipsContainer: {
//     gap: 12,
//     marginBottom: 32,
//   },
//   infoCard: {
//     backgroundColor: '#FFF0DE',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#E58B3A',
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 6,
//     borderLeftWidth: 4,
//   },
//   infoCardBlue: {
//     borderLeftColor: '#E58B3A',
//   },
//   infoCardGreen: {
//     borderLeftColor: '#4A9B6B',
//   },
//   infoCardContent: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   infoCardEmoji: {
//     fontSize: 28,
//     marginRight: 14,
//   },
//   infoCardTextContainer: {
//     flex: 1,
//   },
//   infoCardTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#2E2A24',
//     marginBottom: 6,
//   },
//   infoCardDescription: {
//     fontSize: 14,
//     color: '#5F5344',
//     lineHeight: 20,
//   },
//   buttonsGap: {
//     gap: 12,
//   },
//   actionButton: {
//     backgroundColor: '#FFF0DE',
//     borderRadius: 16,
//     padding: 18,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     shadowColor: '#E58B3A',
//     shadowOpacity: 0.12,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 6,
//     borderWidth: 1,
//     borderColor: '#F2D2B5',
//   },
//   actionButtonSecondary: {
//     borderColor: '#D8F2DE',
//     shadowColor: '#4A9B6B',
//     backgroundColor: '#E6F6EA',
//   },
//   actionButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   actionButtonEmoji: {
//     fontSize: 24,
//   },
//   actionButtonText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#2E2A24',
//   },
//   actionButtonArrow: {
//     fontSize: 18,
//     color: '#8A7B6A',
//   },
//   tipCard: {
//     backgroundColor: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#667EEA',
//     shadowOpacity: 0.3,
//     shadowRadius: 16,
//     shadowOffset: { width: 0, height: 8 },
//     elevation: 8,
//   },
//   tipCardContent: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   tipEmoji: {
//     fontSize: 32,
//     marginRight: 16,
//   },
//   tipTextContainer: {
//     flex: 1,
//   },
//   tipTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginBottom: 6,
//   },
//   tipDescription: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     opacity: 0.9,
//     lineHeight: 20,
//   },
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   modalOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//   },
//   modalCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 16,
//     maxHeight: '90%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   modalClose: {
//     color: '#EE9B4D',
//     fontWeight: '600',
//   },
//   inputBlock: {
//     marginBottom: 10,
//   },
//   inputLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 6,
//   },
//   inputField: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontSize: 14,
//     color: '#111827',
//     backgroundColor: '#F9FAFB',
//   },
//   pickerWrap: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 10,
//     backgroundColor: '#F9FAFB',
//     overflow: 'hidden',
//   },
//   picker: {
//     color: '#111827',
//   },
// });

// type DropdownFieldProps = {
//   label: string;
//   value: string;
//   options: string[];
//   onChange: (value: string) => void;
// };

// function DropdownField({ label, value, options, onChange }: DropdownFieldProps) {
//   return (
//     <View style={styles.inputBlock}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <View style={styles.pickerWrap}>
//         <Picker
//           selectedValue={value}
//           onValueChange={onChange}
//           style={styles.picker}
//         >
//           {options.map((option) => (
//             <Picker.Item key={option} label={option} value={option} />
//           ))}
//         </Picker>
//       </View>
//     </View>
//   );
// }

// export default function HomeScreen() {
//   const [prakriti, setPrakriti] = useState<PrakritiResult | null>(null);
//   const [suggestions, setSuggestions] = useState<DietarySuggestion[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isPrakritiFormOpen, setIsPrakritiFormOpen] = useState(false);
//   const [isPrakritiSubmitting, setIsPrakritiSubmitting] = useState(false);
//   const [isDoshaSubmitting, setIsDoshaSubmitting] = useState(false);
//   const { user } = useAuth();
//   const [dailyQuote, setDailyQuote] = useState(AYURVEDA_QUOTES[0]);
//   const [prakritiForm, setPrakritiForm] = useState({
//     body_size: 'Medium',
//     body_weight_tendency: 'Moderate - no difficulties in gaining or losing weight',
//     height: 'Average',
//     bone_structure: 'Medium bone structure',
//     complexion: 'Fair-skin sunburns easily',
//     skin_type: 'Smooth and warm, oily T-zone',
//     skin_texture: 'Freckles, many moles, redness and rashes',
//     hair_color: 'Red, light brown, yellow',
//     hair_appearance: 'Straight, oily',
//     face_shape: 'Heart-shaped, pointed chin',
//     eyes: 'Medium-sized, penetrating, light-sensitive eyes',
//     eyelashes: 'Moderate eyelashes',
//     blinking_pattern: 'Moderate Blinking',
//     cheeks: 'Smooth, Flat',
//     nose_shape: 'Pointed, Average',
//     teeth_structure: 'Medium-sized teeth, Reddish gums',
//     lips: 'Lips are soft, medium-sized',
//     nails: 'Sharp, Flexible, Pink, Lustrous',
//     appetite: 'Strong, Unbearable',
//     taste_preference: 'Pungent / Bitter / Astringent',
//   });

//   const [isDoshaFormOpen, setIsDoshaFormOpen] = useState(false);
//   const [doshaForm, setDoshaForm] = useState({
//     current_symptoms: 'Frequent headaches and digestive issues',
//     medical_history: 'No major surgeries',
//     digestion_quality: 'Irregular digestion with bloating',
//     mental_state: 'Anxious and restless at times',
//     current_medications: 'None',
//     bowel_pattern: 'Irregular bowel movements',
//     gas_bloating: 'Frequent gas after meals',
//     sleep_quality: 'Irregular Sleep',
//     stress_level: 'Moderate Stress',
//     physical_activity_level: 'Moderate',
//     season: 'Summer season',
//     age_group: '20-40 years',
//     gender: 'Male',
//     work_type: 'Desk Job, High stress',
//     cultural_diet_preference: 'Avoids spicy foods',
//     climate_exposure: 'High-stress environments',
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const result = await getPrakritiResultAsync('user_1');
//         setPrakriti(result);
        
//         if (result) {
//           const sugg = await getHighPrioritySuggestions(result.primaryDosha);
//           setSuggestions(sugg);
//         }
//       } catch (error) {
//         console.error('Error loading home data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   useEffect(() => {
//     const randomIndex = Math.floor(Math.random() * AYURVEDA_QUOTES.length);
//     setDailyQuote(AYURVEDA_QUOTES[randomIndex]);
//   }, []);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Loader />
//       </SafeAreaView>
//     );
//   }


//   const getDoshaColor = (dosha: string): string => {
//     switch (dosha) {
//       case 'vata':
//         return '#667EEA';
//       case 'pitta':
//         return '#F76B1C';
//       case 'kapha':
//         return '#4FACFE';
//       default:
//         return '#EE9B4D';
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         <View style={styles.contentContainer}>
//           {/* Hero Section with Greeting */}
//           <View style={styles.heroSection}>
//             <View style={styles.greetingContainer}>
//               <Text style={styles.greetingSubtitle}>{dailyQuote}</Text>
//               <Text style={styles.greetingTitle}>
//                 {user?.username ? user.username : 'Welcome Back'}
//               </Text>
//               <Text style={styles.greetingDate}>
//                 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
//               </Text>
//             </View>
//           </View>

//           {/* Prakriti Hero Card */}
//           {prakriti && (
//             <View style={styles.sectionContainer}>
//               <TouchableOpacity 
//                 onPress={() => router.navigate('/(app)/(tabs)/profile')}
//                 activeOpacity={0.9}
//               >
//                 <View style={[styles.prakritiHeroCard, { backgroundColor: getDoshaColor(prakriti.primaryDosha) }]}>
//                   <View style={styles.prakritiCardGradient}>
//                     <View style={styles.prakritiCardHeader}>
//                       <Text style={styles.prakritiEmojiLarge}>
//                         {prakriti.primaryDosha === 'vata' && '💨'}
//                         {prakriti.primaryDosha === 'pitta' && '🔥'}
//                         {prakriti.primaryDosha === 'kapha' && '💧'}
//                       </Text>
//                       <View style={styles.prakritiInfo}>
//                         <Text style={styles.prakritiLabel}>YOUR PRAKRITI TYPE</Text>
//                         <Text style={styles.prakritiType}>
//                           {prakriti.primaryDosha.charAt(0).toUpperCase() + prakriti.primaryDosha.slice(1)}
//                         </Text>
//                         <Text style={styles.prakritiPercentage}>
//                           {prakriti.scores[prakriti.primaryDosha]}% Dominant
//                         </Text>
//                       </View>
//                     </View>
//                     <View style={styles.prakritiSecondaryInfo}>
//                       <Text style={styles.prakritiSecondaryText}>
//                         Secondary: {prakriti.secondaryDosha.charAt(0).toUpperCase() + prakriti.secondaryDosha.slice(1)} • Tap to view details
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           )}

//           <View style={styles.sectionContainer}>
//             <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>Assessments</Text>
//             <View style={styles.quickButtonsRow}>
//               <TouchableOpacity
//                 style={styles.quickButton}
//                 activeOpacity={0.85}
//                 onPress={() => setIsPrakritiFormOpen(true)}
//               >
//                 <Text style={styles.quickButtonIcon}>🧬</Text>
//                 <Text style={styles.quickButtonText}>Prakriti</Text>
//                 <Text style={styles.quickButtonSubtext}>Body Constitution</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.quickButton, styles.quickButtonAlt]}
//                 activeOpacity={0.85}
//                 onPress={() => setIsDoshaFormOpen(true)}
//               >
//                 <Text style={styles.quickButtonIcon}>🌸</Text>
//                 <Text style={styles.quickButtonText}>Dosha</Text>
//                 <Text style={styles.quickButtonSubtext}>Current Balance</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <Modal
//             visible={isPrakritiFormOpen}
//             animationType="slide"
//             transparent
//             onRequestClose={() => setIsPrakritiFormOpen(false)}
//           >
//             <View style={styles.modalBackdrop}>
//               <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
//               <View style={styles.modalOverlay} />
//               <View style={styles.modalCard}>
//                 <View style={styles.modalHeader}>
//                   <Text style={styles.modalTitle}>Prakriti Form</Text>
//                   <TouchableOpacity onPress={() => setIsPrakritiFormOpen(false)}>
//                     <Text style={styles.modalClose}>Close</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <ScrollView showsVerticalScrollIndicator={false}>
//                   {[
//                     { key: 'body_size', label: 'Body Size', options: PRAKRITI_OPTIONS.body_size },
//                     { key: 'body_weight_tendency', label: 'Body Weight Tendency', options: PRAKRITI_OPTIONS.body_weight_tendency },
//                     { key: 'height', label: 'Height', options: PRAKRITI_OPTIONS.height },
//                     { key: 'bone_structure', label: 'Bone Structure', options: PRAKRITI_OPTIONS.bone_structure },
//                     { key: 'complexion', label: 'Complexion', options: PRAKRITI_OPTIONS.complexion },
//                     { key: 'skin_type', label: 'Skin Type', options: PRAKRITI_OPTIONS.skin_type },
//                     { key: 'skin_texture', label: 'Skin Texture', options: PRAKRITI_OPTIONS.skin_texture },
//                     { key: 'hair_color', label: 'Hair Color', options: PRAKRITI_OPTIONS.hair_color },
//                     { key: 'hair_appearance', label: 'Hair Appearance', options: PRAKRITI_OPTIONS.hair_appearance },
//                     { key: 'face_shape', label: 'Face Shape', options: PRAKRITI_OPTIONS.face_shape },
//                     { key: 'eyes', label: 'Eyes', options: PRAKRITI_OPTIONS.eyes },
//                     { key: 'eyelashes', label: 'Eyelashes', options: PRAKRITI_OPTIONS.eyelashes },
//                     { key: 'blinking_pattern', label: 'Blinking Pattern', options: PRAKRITI_OPTIONS.blinking_pattern },
//                     { key: 'cheeks', label: 'Cheeks', options: PRAKRITI_OPTIONS.cheeks },
//                     { key: 'nose_shape', label: 'Nose Shape', options: PRAKRITI_OPTIONS.nose_shape },
//                     { key: 'teeth_structure', label: 'Teeth Structure', options: PRAKRITI_OPTIONS.teeth_structure },
//                     { key: 'lips', label: 'Lips', options: PRAKRITI_OPTIONS.lips },
//                     { key: 'nails', label: 'Nails', options: PRAKRITI_OPTIONS.nails },
//                     { key: 'appetite', label: 'Appetite', options: PRAKRITI_OPTIONS.appetite },
//                     { key: 'taste_preference', label: 'Taste Preference', options: PRAKRITI_OPTIONS.taste_preference },
//                   ].map((field) => (
//                     <DropdownField
//                       key={field.key}
//                       label={field.label}
//                       value={prakritiForm[field.key as keyof typeof prakritiForm]}
//                       options={field.options}
//                       onChange={(value) =>
//                         setPrakritiForm((prev) => ({
//                           ...prev,
//                           [field.key]: value,
//                         }))
//                       }
//                     />
//                   ))}

//                   <Button
//                     title={isPrakritiSubmitting ? 'Predicting...' : 'Predict Prakriti'}
//                     onPress={async () => {
//                       if (!user) {
//                         Alert.alert('Error', 'User not found. Please login again.');
//                         return;
//                       }

//                       try {
//                         const emptyFields = Object.entries(prakritiForm).filter(([_, value]) => value === '');
//                         if (emptyFields.length > 0) {
//                           Alert.alert(
//                             'Incomplete Form',
//                             `Please fill all ${emptyFields.length} field(s) before submitting.`
//                           );
//                           return;
//                         }

//                         setIsPrakritiSubmitting(true);
//                         const response = await apiClient.predictPrakriti(prakritiForm);
//                         const resultData = response.data || response;

//                         setIsPrakritiFormOpen(false);
//                         router.push({
//                           pathname: '/(app)/prediction-result',
//                           params: {
//                             type: 'prakriti',
//                             data: JSON.stringify(resultData),
//                           },
//                         });
//                       } catch (error) {
//                         console.error('Prakriti submission error:', error);
//                         Alert.alert(
//                           'Error',
//                           error instanceof Error ? error.message : 'Failed to submit Prakriti assessment. Please try again.'
//                         );
//                       } finally {
//                         setIsPrakritiSubmitting(false);
//                       }
//                     }}
//                     style={{ marginTop: 12, marginBottom: 12 }}
//                   />
//                 </ScrollView>
//               </View>
//             </View>
//           </Modal>

//           <Modal
//             visible={isDoshaFormOpen}
//             animationType="slide"
//             transparent
//             onRequestClose={() => setIsDoshaFormOpen(false)}
//           >
//             <View style={styles.modalBackdrop}>
//               <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
//               <View style={styles.modalOverlay} />
//               <View style={styles.modalCard}>
//                 <View style={styles.modalHeader}>
//                   <Text style={styles.modalTitle}>Dosha Assessment</Text>
//                   <TouchableOpacity onPress={() => setIsDoshaFormOpen(false)}>
//                     <Text style={styles.modalClose}>Close</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <ScrollView showsVerticalScrollIndicator={false}>
//                   {[
//                     { key: 'current_symptoms', label: 'Current Symptoms' },
//                     { key: 'medical_history', label: 'Medical History' },
//                     { key: 'digestion_quality', label: 'Digestion Quality' },
//                     { key: 'mental_state', label: 'Mental State' },
//                     { key: 'current_medications', label: 'Current Medications' },
//                     { key: 'bowel_pattern', label: 'Bowel Pattern' },
//                     { key: 'gas_bloating', label: 'Gas/Bloating' },
//                   ].map((field) => (
//                     <View key={field.key} style={styles.inputBlock}>
//                       <Text style={styles.inputLabel}>{field.label}</Text>
//                       <TextInput
//                         style={styles.inputField}
//                         value={doshaForm[field.key as keyof typeof doshaForm]}
//                         onChangeText={(value) =>
//                           setDoshaForm((prev) => ({
//                             ...prev,
//                             [field.key]: value,
//                           }))
//                         }
//                         placeholder={`Enter ${field.label.toLowerCase()}`}
//                         placeholderTextColor="#9CA3AF"
//                       />
//                     </View>
//                   ))}

//                   {[
//                     { key: 'sleep_quality', label: 'Sleep Quality', options: DOSHA_OPTIONS.sleep_quality },
//                     { key: 'stress_level', label: 'Stress Level', options: DOSHA_OPTIONS.stress_level },
//                     { key: 'physical_activity_level', label: 'Physical Activity Level', options: DOSHA_OPTIONS.physical_activity_level },
//                     { key: 'season', label: 'Season', options: DOSHA_OPTIONS.season },
//                     { key: 'age_group', label: 'Age Group', options: DOSHA_OPTIONS.age_group },
//                     { key: 'gender', label: 'Gender', options: DOSHA_OPTIONS.gender },
//                     { key: 'work_type', label: 'Work Type', options: DOSHA_OPTIONS.work_type },
//                     { key: 'cultural_diet_preference', label: 'Cultural Diet Preference', options: DOSHA_OPTIONS.cultural_diet_preference },
//                     { key: 'climate_exposure', label: 'Climate Exposure', options: DOSHA_OPTIONS.climate_exposure },
//                   ].map((field) => (
//                     <DropdownField
//                       key={field.key}
//                       label={field.label}
//                       value={doshaForm[field.key as keyof typeof doshaForm]}
//                       options={field.options}
//                       onChange={(value) =>
//                         setDoshaForm((prev) => ({
//                           ...prev,
//                           [field.key]: value,
//                         }))
//                       }
//                     />
//                   ))}

//                   <Button
//                     title={isDoshaSubmitting ? 'Predicting...' : 'Predict Dosha'}
//                     onPress={async () => {
//                       if (!user) {
//                         Alert.alert('Error', 'User not found. Please login again.');
//                         return;
//                       }

//                       try {
//                         // Check if any field is empty
//                         const emptyFields = Object.entries(doshaForm).filter(([_, value]) => value === '');
//                         if (emptyFields.length > 0) {
//                           Alert.alert(
//                             'Incomplete Form',
//                             `Please fill all ${emptyFields.length} field(s) before submitting.`
//                           );
//                           return;
//                         }

//                         setIsDoshaSubmitting(true);
//                         const response = await apiClient.predictDosha(doshaForm);
//                         const resultData = response.data || response;

//                         setIsDoshaFormOpen(false);
//                         router.push({
//                           pathname: '/(app)/prediction-result',
//                           params: {
//                             type: 'dosha',
//                             data: JSON.stringify(resultData),
//                           },
//                         });
//                       } catch (error) {
//                         console.error('Dosha submission error:', error);
//                         Alert.alert(
//                           'Error',
//                           error instanceof Error ? error.message : 'Failed to submit Dosha assessment. Please try again.'
//                         );
//                       } finally {
//                         setIsDoshaSubmitting(false);
//                       }
//                     }}
//                     style={{ marginTop: 12, marginBottom: 12 }}
//                   />
//                 </ScrollView>
//               </View>
//             </View>
//           </Modal>
//           {/* Today's Stats */}
//           <View style={styles.sectionContainer}>
//             <Text style={styles.statsTitle}>Today's Stats</Text>
//             <View style={styles.statsCard}>
//               <View style={styles.statsRow}>
//                 <StatItem label="Calories" value="2,100" unit="kcal" />
//                 <View style={styles.statDivider} />
//                 <StatItem label="Protein" value="75" unit="g" />
//                 <View style={styles.statDivider} />
//                 <StatItem label="Meals" value="3" color="text-secondary-500" />
//               </View>
//             </View>
//           </View>

//           {/* Dosha Balance */}
//           {prakriti && (
//             <View style={styles.sectionContainer}>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
//                 <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>Dosha Balance</Text>
//                 <TouchableOpacity onPress={() => router.navigate('/(app)/(tabs)/analytics')}>
//                   <Text style={{ fontSize: 14, fontWeight: '600', color: '#EE9B4D' }}>View Details →</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.doshaCardsRow}>
//                 <DoshaCard
//                   dosha="vata"
//                   score={prakriti.scores.vata}
//                   title="Vata"
//                   description="Space & Air"
//                 />
//                 <DoshaCard
//                   dosha="pitta"
//                   score={prakriti.scores.pitta}
//                   title="Pitta"
//                   description="Fire & Water"
//                 />
//                 <DoshaCard
//                   dosha="kapha"
//                   score={prakriti.scores.kapha}
//                   title="Kapha"
//                   description="Water & Earth"
//                 />
//               </View>
//             </View>
//           )}

//           {/* Quick Actions */}
//           <View style={styles.sectionContainer}>
//             <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>Quick Actions</Text>
//             <View style={styles.buttonsGap}>
//               <TouchableOpacity
//                 style={styles.actionButton}
//                 activeOpacity={0.85}
//                 onPress={() => router.navigate('/(app)/(tabs)/food-tracking')}
//               >
//                 <View style={styles.actionButtonContent}>
//                   <Text style={styles.actionButtonEmoji}>📸</Text>
//                   <Text style={styles.actionButtonText}>Recognize Food</Text>
//                 </View>
//                 <Text style={styles.actionButtonArrow}>→</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.actionButtonSecondary]}
//                 activeOpacity={0.85}
//                 onPress={() => router.navigate('/(app)/(tabs)/plans')}
//               >
//                 <View style={styles.actionButtonContent}>
//                   <Text style={styles.actionButtonEmoji}>📋</Text>
//                   <Text style={styles.actionButtonText}>View Today's Plan</Text>
//                 </View>
//                 <Text style={styles.actionButtonArrow}>→</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Today's Tip */}
//           {suggestions.length > 0 && (
//             <View style={styles.sectionContainer}>
//               <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>Today's Tip</Text>
//               <LinearGradient
//                 colors={['#667EEA', '#764BA2']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.tipCard}
//               >
//                 <View style={styles.tipCardContent}>
//                   <Text style={styles.tipEmoji}>🌿</Text>
//                   <View style={styles.tipTextContainer}>
//                     <Text style={styles.tipTitle}>{suggestions[0].title}</Text>
//                     <Text style={styles.tipDescription}>{suggestions[0].description}</Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </View>
//           )}

//           {/* Info Cards */}
//           <View style={styles.sectionContainer}>
//             <View style={styles.tipsContainer}>
//               <View style={[styles.infoCard, styles.infoCardBlue]}>
//                 <View style={styles.infoCardContent}>
//                   <Text style={styles.infoCardEmoji}>🌿</Text>
//                   <View style={styles.infoCardTextContainer}>
//                     <Text style={styles.infoCardTitle}>Mindful Eating</Text>
//                     <Text style={styles.infoCardDescription}>
//                       Chew thoroughly and eat slowly for better digestion and nutrient absorption
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//               <View style={[styles.infoCard, styles.infoCardGreen]}>
//                 <View style={styles.infoCardContent}>
//                   <Text style={styles.infoCardEmoji}>💧</Text>
//                   <View style={styles.infoCardTextContainer}>
//                     <Text style={styles.infoCardTitle}>Stay Hydrated</Text>
//                     <Text style={styles.infoCardDescription}>
//                       Drink warm water throughout the day to support digestion and balance doshas
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, Animated, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { getPrakritiResultAsync } from '@/app/services/prakritiService';
import { getHighPrioritySuggestions } from '@/app/services/dietarySuggestionService';
import { Card, Section, Button, Loader, DoshaCard, StatItem } from '@/components/ui/Button';
import { PrakritiResult, DietarySuggestion } from '@/app/types';
import { useAuth } from '@/app/context/AuthContext';
import { apiClient } from '@/app/services/apiClient';

const { width } = Dimensions.get('window');

const modelValidValues = require('@/model_valid_values.json') as {
  Prakriti_Model: Record<string, string[]>;
  Imbalance_Model: Record<string, string[]>;
};

const AYURVEDA_QUOTES = [
  'When diet is wrong, medicine is of no use.',
  'Health is the greatest gift; contentment, the greatest wealth.',
  'Treat the cause, not just the symptom.',
  'Balance is the key to harmony in body and mind.',
  'Food is medicine when chosen with awareness.',
];

const PRAKRITI_OPTIONS = {
  body_size: modelValidValues.Prakriti_Model['Body Size'],
  body_weight_tendency: modelValidValues.Prakriti_Model['Body Weight'],
  height: modelValidValues.Prakriti_Model['Height'],
  bone_structure: modelValidValues.Prakriti_Model['Bone Structure'],
  complexion: modelValidValues.Prakriti_Model['Complexion'],
  skin_type: modelValidValues.Prakriti_Model['General feel of skin'],
  skin_texture: modelValidValues.Prakriti_Model['Texture of Skin'],
  hair_color: modelValidValues.Prakriti_Model['Hair Color'],
  hair_appearance: modelValidValues.Prakriti_Model['Appearance of Hair'],
  face_shape: modelValidValues.Prakriti_Model['Shape of face'],
  eyes: modelValidValues.Prakriti_Model['Eyes'],
  eyelashes: modelValidValues.Prakriti_Model['Eyelashes'],
  blinking_pattern: modelValidValues.Prakriti_Model['Blinking of Eyes'],
  cheeks: modelValidValues.Prakriti_Model['Cheeks'],
  nose_shape: modelValidValues.Prakriti_Model['Nose'],
  teeth_structure: modelValidValues.Prakriti_Model['Teeth and gums'],
  lips: modelValidValues.Prakriti_Model['Lips'],
  nails: modelValidValues.Prakriti_Model['Nails'],
  appetite: modelValidValues.Prakriti_Model['Appetite'],
  taste_preference: modelValidValues.Prakriti_Model['Liking tastes'],
};

const DOSHA_OPTIONS = {
  sleep_quality: modelValidValues.Imbalance_Model['Sleep Patterns'],
  stress_level: modelValidValues.Imbalance_Model['Stress Levels'],
  physical_activity_level: modelValidValues.Imbalance_Model['Physical Activity Levels'],
  season: modelValidValues.Imbalance_Model['Seasonal Variation'],
  age_group: modelValidValues.Imbalance_Model['Age Group'],
  gender: modelValidValues.Imbalance_Model['Gender'],
  work_type: modelValidValues.Imbalance_Model['Occupation and Lifestyle'],
  cultural_diet_preference: modelValidValues.Imbalance_Model['Cultural Preferences'],
  climate_exposure: modelValidValues.Imbalance_Model['Environmental Factors'],
};

const getDoshaGradient = (dosha: string): [string, string] => {
  switch (dosha) {
    case 'vata': return ['#7B8FF7', '#5C6FE8'];
    case 'pitta': return ['#FF8C42', '#F76B1C'];
    case 'kapha': return ['#4FACFE', '#00B4DB'];
    default: return ['#EE9B4D', '#D4822A'];
  }
};

const getDoshaAccent = (dosha: string): string => {
  switch (dosha) {
    case 'vata': return '#667EEA';
    case 'pitta': return '#F76B1C';
    case 'kapha': return '#4FACFE';
    default: return '#EE9B4D';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EC',
  },
  scrollView: { flex: 1 },
  contentContainer: { paddingBottom: 40 },

  // ── Hero / Greeting ──────────────────────────────────────────────
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  quoteBadge: {
    backgroundColor: '#FDE8CC',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  quoteBadgeText: {
    fontSize: 12,
    color: '#C97B2E',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  greetingTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2E2A24',
    letterSpacing: -1,
    marginBottom: 4,
  },
  greetingDate: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  // ── Prakriti Hero Card (FIXED) ────────────────────────────────────
  prakritiCardWrapper: {
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 8,
  },
  prakritiCard: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#F76B1C',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 14,
  },
  prakritiGradient: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  prakritiTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  prakritiEmojiBox: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  prakritiEmoji: {
    fontSize: 34,
  },
  prakritiTextBlock: {
    flex: 1,
  },
  prakritiLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  prakritiType: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  prakritiPercentagePill: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
  },
  prakritiPercentageText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  prakritiDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 14,
  },
  prakritiBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prakritiSecondaryText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  prakritiArrow: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prakritiArrowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Section wrapper ──────────────────────────────────────────────
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E2A24',
    letterSpacing: -0.3,
  },
  sectionLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EE9B4D',
  },

  // ── Assessment buttons ───────────────────────────────────────────
  quickButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#FFF0DE',
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E58B3A',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F2D2B5',
  },
  quickButtonAlt: {
    backgroundColor: '#E6F6EA',
    borderColor: '#C3E6CB',
    shadowColor: '#4A9B6B',
  },
  quickButtonIcon: { fontSize: 30, marginBottom: 10 },
  quickButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2E2A24',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  quickButtonSubtext: {
    fontSize: 11,
    color: '#8A7B6A',
    marginTop: 2,
  },

  // ── Stats Card ───────────────────────────────────────────────────
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0E6DA',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0E6DA',
  },

  // ── Dosha balance cards ──────────────────────────────────────────
  doshaCardsRow: {
    flexDirection: 'row',
    gap: 8,
  },

  // ── Quick action buttons ─────────────────────────────────────────
  buttonsGap: { gap: 12 },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0E6DA',
  },
  actionButtonSecondary: {
    borderColor: '#C3E6CB',
    backgroundColor: '#F4FBF5',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  actionButtonEmojiBox: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF0DE',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonEmojiBoxGreen: {
    backgroundColor: '#E6F6EA',
  },
  actionButtonEmoji: { fontSize: 22 },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2A24',
  },
  actionButtonArrow: {
    width: 30,
    height: 30,
    backgroundColor: '#F5EDE3',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonArrowText: {
    color: '#C97B2E',
    fontSize: 14,
    fontWeight: '700',
  },

  // ── Tip Card ─────────────────────────────────────────────────────
  tipCard: {
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#667EEA',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  tipGradient: {
    padding: 22,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipEmojiBox: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  tipEmoji: { fontSize: 26 },
  tipTextContainer: { flex: 1 },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },

  // ── Info cards ───────────────────────────────────────────────────
  tipsContainer: { gap: 12 },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#F0E6DA',
  },
  infoCardBlue: { borderLeftColor: '#E58B3A' },
  infoCardGreen: { borderLeftColor: '#4A9B6B' },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoCardEmojiBox: {
    width: 42,
    height: 42,
    backgroundColor: '#FFF0DE',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoCardEmojiBoxGreen: { backgroundColor: '#E6F6EA' },
  infoCardEmoji: { fontSize: 22 },
  infoCardTextContainer: { flex: 1 },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E2A24',
    marginBottom: 4,
  },
  infoCardDescription: {
    fontSize: 13,
    color: '#6B5E4B',
    lineHeight: 19,
  },

  // ── Modal ────────────────────────────────────────────────────────
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    padding: 20,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6DA',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E2A24',
  },
  modalClose: {
    color: '#EE9B4D',
    fontWeight: '700',
    fontSize: 15,
  },
  inputBlock: { marginBottom: 12 },
  inputLabel: {
    fontSize: 12,
    color: '#8A7B6A',
    marginBottom: 6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#2E2A24',
    backgroundColor: '#FAFAFA',
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  picker: { color: '#2E2A24' },
});

type DropdownFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function DropdownField({ label, value, options, onChange }: DropdownFieldProps) {
  return (
    <View style={styles.inputBlock}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.pickerWrap}>
        <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [prakriti, setPrakriti] = useState<PrakritiResult | null>(null);
  const [suggestions, setSuggestions] = useState<DietarySuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPrakritiFormOpen, setIsPrakritiFormOpen] = useState(false);
  const [isPrakritiSubmitting, setIsPrakritiSubmitting] = useState(false);
  const [isDoshaSubmitting, setIsDoshaSubmitting] = useState(false);
  const { user } = useAuth();
  const [dailyQuote, setDailyQuote] = useState(AYURVEDA_QUOTES[0]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [prakritiForm, setPrakritiForm] = useState({
    body_size: 'Medium',
    body_weight_tendency: 'Moderate - no difficulties in gaining or losing weight',
    height: 'Average',
    bone_structure: 'Medium bone structure',
    complexion: 'Fair-skin sunburns easily',
    skin_type: 'Smooth and warm, oily T-zone',
    skin_texture: 'Freckles, many moles, redness and rashes',
    hair_color: 'Red, light brown, yellow',
    hair_appearance: 'Straight, oily',
    face_shape: 'Heart-shaped, pointed chin',
    eyes: 'Medium-sized, penetrating, light-sensitive eyes',
    eyelashes: 'Moderate eyelashes',
    blinking_pattern: 'Moderate Blinking',
    cheeks: 'Smooth, Flat',
    nose_shape: 'Pointed, Average',
    teeth_structure: 'Medium-sized teeth, Reddish gums',
    lips: 'Lips are soft, medium-sized',
    nails: 'Sharp, Flexible, Pink, Lustrous',
    appetite: 'Strong, Unbearable',
    taste_preference: 'Pungent / Bitter / Astringent',
  });

  const [isDoshaFormOpen, setIsDoshaFormOpen] = useState(false);
  const [doshaForm, setDoshaForm] = useState({
    current_symptoms: 'Frequent headaches and digestive issues',
    medical_history: 'No major surgeries',
    digestion_quality: 'Irregular digestion with bloating',
    mental_state: 'Anxious and restless at times',
    current_medications: 'None',
    bowel_pattern: 'Irregular bowel movements',
    gas_bloating: 'Frequent gas after meals',
    sleep_quality: 'Irregular Sleep',
    stress_level: 'Moderate Stress',
    physical_activity_level: 'Moderate',
    season: 'Summer season',
    age_group: '20-40 years',
    gender: 'Male',
    work_type: 'Desk Job, High stress',
    cultural_diet_preference: 'Avoids spicy foods',
    climate_exposure: 'High-stress environments',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getPrakritiResultAsync('user_1');
        setPrakriti(result);
        if (result) {
          const sugg = await getHighPrioritySuggestions(result.primaryDosha);
          setSuggestions(sugg);
        }
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * AYURVEDA_QUOTES.length);
    setDailyQuote(AYURVEDA_QUOTES[randomIndex]);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  const doshaEmoji = prakriti?.primaryDosha === 'vata' ? '💨' : prakriti?.primaryDosha === 'pitta' ? '🔥' : '💧';

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>

            {/* ── Greeting ── */}
            <View style={styles.heroSection}>
              <View style={styles.quoteBadge}>
                <Text style={styles.quoteBadgeText}>"{dailyQuote}"</Text>
              </View>
              <Text style={styles.greetingTitle}>
                {user?.username ? user.username : 'Welcome Back'}
              </Text>
              <Text style={styles.greetingDate}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Text>
            </View>

            {/* ── Prakriti Hero Card (REDESIGNED) ── */}
            {prakriti && (
              <View style={styles.prakritiCardWrapper}>
                <TouchableOpacity
                  onPress={() => router.navigate('/(app)/(tabs)/profile')}
                  activeOpacity={0.92}
                  style={styles.prakritiCard}
                >
                  <LinearGradient
                    colors={getDoshaGradient(prakriti.primaryDosha)}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.prakritiGradient}
                  >
                    <View style={styles.prakritiTopRow}>
                      <View style={styles.prakritiEmojiBox}>
                        <Text style={styles.prakritiEmoji}>{doshaEmoji}</Text>
                      </View>
                      <View style={styles.prakritiTextBlock}>
                        <Text style={styles.prakritiLabel}>Your Prakriti Type</Text>
                        <Text style={styles.prakritiType}>
                          {prakriti.primaryDosha.charAt(0).toUpperCase() + prakriti.primaryDosha.slice(1)}
                        </Text>
                        <View style={styles.prakritiPercentagePill}>
                          <Text style={styles.prakritiPercentageText}>
                            {prakriti.scores[prakriti.primaryDosha]}% Dominant
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.prakritiDivider} />

                    <View style={styles.prakritiBottomRow}>
                      <Text style={styles.prakritiSecondaryText}>
                        Secondary: {prakriti.secondaryDosha.charAt(0).toUpperCase() + prakriti.secondaryDosha.slice(1)}
                      </Text>
                      <View style={styles.prakritiArrow}>
                        <Text style={styles.prakritiArrowText}>→</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {/* ── Assessments ── */}
            <View style={[styles.sectionContainer, { marginTop: 24 }]}>
              <Text style={styles.sectionTitle}>Assessments</Text>
              <View style={{ height: 14 }} />
              <View style={styles.quickButtonsRow}>
                <TouchableOpacity style={styles.quickButton} activeOpacity={0.85} onPress={() => setIsPrakritiFormOpen(true)}>
                  <Text style={styles.quickButtonIcon}>🧬</Text>
                  <Text style={styles.quickButtonText}>Prakriti</Text>
                  <Text style={styles.quickButtonSubtext}>Body Constitution</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.quickButton, styles.quickButtonAlt]} activeOpacity={0.85} onPress={() => setIsDoshaFormOpen(true)}>
                  <Text style={styles.quickButtonIcon}>🌸</Text>
                  <Text style={styles.quickButtonText}>Dosha</Text>
                  <Text style={styles.quickButtonSubtext}>Current Balance</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ── Today's Stats ── */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Today's Stats</Text>
              <View style={{ height: 14 }} />
              <View style={styles.statsCard}>
                <View style={styles.statsRow}>
                  <StatItem label="Calories" value="2,100" unit="kcal" />
                  <View style={styles.statDivider} />
                  <StatItem label="Protein" value="75" unit="g" />
                  <View style={styles.statDivider} />
                  <StatItem label="Meals" value="3" color="text-secondary-500" />
                </View>
              </View>
            </View>

            {/* ── Dosha Balance ── */}
            {prakriti && (
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Dosha Balance</Text>
                  <TouchableOpacity onPress={() => router.navigate('/(app)/(tabs)/analytics')}>
                    <Text style={styles.sectionLink}>Details →</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.doshaCardsRow}>
                  <DoshaCard dosha="vata" score={prakriti.scores.vata} title="Vata" description="Space & Air" />
                  <DoshaCard dosha="pitta" score={prakriti.scores.pitta} title="Pitta" description="Fire & Water" />
                  <DoshaCard dosha="kapha" score={prakriti.scores.kapha} title="Kapha" description="Water & Earth" />
                </View>
              </View>
            )}

            {/* ── Quick Actions ── */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={{ height: 14 }} />
              <View style={styles.buttonsGap}>
                <TouchableOpacity style={styles.actionButton} activeOpacity={0.85} onPress={() => router.navigate('/(app)/(tabs)/food-tracking')}>
                  <View style={styles.actionButtonContent}>
                    <View style={styles.actionButtonEmojiBox}>
                      <Text style={styles.actionButtonEmoji}>📸</Text>
                    </View>
                    <Text style={styles.actionButtonText}>Recognize Food</Text>
                  </View>
                  <View style={styles.actionButtonArrow}>
                    <Text style={styles.actionButtonArrowText}>→</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]} activeOpacity={0.85} onPress={() => router.navigate('/(app)/(tabs)/plans')}>
                  <View style={styles.actionButtonContent}>
                    <View style={[styles.actionButtonEmojiBox, styles.actionButtonEmojiBoxGreen]}>
                      <Text style={styles.actionButtonEmoji}>📋</Text>
                    </View>
                    <Text style={styles.actionButtonText}>View Today's Plan</Text>
                  </View>
                  <View style={styles.actionButtonArrow}>
                    <Text style={styles.actionButtonArrowText}>→</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* ── Today's Tip ── */}
            {suggestions.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Today's Tip</Text>
                <View style={{ height: 14 }} />
                <View style={styles.tipCard}>
                  <LinearGradient
                    colors={['#667EEA', '#764BA2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.tipGradient}
                  >
                    <View style={styles.tipEmojiBox}>
                      <Text style={styles.tipEmoji}>🌿</Text>
                    </View>
                    <View style={styles.tipTextContainer}>
                      <Text style={styles.tipTitle}>{suggestions[0].title}</Text>
                      <Text style={styles.tipDescription}>{suggestions[0].description}</Text>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            )}

            {/* ── Info Cards ── */}
            <View style={styles.sectionContainer}>
              <View style={styles.tipsContainer}>
                <View style={[styles.infoCard, styles.infoCardBlue]}>
                  <View style={styles.infoCardContent}>
                    <View style={styles.infoCardEmojiBox}>
                      <Text style={styles.infoCardEmoji}>🌿</Text>
                    </View>
                    <View style={styles.infoCardTextContainer}>
                      <Text style={styles.infoCardTitle}>Mindful Eating</Text>
                      <Text style={styles.infoCardDescription}>
                        Chew thoroughly and eat slowly for better digestion and nutrient absorption
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.infoCard, styles.infoCardGreen]}>
                  <View style={styles.infoCardContent}>
                    <View style={[styles.infoCardEmojiBox, styles.infoCardEmojiBoxGreen]}>
                      <Text style={styles.infoCardEmoji}>💧</Text>
                    </View>
                    <View style={styles.infoCardTextContainer}>
                      <Text style={styles.infoCardTitle}>Stay Hydrated</Text>
                      <Text style={styles.infoCardDescription}>
                        Drink warm water throughout the day to support digestion and balance doshas
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
      </Animated.View>

      {/* ── Prakriti Modal ── */}
      <Modal visible={isPrakritiFormOpen} animationType="slide" transparent onRequestClose={() => setIsPrakritiFormOpen(false)}>
        <View style={styles.modalBackdrop}>
          <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
          <View style={styles.modalOverlay} />
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Prakriti Assessment</Text>
              <TouchableOpacity onPress={() => setIsPrakritiFormOpen(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {[
                { key: 'body_size', label: 'Body Size', options: PRAKRITI_OPTIONS.body_size },
                { key: 'body_weight_tendency', label: 'Body Weight Tendency', options: PRAKRITI_OPTIONS.body_weight_tendency },
                { key: 'height', label: 'Height', options: PRAKRITI_OPTIONS.height },
                { key: 'bone_structure', label: 'Bone Structure', options: PRAKRITI_OPTIONS.bone_structure },
                { key: 'complexion', label: 'Complexion', options: PRAKRITI_OPTIONS.complexion },
                { key: 'skin_type', label: 'Skin Type', options: PRAKRITI_OPTIONS.skin_type },
                { key: 'skin_texture', label: 'Skin Texture', options: PRAKRITI_OPTIONS.skin_texture },
                { key: 'hair_color', label: 'Hair Color', options: PRAKRITI_OPTIONS.hair_color },
                { key: 'hair_appearance', label: 'Hair Appearance', options: PRAKRITI_OPTIONS.hair_appearance },
                { key: 'face_shape', label: 'Face Shape', options: PRAKRITI_OPTIONS.face_shape },
                { key: 'eyes', label: 'Eyes', options: PRAKRITI_OPTIONS.eyes },
                { key: 'eyelashes', label: 'Eyelashes', options: PRAKRITI_OPTIONS.eyelashes },
                { key: 'blinking_pattern', label: 'Blinking Pattern', options: PRAKRITI_OPTIONS.blinking_pattern },
                { key: 'cheeks', label: 'Cheeks', options: PRAKRITI_OPTIONS.cheeks },
                { key: 'nose_shape', label: 'Nose Shape', options: PRAKRITI_OPTIONS.nose_shape },
                { key: 'teeth_structure', label: 'Teeth Structure', options: PRAKRITI_OPTIONS.teeth_structure },
                { key: 'lips', label: 'Lips', options: PRAKRITI_OPTIONS.lips },
                { key: 'nails', label: 'Nails', options: PRAKRITI_OPTIONS.nails },
                { key: 'appetite', label: 'Appetite', options: PRAKRITI_OPTIONS.appetite },
                { key: 'taste_preference', label: 'Taste Preference', options: PRAKRITI_OPTIONS.taste_preference },
              ].map((field) => (
                <DropdownField
                  key={field.key}
                  label={field.label}
                  value={prakritiForm[field.key as keyof typeof prakritiForm]}
                  options={field.options}
                  onChange={(value) => setPrakritiForm((prev) => ({ ...prev, [field.key]: value }))}
                />
              ))}
              <Button
                title={isPrakritiSubmitting ? 'Predicting...' : 'Predict Prakriti'}
                onPress={async () => {
                  if (!user) { Alert.alert('Error', 'User not found. Please login again.'); return; }
                  try {
                    const emptyFields = Object.entries(prakritiForm).filter(([_, value]) => value === '');
                    if (emptyFields.length > 0) { Alert.alert('Incomplete Form', `Please fill all ${emptyFields.length} field(s) before submitting.`); return; }
                    setIsPrakritiSubmitting(true);
                    const response = await apiClient.predictPrakriti(prakritiForm);
                    const resultData = response.data || response;
                    setIsPrakritiFormOpen(false);
                    router.push({ pathname: '/(app)/prediction-result', params: { type: 'prakriti', data: JSON.stringify(resultData) } });
                  } catch (error) {
                    console.error('Prakriti submission error:', error);
                    Alert.alert('Error', error instanceof Error ? error.message : 'Failed to submit Prakriti assessment. Please try again.');
                  } finally {
                    setIsPrakritiSubmitting(false);
                  }
                }}
                style={{ marginTop: 12, marginBottom: 12 }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ── Dosha Modal ── */}
      <Modal visible={isDoshaFormOpen} animationType="slide" transparent onRequestClose={() => setIsDoshaFormOpen(false)}>
        <View style={styles.modalBackdrop}>
          <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
          <View style={styles.modalOverlay} />
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Dosha Assessment</Text>
              <TouchableOpacity onPress={() => setIsDoshaFormOpen(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {[
                { key: 'current_symptoms', label: 'Current Symptoms' },
                { key: 'medical_history', label: 'Medical History' },
                { key: 'digestion_quality', label: 'Digestion Quality' },
                { key: 'mental_state', label: 'Mental State' },
                { key: 'current_medications', label: 'Current Medications' },
                { key: 'bowel_pattern', label: 'Bowel Pattern' },
                { key: 'gas_bloating', label: 'Gas / Bloating' },
              ].map((field) => (
                <View key={field.key} style={styles.inputBlock}>
                  <Text style={styles.inputLabel}>{field.label}</Text>
                  <TextInput
                    style={styles.inputField}
                    value={doshaForm[field.key as keyof typeof doshaForm]}
                    onChangeText={(value) => setDoshaForm((prev) => ({ ...prev, [field.key]: value }))}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              ))}
              {[
                { key: 'sleep_quality', label: 'Sleep Quality', options: DOSHA_OPTIONS.sleep_quality },
                { key: 'stress_level', label: 'Stress Level', options: DOSHA_OPTIONS.stress_level },
                { key: 'physical_activity_level', label: 'Physical Activity Level', options: DOSHA_OPTIONS.physical_activity_level },
                { key: 'season', label: 'Season', options: DOSHA_OPTIONS.season },
                { key: 'age_group', label: 'Age Group', options: DOSHA_OPTIONS.age_group },
                { key: 'gender', label: 'Gender', options: DOSHA_OPTIONS.gender },
                { key: 'work_type', label: 'Work Type', options: DOSHA_OPTIONS.work_type },
                { key: 'cultural_diet_preference', label: 'Cultural Diet Preference', options: DOSHA_OPTIONS.cultural_diet_preference },
                { key: 'climate_exposure', label: 'Climate Exposure', options: DOSHA_OPTIONS.climate_exposure },
              ].map((field) => (
                <DropdownField
                  key={field.key}
                  label={field.label}
                  value={doshaForm[field.key as keyof typeof doshaForm]}
                  options={field.options}
                  onChange={(value) => setDoshaForm((prev) => ({ ...prev, [field.key]: value }))}
                />
              ))}
              <Button
                title={isDoshaSubmitting ? 'Predicting...' : 'Predict Dosha'}
                onPress={async () => {
                  if (!user) { Alert.alert('Error', 'User not found. Please login again.'); return; }
                  try {
                    const emptyFields = Object.entries(doshaForm).filter(([_, value]) => value === '');
                    if (emptyFields.length > 0) { Alert.alert('Incomplete Form', `Please fill all ${emptyFields.length} field(s) before submitting.`); return; }
                    setIsDoshaSubmitting(true);
                    const response = await apiClient.predictDosha(doshaForm);
                    const resultData = response.data || response;
                    setIsDoshaFormOpen(false);
                    router.push({ pathname: '/(app)/prediction-result', params: { type: 'dosha', data: JSON.stringify(resultData) } });
                  } catch (error) {
                    console.error('Dosha submission error:', error);
                    Alert.alert('Error', error instanceof Error ? error.message : 'Failed to submit Dosha assessment. Please try again.');
                  } finally {
                    setIsDoshaSubmitting(false);
                  }
                }}
                style={{ marginTop: 12, marginBottom: 12 }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
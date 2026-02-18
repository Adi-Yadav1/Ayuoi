import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Simplified Tailwind-like style utilities for React Native
export const styles = StyleSheet.create({
  // Container and background
  container: {
    flex: 1,
    backgroundColor: '#FEFAF5',
  },
  fluidContainer: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: '#FFFFFF',
  },
  bgLight: {
    backgroundColor: '#FEFAF5',
  },
  bgGray50: {
    backgroundColor: '#F9FAFB',
  },
  bgGray100: {
    backgroundColor: '#F3F4F6',
  },
  bgGray200: {
    backgroundColor: '#E5E7EB',
  },
  bgGray300: {
    backgroundColor: '#D1D5DB',
  },
  bgGray500: {
    backgroundColor: '#6B7280',
  },
  bgGray900: {
    backgroundColor: '#111827',
  },

  // Primary colors
  bgPrimary: {
    backgroundColor: '#EE9B4D',
  },
  bgPrimaryDark: {
    backgroundColor: '#C85A20',
  },

  // Dosha colors
  bgVata: {
    backgroundColor: '#C8A882',
  },
  bgPitta: {
    backgroundColor: '#FF9E64',
  },
  bgKapha: {
    backgroundColor: '#66BB6A',
  },

  // Text styles
  textXs: {
    fontSize: 12,
  },
  textSm: {
    fontSize: 14,
  },
  textBase: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
  textXl: {
    fontSize: 20,
  },
  text2xl: {
    fontSize: 24,
  },
  text3xl: {
    fontSize: 30,
  },

  textGray300: {
    color: '#D1D5DB',
  },
  textGray400: {
    color: '#9CA3AF',
  },
  textGray500: {
    color: '#6B7280',
  },
  textGray600: {
    color: '#4B5563',
  },
  textGray700: {
    color: '#374151',
  },
  textGray800: {
    color: '#1F2937',
  },
  textGray900: {
    color: '#111827',
  },
  textWhite: {
    color: '#FFFFFF',
  },

  textPrimary: {
    color: '#EE9B4D',
  },

  // Font weights
  fontNormal: {
    fontWeight: '400',
  },
  fontMedium: {
    fontWeight: '500',
  },
  fontSemibold: {
    fontWeight: '600',
  },
  fontBold: {
    fontWeight: '700',
  },

  // Padding
  p0: {
    padding: 0,
  },
  p2: {
    padding: 8,
  },
  p3: {
    padding: 12,
  },
  p4: {
    padding: 16,
  },
  p5: {
    padding: 20,
  },
  p6: {
    padding: 24,
  },

  px2: {
    paddingHorizontal: 8,
  },
  px3: {
    paddingHorizontal: 12,
  },
  px4: {
    paddingHorizontal: 16,
  },
  px6: {
    paddingHorizontal: 24,
  },

  py2: {
    paddingVertical: 8,
  },
  py3: {
    paddingVertical: 12,
  },
  py4: {
    paddingVertical: 16,
  },
  py6: {
    paddingVertical: 24,
  },

  // Margin
  m0: {
    margin: 0,
  },
  m2: {
    margin: 8,
  },
  m3: {
    margin: 12,
  },
  m4: {
    margin: 16,
  },
  m6: {
    margin: 24,
  },

  mb2: {
    marginBottom: 8,
  },
  mb3: {
    marginBottom: 12,
  },
  mb4: {
    marginBottom: 16,
  },
  mb6: {
    marginBottom: 24,
  },

  mt4: {
    marginTop: 16,
  },
  mt6: {
    marginTop: 24,
  },

  // Flexbox
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsStart: {
    alignItems: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },

  // Border radius
  rounded: {
    borderRadius: 4,
  },
  roundedLg: {
    borderRadius: 8,
  },
  roundedXl: {
    borderRadius: 12,
  },

  // Shadows (iOS)
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  // Common patterns
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  safeArea: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },

  section: {
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#EE9B4D',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  buttonOutline: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#EE9B4D',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111827',
  },
});

// Helper to combine multiple styles
export const combineStyles = (...args: any[]) => [
  ...args.filter(Boolean),
];

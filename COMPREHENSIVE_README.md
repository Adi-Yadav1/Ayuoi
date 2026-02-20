# VEDA - Ayurvedic Wellness Application

## Project Overview

**VEDA** is a comprehensive React Native health and wellness application built with Expo that integrates Ayurvedic principles with modern technology. The app helps users track their Doshas (Vata, Pitta, Kapha), manage their diet according to Ayurvedic guidelines, schedule appointments with Ayurvedic doctors, and receive personalized health recommendations.

**Version:** 1.0.0  
**Framework:** React Native (Expo)  
**Language:** TypeScript  
**Backend API:** https://prakriti-api.onrender.com/api  
**AI Food Analysis API:** http://54.226.87.3:8000/analyze

---

## 📱 Features

- **Prakriti Assessment**: Determine user's constitutional type through a detailed questionnaire
- **Food Tracking**: Image recognition and Ayurvedic analysis of food items
- **Diet AI Chatbot**: Get diet recommendations through an AI chatbot
- **Meal Plans**: Personalized meal recommendations based on Dosha type
- **Doctor Consultation**: Browse, search, and book appointments with Ayurvedic doctors
- **Health Tracking**: Monitor daily health metrics and nutrition
- **Analytics Dashboard**: View wellness progress and dosha balance
- **History Management**: Track prakriti and dosha predictions over time

---

## 🏗️ Project Structure

```
Ayuoi/
├── app/
│   ├── (app)/                    # App screens
│   │   ├── (tabs)/              # Tabbed interface screens
│   │   │   ├── analytics.tsx     # Analytics & insights
│   │   │   ├── dietAI.tsx        # Chatbot for diet recommendations
│   │   │   ├── doctor.tsx        # Doctor consultation interface
│   │   │   ├── food-tracking.tsx # Food image analysis & tracking
│   │   │   ├── home.tsx          # Dashboard homepage
│   │   │   ├── plans.tsx         # Meal plans
│   │   │   └── profile.tsx       # User profile & settings
│   │   ├── onboarding/           # Onboarding flow
│   │   │   ├── prakriti-assessment.tsx  # Prakriti questionnaire
│   │   │   ├── prakriti-result.tsx      # Assessment results
│   │   │   └── meal-plan-setup.tsx      # Initial meal plan setup
│   │   ├── dashboard.tsx         # Dashboard view
│   │   └── health-tracking.tsx   # Health metrics tracking
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx             # Login screen
│   │   └── signup.tsx            # Registration screen
│   ├── config/
│   │   └── constants.ts          # App constants & configuration
│   ├── context/
│   │   ├── AppContext.tsx        # Global app state
│   │   └── AuthContext.tsx       # Authentication state management
│   ├── hooks/
│   │   └── useApi.ts             # Custom data fetching hooks
│   ├── services/
│   │   ├── apiClient.ts          # HTTP client & API endpoints
│   │   ├── analyticsService.ts   # Analytics & wellness tracking
│   │   ├── dashboardService.ts   # Dashboard data
│   │   ├── dietarySuggestionService.ts  # Diet suggestions
│   │   ├── doctorService.ts      # Doctor-related operations
│   │   ├── foodRecognitionService.ts    # Food recognition data
│   │   ├── mealPlanService.ts    # Meal plan generation
│   │   └── prakritiService.ts    # Prakriti assessment logic
│   ├── styles/
│   │   └── theme.ts              # App theme colors and styles
│   ├── types/
│   │   ├── index.ts              # Core TypeScript types
│   │   └── schema.ts             # Backend schema types
│   ├── utils/
│   │   ├── ayurvedaHelpers.ts    # Ayurvedic utility functions
│   │   ├── pqcEncryption.ts      # Encryption utilities
│   │   └── pqcExamples.ts        # Encryption examples
│   └── data/
│       └── doctors.json          # Mock doctor data
├── components/
│   ├── ui/                       # UI Components
│   │   ├── Button.tsx            # Reusable Button component
│   │   ├── ProgressBar.tsx       # Progress bar component
│   │   ├── collapsible.tsx       # Collapsible sections
│   │   ├── icon-symbol.tsx       # Icon components
│   │   └── icon-symbol.ios.tsx   # iOS-specific icons
│   ├── external-link.tsx         # Link component
│   ├── Forms.tsx                 # Form components
│   ├── hello-wave.tsx            # Welcome animation
│   ├── parallax-scroll-view.tsx  # Parallax scrolling
│   └── themed-text.tsx           # Themed text component
├── constants/
│   └── theme.ts                  # Global theme constants
├── hooks/
│   ├── use-color-scheme.ts       # Color scheme detection
│   ├── use-theme-color.ts        # Theme color hook
│   └── use-color-scheme.web.ts   # Web-specific color scheme
├── assets/
│   └── images/                   # Application images & assets
├── scripts/
│   └── reset-project.js          # Project reset script
├── app.json                      # Expo app configuration
├── babel.config.js               # Babel configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # Project documentation
```

---

## 🔧 Core Services & Functions

### 1. **API Client** (`app/services/apiClient.ts`)

Central HTTP client for all backend API communications.

#### Authentication Functions

- `signup(email, username, password)` - User registration
- `login(email, password)` - User login
- `getCurrentUser()` - Fetch current user details

#### Health Profile Functions

- `getHealthProfile(userId)` - Retrieve user's health profile
- `createHealthProfile(userId, data)` - Create new health profile
- `updateHealthProfile(userId, updates)` - Update profile information

#### Prakriti Assessment Functions

- `savePrakritiAssessment(userId, answers)` - Save assessment answers
- `getPrakritiResult(userId)` - Get assessment results
- `getPrakritiHistory()` - Retrieve historical prakriti predictions
- `getDoshaHistory()` - Retrieve historical dosha predictions

#### Food & Nutrition Functions

- `logFood(entry)` - Log consumed food item
- `getUserFoodDiary(userId)` - Get user's food diary
- `getDailyNutrientLog(userId, date)` - Get daily nutrition stats

#### Meal Plan Functions

- `getMealPlan(userId)` - Get personalized meal plan
- `createMealPlan(userId, dosha)` - Generate meal plan for dosha type
- `updateMealPlan(userId, mealPlan)` - Update existing meal plan

#### Doctor Functions

- `listDoctors(page, limit)` - Get paginated doctor list
- `searchDoctors(query, sortBy, order)` - Search doctors by name/specialty
- `filterDoctors(specialty, minFee, maxFee)` - Filter doctors by criteria
- `getDoctorDetails(doctorId, date)` - Get doctor profile and available slots
- `getDoctorSlots(doctorId, date)` - Get available time slots
- `bookSlot(doctorId, slotId, notes)` - Book appointment
- `getMyBookings(status)` - Retrieve user's bookings
- `cancelBooking(bookingId)` - Cancel an appointment

#### Chat & Recommendations Functions

- `chatbotChat(dosha, message)` - Send message to diet chatbot
- `getDietarySuggestions(userId)` - Get personalized diet suggestions
- `getWellnessRecommendations(userId)` - Get wellness tips

#### Analytics Functions

- `getDailyAnalytics(userId, date)` - Get daily analytics
- `getWeeklyAnalytics(userId, weekStart)` - Get weekly analytics
- `getHealthTrackingLog(userId, date)` - Get health tracking logs

---

### 2. **Prakriti Service** (`app/services/prakritiService.ts`)

Handles Ayurvedic prakriti (constitutional type) assessment logic.

#### Key Functions

- `calculatePrakritiScore(answers)` - Calculate dosha scores from assessment answers
- `getPrakritiResult(answers)` - Get prakriti type and characteristics
- `getDoshaCharacteristics(dosha)` - Get characteristics for a specific dosha
- `getPrakritiRecommendations(dosha)` - Get dosha-specific recommendations
- `getDoshaFoods(dosha)` - Get recommended foods for dosha
- `getDoshaExercises(dosha)` - Get exercise recommendations
- `getRituRecommendations(dosha)` - Get seasonal recommendations

#### Dosha Types

- **Vata**: Air + Space (Light, Creative, Variable)
- **Pitta**: Fire + Water (Sharp, Intense, Driven)
- **Kapha**: Earth + Water (Stable, Strong, Calm)

---

### 3. **Analytics Service** (`app/services/analyticsService.ts`)

Provides health analytics and wellness insights.

#### Key Functions

- `saveHealthProfile(profile)` - Save user health profile
- `getHealthProfile(userId)` - Retrieve health profile
- `getDailyAnalytics(userId, date)` - Get daily nutrition analytics
- `getWeeklyAnalytics(userId)` - Get weekly health trends
- `calculateDoshaBalance(foods)` - Calculate dosha impact of consumed foods
- `mapActivityLevel(level)` - Map activity level values
- `mapSleepQuality(quality)` - Map sleep quality values
- `mapDigestiveHealth(health)` - Map digestive health values
- `mapStressLevel(stress)` - Map stress level values

#### Analytics Output Includes

- Calorie tracking (consumed vs. target)
- Macronutrient breakdown (protein, carbs, fat)
- Dosha balance metrics
- Health trend analysis
- Personalized wellness insights

---

### 4. **Meal Plan Service** (`app/services/mealPlanService.ts`)

Generates and manages dosha-specific meal plans.

#### Key Functions

- `getMealPlan(dosha)` - Get meal plan for dosha type
- `generateMealPlan(userId, dosha, preferences)` - Create personalized plan
- `getMealsByCategory(dosha, category)` - Get meals by type (breakfast, lunch, etc.)
- `getMealsByDosha(dosha)` - Get all meals for a dosha
- `addMealToLog(userId, meal)` - Log consumed meal
- `getSuggestedMeals(dosha, season)` - Get seasonal meal suggestions

#### Meal Categories

- **Breakfast**: Morning meals (e.g., warm oatmeal, congee)
- **Lunch**: Main meal (e.g., khichdi, grain bowls)
- **Dinner**: Evening meal (lighter than lunch)
- **Snacks**: Between-meal options

---

### 5. **Doctor Service** (`app/services/doctorService.ts`)

Manages doctor listings, search, and appointment booking.

#### Key Functions

- `listDoctors(page, limit)` - Paginated doctor list
- `searchDoctors(query, sortBy, order)` - Search by name, specialty, location
- `filterDoctors(specialty, minFee, maxFee)` - Filter by criteria
- `getDoctorDetails(doctorId, date)` - Get doctor profile and today's slots
- `getDoctorSlots(doctorId, date)` - Get available time slots for date
- `bookSlot(doctorId, slotId, notes)` - Book an appointment
- `getMyBookings(status)` - Get user's booking history
- `cancelBooking(bookingId)` - Cancel existing booking

#### Doctor Information

- Name, email, phone
- Specialty (Ayurveda, specific conditions)
- Qualifications and education
- Consultation fee
- Available time slots
- Ratings and reviews

---

### 6. **Food Recognition Service** (`app/services/foodRecognitionService.ts`)

Manages food database and recognition data.

#### Key Data

- Pre-defined food database with nutrition info
- Dosha impact for each food
- Serving sizes and units
- Recognition confidence scores
- Caloric and macronutrient values

#### Key Foods (15+ items)

- **Fruits**: Apple, mango, berries
- **Grains**: Rice, wheat, millet
- **Legumes**: Mung dal, moong, chick peas
- **Dairy**: Milk, ghee, yogurt
- **Spices**: Turmeric, ginger, cumin
- **Oils**: Coconut oil, sesame oil, ghee
- **Vegetables**: Leafy greens, root vegetables

---

### 7. **Dietary Suggestion Service** (`app/services/dietarySuggestionService.ts`)

Provides personalized dietary recommendations.

#### Key Functions

- `getDietarySuggestionsForDosha(dosha)` - Get dosha-specific tips
- `getSeasonalSuggestions(dosha, season)` - Seasonal recommendations
- `getDailySuggestion(userId)` - Get personalized daily suggestion
- `getAlternativeFoods(food)` - Get food substitutes
- `getTimingRecommendations(dosha)` - When to eat for each dosha
- `getDigestionTips(digestiveStrength)` - Digestion support tips

#### Suggestion Categories

- Food choices
- Eating timing and schedule
- Lifestyle habits
- Digestion support
- Seasonal adjustments

---

### 8. **Dashboard Service** (`app/services/dashboardService.ts`)

Provides dashboard data and wellness insights.

#### Key Functions

- `getDashboardData(userId)` - Get complete dashboard view
- `getPrakritiStatus(userId)` - Get dosha balance status
- `getDailyInsights(userId)` - Get daily wellness insights
- `getTrends(userId)` - Get health trend analytics
- `getMealsSummary(userId, date)` - Get daily meal summary
- `getCalorieStats(userId)` - Get calorie information

#### Dashboard Metrics

- Dosha balance status
- Meal tracking (breakfast, lunch, dinner, snacks)
- Calorie consumption vs. target
- Wellness insights and recommendations
- Health trends

---

### 9. **Custom Hooks** (`app/hooks/useApi.ts`)

Reusable React hooks for data fetching and state management.

#### Generic Hook

- `useAsync(asyncFunction, immediate)` - Generic async data fetching

#### Domain-Specific Hooks

- `useHealthProfile(userId)` - Fetch and manage health profile
- `useDoshaProfile(userId)` - Fetch and manage dosha profile
- `usePrakritiAssessment(userId)` - Manage prakriti assessment
- `useFoodDiary(userId)` - Manage food diary entries
- `useNutrientLog(userId, date)` - Get daily nutrition data
- `useHealthTracking(userId)` - Track health metrics
- `useMealPlan(userId)` - Get meal plan
- `useDoctorsList()` - Fetch doctors list
- `useDoctorDetails(doctorId)` - Get doctor information
- `useBookingsList(userId)` - Get user's bookings
- `useDietarySuggestions(userId)` - Get dietary suggestions
- `useWellnessProgress(userId)` - Track wellness progress
- `useDashboardData(userId)` - Get dashboard analytics

#### Hook Features

- Automatic data loading on mount
- Error handling
- Refetch capability
- Optimized re-renders

---

## 🔐 Authentication Context (`app/context/AuthContext.tsx`)

Manages user authentication state globally.

#### Key Functions

- `signIn(email, password)` - User login
- `signUp(email, username, password)` - User registration
- `signOut()` - User logout
- `restoreToken()` - Restore session on app launch
- `updateUser(user)` - Update user information

#### Auth State

- `user` - Current user object
- `token` - JWT authentication token
- `isLoading` - Loading state during auth operations
- `isSignout` - Logout flag
- `isSignup` - Signup flag

#### Storage

- Uses in-memory storage (can be replaced with AsyncStorage)
- Stores: auth token, user data, refresh token

---

## 📊 Data Types Overview

### User Types

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  createdAt: string;
}
```

### Dosha Types

```typescript
type DoeshaType = "vata" | "pitta" | "kapha";

interface DoshaScore {
  vata: number;
  pitta: number;
  kapha: number;
}
```

### Health Profile

```typescript
interface HealthProfile {
  id: string;
  userId: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "veryActive";
  dietaryPreferences: string[];
  allergies: string[];
  healthConditions: string[];
  sleepPattern: "early" | "moderate" | "late";
  digestiveStrength: "weak" | "moderate" | "strong";
  stressLevel: "low" | "moderate" | "high";
  createdAt: string;
  updatedAt: string;
}
```

### Food Tracking

```typescript
interface FoodEntry {
  id: string;
  userId: string;
  food: RecognizedFood;
  imageUrl: string;
  servingSize: number;
  servingUnit: string;
  timestamp: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

interface FoodAnalysis {
  nutrition: {
    servingEnergyKcal: number;
    servingProteinG: number;
    servingCarbsG: number;
    servingFatG: number;
  };
  doshaAnalysis: {
    isSuitable: boolean;
    impact: string;
    why: string;
  };
  healthImpact: {
    sleepEffect: string;
    stressEffect: string;
    activityImpact: string;
  };
  viruddhaAlert: {
    risk: boolean;
    reason: string;
  };
  ayurvedicRecommendation: string;
  bestTimeToConsume: string;
}
```

### Meal Plan

```typescript
interface MealPlan {
  id: string;
  userId: string;
  dosha: DoeshaType;
  meals: MealItem[];
  createdAt: string;
  validUntil: string;
}

interface MealItem {
  id: string;
  name: string;
  description: string;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  dosha: DoeshaType[];
  benefits: string[];
  cautions: string[];
  season: string[];
}
```

### Doctor & Booking

```typescript
interface Booking {
  id: string;
  userId: string;
  doctorId: string;
  slotId: string;
  status: "confirmed" | "cancelled" | "completed";
  notes?: string;
  createdAt: string;
  appointmentDate: string;
}
```

### Analytics

```typescript
interface DailyAnalytics {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  doshaBalance: DoshaScore;
  aggregatingFoods: string[];
  balancingFoods: string[];
}

interface WeeklyAnalytics {
  weekStart: string;
  weekEnd: string;
  averageCalories: number;
  doshaBalance: DoshaScore;
  mealConsistency: number;
  foodDiversity: number;
  suggestions: DietarySuggestion[];
}
```

---

## 🎯 Key Screens & Features

### Authentication Screens

- **Login** (`app/(auth)/login.tsx`) - User email/password login
- **Signup** (`app/(auth)/signup.tsx`) - New user registration

### Onboarding Flow

- **Prakriti Assessment** (`app/(app)/onboarding/prakriti-assessment.tsx`)
  - 10-question assessment form
  - Dosha-based questions about body, skin, digestion, sleep, temperament
  - Comprehensive body constitution evaluation

- **Prakriti Result** (`app/(app)/onboarding/prakriti-result.tsx`)
  - Shows primary and secondary dosha
  - Displays dosha characteristics
  - Provides dosha-specific recommendations

- **Meal Plan Setup** (`app/(app)/onboarding/meal-plan-setup.tsx`)
  - Initial meal plan customization
  - Food preference selection
  - Allergy and dietary restrictions

### Main App Screens (Tabs)

- **Home** (`food-tracking.tsx`)
  - Daily dosha status
  - Food image recognition and analysis
  - AI-powered Ayurvedic food insights
  - Nutrition tracking with dosha impact

- **Diet AI** (`dietAI.tsx`)
  - Chatbot for diet recommendations
  - Dosha-specific diet guidance
  - Interactive health advice

- **Food Tracking** (`food-tracking.tsx`)
  - Image capture and recognition
  - Food logging by meal type
  - Nutrition and dosha analysis
  - Daily consumption summary

- **Meal Plans** (`plans.tsx`)
  - Personalized meal recommendations
  - Dosha-specific meals
  - Seasonal meal suggestions
  - Shopping list generation

- **Doctor** (`doctor.tsx`)
  - Browse available doctors
  - Search and filter doctors
  - View doctor profiles
  - Book appointments
  - View booking history

- **Analytics** (`analytics.tsx`)
  - Weekly dosha balance trends
  - Nutrition analytics
  - Meal consistency metrics
  - Personalized insights
  - Health recommendations

- **Profile** (`profile.tsx`)
  - User profile information
  - Current prakriti/dosha display
  - Health profile details
  - Prakriti and dosha history
  - Settings and preferences

### Additional Screens

- **Dashboard** (`dashboard.tsx`) - Main wellness overview
- **Health Tracking** (`health-tracking.tsx`) - Daily health metrics
- **Prediction Result** (`prediction-result.tsx`) - Assessment results
- **Prakriti Details** (`prakriti-details.tsx`) - Dosha characteristics

---

## 🔌 External APIs

### Ayurvedic Food Analysis API

**Endpoint:** `http://54.226.87.3:8000/analyze`

**Method:** POST (multipart/form-data)

**Request:**

```
FormData {
  image: File (image of food)
  dosha: string (optional)
  user_id: string (optional)
}
```

**Response:**

```json
{
  "nutrition": {
    "servingEnergyKcal": 150,
    "servingProteinG": 5,
    "servingCarbsG": 30,
    "servingFatG": 2
  },
  "doshaAnalysis": {
    "isSuitable": true,
    "impact": "balancing",
    "why": "Description of impact"
  },
  "healthImpact": {
    "sleepEffect": "neutral",
    "stressEffect": "calming",
    "activityImpact": "energizing"
  },
  "viruddhaAlert": {
    "risk": false,
    "reason": "No incompatible combinations detected"
  },
  "ayurvedicRecommendation": "Best consumed warm with ghee",
  "bestTimeToConsume": "Lunch time for optimal digestion"
}
```

### Backend API

**Base URL:** `https://prakriti-api.onrender.com/api`

Major endpoint categories:

- `/auth/*` - Authentication (login, signup)
- `/users/*` - User management
- `/health-profile/*` - Health information
- `/prakriti/*` - Prakriti assessment
- `/doctors/*` - Doctor listings and appointments
- `/meals/*` - Meal plans and recommendations
- `/food-diary/*` - Food logging
- `/analytics/*` - Health analytics
- `/profile/predictions/*` - History tracking

---

## 📦 Dependencies

### Core

- `react: 19.1.0` - UI framework
- `react-native: 0.81.5` - Mobile framework
- `expo: ~54.0.33` - React Native toolkit
- `expo-router: ~6.0.23` - Navigation

### Navigation & UI

- `@react-navigation/*` - Navigation libraries
- `expo-blur` - Blur effect component
- `react-native-gesture-handler` - Gesture support
- `react-native-reanimated` - Animations
- `react-native-screens` - Screen optimization

### Media & Input

- `expo-image-picker` - Camera/gallery access
- `expo-image` - Image handling
- `react-native-audio-recorder-player` - Audio support
- `@react-native-picker/picker` - Picker component

### Styling

- `expo-linear-gradient` - Gradient backgrounds
- `tailwindcss` - Utility-first CSS
- `react-native-svg` - SVG support

### Development

- `typescript` - Type safety
- `eslint` - Code linting
- `expo lint` - Expo linting

---

## 🚀 Running the Project

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
cd Ayuoi
npm install
```

### Development

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

### Linting

```bash
npm run lint
```

---

## 🔐 Security Features

### Encryption

- PQC (Post-Quantum Cryptography) encryption utilities
- Data encryption for sensitive health information
- Secure storage of authentication tokens

### Authentication

- JWT token-based authentication
- Session management with token refresh
- Secure password storage

### API Security

- Bearer token authorization
- HTTPS communication
- Request validation and error handling

---

## 📝 Configuration Files

### `app.json`

Expo app configuration including:

- App name and slug
- iOS and Android settings
- Plugins and permissions
- Build configurations

### `tsconfig.json`

TypeScript compiler options:

- ES modules
- Strict type checking
- Path aliases for imports

### `tailwind.config.js`

Tailwind CSS customization:

- Custom colors
- Spacing and sizing
- Component presets

### `babel.config.js`

Babel transpiler configuration for React Native

---

## 📊 Data Flow Architecture

```
User Input
    ↓
Components (screens)
    ↓
Custom Hooks (useApi, etc.)
    ↓
Services (apiClient, businessLogic)
    ↓
Context/State (AuthContext, AppContext)
    ↓
Backend APIs
    ↓
Database
```

---

## 🧪 Testing & Validation

### TypeScript Validation

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Common Development Tasks

- Reset project: `npm run reset-project`
- Check TypeScript errors
- Validate props and types
- Test on multiple devices/emulators

---

## 🤝 Contributing

When adding new features:

1. **Add TypeScript Types** in `app/types/index.ts`
2. **Create Service Functions** in `app/services/`
3. **Create Custom Hooks** in `app/hooks/`
4. **Build UI Components** in `components/`
5. **Create Screens** in `app/(app)/` or `app/(app)/(tabs)/`
6. **Update Navigation** in `app/_layout.tsx` or `app/(app)/_layout.tsx`

---

## 📚 Ayurvedic Concepts

### The Three Doshas

1. **Vata** (Air + Space)
   - Characteristics: Light, creative, changeable
   - Balance: Warm, grounding foods; stable routines
   - Imbalance: Anxiety, dryness, irregular patterns

2. **Pitta** (Fire + Water)
   - Characteristics: Sharp, transformative, focused
   - Balance: Cooling foods; moderation in activity
   - Imbalance: Irritability, inflammation, perfectionism

3. **Kapha** (Earth + Water)
   - Characteristics: Stable, nurturing, grounded
   - Balance: Stimulating foods; regular movement
   - Imbalance: Heaviness, lethargy, attachment

### Food Properties

- **Rasa** (Taste): Sweet, sour, salty, pungent, bitter, astringent
- **Virya** (Potency): Heating or cooling
- **Vipaka** (Post-digestive effect): Sweet, sour, or pungent

### Seasons (Ritucharya)

- **Vata Season**: Fall/Early Winter (cold, dry)
- **Pitta Season**: Summer (hot)
- **Kapha Season**: Spring (wet, cool)

---

## 🎨 UI/UX Design

### Color Scheme

- **Background**: Warm cream (#FEFAF5)
- **Text**: Dark charcoal (#111827)
- **Accents**: Gold (#FCA5A5)
- **Dosha Vata**: Light blue/Gray
- **Dosha Pitta**: Orange/Yellow
- **Dosha Kapha**: Green

### Components Used

- Cards for content grouping
- Collapsible sections for detailed info
- Progress bars for metrics
- Modals for selections and confirmations
- Tabs for navigation

---

## 📖 Additional Documentation

- [PQC Setup Guide](PQC_SETUP.md)
- [PQC Documentation](PQC_DOCUMENTATION.md)
- [Doctor API Integration](DOCTOR_API_INTEGRATION.md)
- [Doctor API Quick Reference](DOCTOR_API_QUICK_REFERENCE.md)
- [Veda README](README-VEDA.md)
- [Frontend Implementation](FRONTEND_IMPLEMENTATION.md)

---

## 🐛 Troubleshooting

### Common Issues

**Issue: API Connection Failed**

- Check internet connectivity
- Verify API base URL in `apiClient.ts`
- Check authentication token validity

**Issue: Image Recognition Not Working**

- Verify camera permissions
- Check external API endpoint availability
- Ensure image file is valid

**Issue: Auth Token Expired**

- Token refresh should happen automatically
- Clear stored tokens and re-login if needed
- Check AsyncStorage implementation

**Issue: Build Errors**

- Run `npm install` to ensure all dependencies
- Clear cache: `expo start -c`
- Check Node.js compatibility

---

## 📞 Support

For issues or questions:

1. Check existing documentation files
2. Review code comments in service files
3. Check TypeScript types for expected data structures
4. Verify API responses match documented schemas

---

## 📄 License

© 2024 Ayurvedic Wellness - VEDA Project

---

## 🎯 Future Enhancements

- [ ] Video consultation with doctors
- [ ] Advanced wearable integration
- [ ] Machine learning for personalized recommendations
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Social features and community
- [ ] Advanced analytics dashboard
- [ ] Prescription management
- [ ] Remedy preparation guides
- [ ] Integration with health apps

---

**Last Updated:** February 2026  
**Project Version:** 1.0.0  
**Framework:** React Native with Expo  
**Language:** TypeScript

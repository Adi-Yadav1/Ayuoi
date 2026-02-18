# 🌿 Veda - Ayurvedic Diet Planning & Food Recognition App

A beautiful, intelligent, and user-friendly mobile application for Ayurvedic Diet Planning and AI-powered Food Recognition using React Native, TypeScript, and NativeWind (Tailwind CSS).

## 📱 Features

### Core Functionality

- **🧩 Prakriti Assessment**: Comprehensive health questionnaire to determine your Ayurvedic body constitution (Vata, Pitta, Kapha)
- **🍽️ Personalized Meal Plans**: AI-generated meal plans based on your Dosha with detailed nutrition and Ayurvedic benefits
- **📸 Food Image Recognition**: Capture or upload food images to analyze nutritional content and Dosha impact
- **📊 Health Analytics**: Daily and weekly tracking of calorie intake, nutrient distribution, and Dosha balance
- **💡 Smart Dietary Suggestions**: Real-time, AI-like recommendations tailored to your constitution
- **📈 Health Tracking**: Historical food intake, calorie trends, and Dosha balance visualization

### Design Philosophy

- **Modern & Minimal**: Clean, soothing interface inspired by wellness and Ayurveda
- **Soft Color Palette**: Earthy tones and warm colors for a premium experience
- **Smooth Animations**: Fluid transitions and intuitive interactions
- **Accessible**: Large touch targets and clear typography

## 🏗️ Architecture

### Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: Tailwind CSS via NativeWind
- **Navigation**: React Navigation (Stack & Tab)
- **Image Handling**: Expo Image Picker
- **State Management**: Context API
- **API Integration**: JSON-based REST APIs (Mocked)

### Project Structure

```
app/
├── (auth)/                      # Authentication flows
│   ├── login.tsx               # Login screen
│   └── signup.tsx              # Sign-up screen
├── (app)/                       # Main application
│   ├── onboarding/             # Onboarding flows
│   │   ├── health-profile.tsx  # Health profile collection
│   │   ├── prakriti-assessment.tsx
│   │   ├── prakriti-result.tsx # Prakriti results display
│   │   └── meal-plan-setup.tsx
│   └── (tabs)/                 # Tab navigation
│       ├── home.tsx            # Dashboard
│       ├── plans.tsx           # Meal plans
│       ├── food-tracking.tsx   # Food recognition
│       ├── analytics.tsx       # Analytics & insights
│       └── profile.tsx         # User profile
├── types/                       # TypeScript definitions
├── services/                    # API services & business logic
│   ├── prakritiService.ts
│   ├── mealPlanService.ts
│   ├── foodRecognitionService.ts
│   ├── dietarySuggestionService.ts
│   └── analyticsService.ts
├── config/                      # Configuration files
│   └── constants.ts
├── context/                     # React Context
│   └── AppContext.tsx
└── index.tsx                    # Splash screen
components/
├── ui/
│   └── Button.tsx              # Reusable UI components
├── Forms.tsx                   # Form inputs & controls
└── ...
assets/
└── images/
   └── (app icons and images)
```

## 🎨 UI Components

### Button Component
```typescript
<Button 
  title="Click Me"
  onPress={() => {}}
  variant="primary" | "secondary" | "outline"
  size="small" | "medium" | "large"
  disabled={false}
/>
```

### Card Component
```typescript
<Card>
  <Text>Card content</Text>
</Card>
```

### Form Components
- `TextInputField` - Text input with validation
- `SelectField` - Dropdown selection
- `RadioGroup` - Single selection
- `CheckboxGroup` - Multiple selections
- `Slider` - Range input

### Dosha Components
- `DoshaCard` - Display Dosha scores
- `ProgressBar` - Visual progress indication

## 🔄 Functional Workflows

### Authentication & Onboarding
1. Splash Screen (3 seconds)
2. Login/Signup
3. Health Profile Collection
4. Prakriti Assessment (12 questions)
5. Prakriti Results Display
6. Meal Plan Setup
7. Dashboard Access

### Food Recognition
1. Capture/Upload image
2. AI Analysis (simulated)
3. View nutrition facts
4. View Dosha impact
5. Log food entry
6. Track in history

### Meal Planning
1. View personalized meal plan
2. Filter by meal type (breakfast, lunch, dinner, snack)
3. View benefits and cautions
4. Generate new plan
5. Customize preferences

### Analytics & Tracking
1. View daily nutrition summary
2. Track Dosha balance
3. Monitor weekly trends
4. Get personalized suggestions
5. Historical trends visualization

## 🧵 Services & API Integration

All services are built with mocked data but follow REST API patterns:

### Prakriti Service
- `assessPrakriti(answers)` - Analyze assessment answers
- `getPrakritiResultAsync(userId)` - Fetch user's Prakriti

### Meal Plan Service
- `generateMealPlan(userId, dosha)` - Create personalized meal plan
- `getMealPlanAsync(userId)` - Fetch existing meal plan
- `getMealsByDosha(dosha)` - Get meals for specific Dosha

### Food Recognition Service
- `recognizeFoodFromImage(imageUri)` - Analyze food image
- `recordFoodEntry(...)` - Log food consumption
- `getUserFoodHistory(userId)` - Get food history

### Dietary Suggestion Service
- `getDietarySuggestions(dosha)` - Get all suggestions
- `getHighPrioritySuggestions(dosha)` - Get top recommendations

### Analytics Service
- `getDailyAnalytics(userId, date)` - Daily stats
- `getWeeklyAnalytics(userId, weekStart)` - Weekly stats
- `calculateDoshaBalance(foods)` - Compute Dosha impact

## 🎯 Key Features Deep Dive

### Prakriti Assessment
- 12 comprehensive questions covering physical, mental, and behavioral characteristics
- Rule-based scoring algorithm
- Normalized Vata-Pitta-Kapha distribution
- Determines primary and secondary Dosha
- Provides characteristics, recommendations, and feeding habits

### Meal Plans
- **Vata Meals**: Warm, grounding, nourishing foods (warm milk, khichdi, etc.)
- **Pitta Meals**: Cooling, light foods (salads, coconut rice, cooling herbs)
- **Kapha Meals**: Stimulating, light, warming foods (spiced lentils, light grains)
- Includes breakfast, lunch, dinner, and snacks
- Each meal has benefits, cautions, and seasonal guidance

### Food Recognition
- Mock AI recognition with confidence scores
- 10 common food items database
- Nutritional information (calories, protein, carbs, fat, fiber)
- Dosha impact scoring (aggravating vs. balancing)
- Serving size recommendations

### Analytics
- Daily calorie and nutrient tracking
- Dosha balance percentage visualization
- Weekly trends and consistency metrics
- Food diversity scoring
- Personalized suggestions based on Dosha

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# or
bun install

# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Build for Production

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 🎨 Color Palette

### Dosha Colors
- **Vata**: `#C8A882` (warm beige)
- **Pitta**: `#FF9E64` (warm orange)
- **Kapha**: `#66BB6A` (green)

### Primary Colors
- **Primary**: `#EE9B4D` (warm orange)
- **Secondary**: `#0EA5E9` (sky blue)
- **Accent**: `#D4AF85` (gold)

### Background
- **Light**: `#FEFAF5` (off-white)
- **Dark**: `#F5F1EA` (light gray)

## 📖 Ayurvedic Concepts

### The Three Doshas

**Vata (Space + Air)**
- Creative, quick-thinking, active
- Prone to anxiety, dry skin, light sleep
- Needs: Stability, warmth, routine

**Pitta (Fire + Water)**
- Sharp intellect, strong digestion, ambitious
- Tends toward irritability and heat
- Needs: Cooling, balance, moderation

**Kapha (Water + Earth)**
- Calm, stable, strong immune system
- Tends toward heaviness and sluggishness
- Needs: Stimulation, warmth, variety

## 🔐 Security & Privacy

- Uses context API for user state (scalable to Redux if needed)
- Mock authentication (integrate with real backend)
- Health data handling follows best practices
- No sensitive data stored locally in demo

## 📱 Responsive Design

- Optimized for mobile devices (portrait orientation)
- Tablet support ready
- Safe area handling for notches
- Flexible layouts using Tailwind

## 🎯 Demo Credentials

For testing purposes:
- **Email**: demo@example.com
- **Password**: demo123

## 🤝 Contributing

To contribute to Veda:

1. Create a feature branch
2. Make your changes
3. Follow TypeScript conventions
4. Test on both iOS and Android
5. Submit a pull request

## 📄 License

This project is developed for educational and wellness purposes.

## 🙏 Acknowledgments

- Based on Ayurvedic principles and holistic wellness
- Inspired by modern wellness applications
- Built with ❤️ for health-conscious users

## 📞 Support

For issues, suggestions, or contributions:
- Email: support@veda-app.com
- GitHub Issues: GitHub repository issues section

---

**Version**: 1.0.0  
**Last Updated**: February 2024  
**Status**: Production Ready ✨

// Dummy REST API Service for Dashboard
// In a production app, these would be real API endpoints

interface User {
  id: string;
  name: string;
  email: string;
  prakriti: string;
}

interface DashboardData {
  user: User;
  prakritiStatus: {
    primary: string;
    balance: 'balanced' | 'imbalanced' | 'moderately_balanced';
    description: string;
  };
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snacks: number;
  };
  calories: {
    consumed: number;
    target: number;
    percentage: number;
  };
  insights: string[];
  trends: {
    doshaBalance: string;
    calorieAverage: number;
  };
}

interface PrakritiScore {
  id: string;
  userId: string;
  vata: number;
  pitta: number;
  kapha: number;
  primaryDosha: string;
  date: string;
}

// Dummy data store
const predefinedInsights = {
  vata: [
    "Your Vata is slightly elevated. Include warm soups and grains to ground yourself.",
    "This morning's meditation score: 8/10. Continue this for mental clarity.",
    "Your sleep pattern matches well with Vata needs. Maintain consistent bedtime."
  ],
  pitta: [
    "Your Pitta needs cooling foods. Increase cucumber, coconut, and leafy greens.",
    "Stay hydrated - drink coconut water instead of caffeinated beverages today.",
    "Avoid spicy foods tonight to maintain digestive balance."
  ],
  kapha: [
    "Your Kapha is balanced. Light, warm meals will enhance your day.",
    "Morning movement routine is perfect for your constitution.",
    "Include ginger tea to stimulate digestion and metabolism."
  ]
};

const descriptions = {
  vata: 'Airy and light - benefit from warm, grounding foods and stable routines',
  pitta: 'Fiery and transformative - thrive with cooling, soothing foods and hydration',
  kapha: 'Earthy and stable - balance with warm, stimulating foods and movement'
};

// Simulated API calls
export const dashboardService = {
  // GET /api/dashboard - Main dashboard data
  async getDashboardData(userId: string = 'user_1'): Promise<DashboardData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const prakritiTypes = ['vata', 'pitta', 'kapha'];
        const prakritiType = Math.floor(Math.random() * 3);
        const prakriti = prakritiTypes[prakritiType];
        const consumed = Math.floor(Math.random() * (2200 - 1800 + 1)) + 1800;
        const target = 2500;

        resolve({
          user: {
            id: userId,
            name: 'Wellness Seeker',
            email: 'user@example.com',
            prakriti: prakriti,
          },
          prakritiStatus: {
            primary: prakriti,
            balance: ['balanced', 'imbalanced', 'moderately_balanced'][prakritiType] as any,
            description: descriptions[prakriti as keyof typeof descriptions],
          },
          meals: {
            breakfast: true,
            lunch: true,
            dinner: false,
            snacks: 2,
          },
          calories: {
            consumed: consumed,
            target: target,
            percentage: (consumed / target) * 100,
          },
          insights: (predefinedInsights[prakriti as keyof typeof predefinedInsights] || []).slice(0, 3),
          trends: {
            doshaBalance: `Your ${prakriti.charAt(0).toUpperCase() + prakriti.slice(1)} is in a healthy range`,
            calorieAverage: Math.floor(Math.random() * (2200 - 1900 + 1)) + 1900,
          },
        });
      }, 500);
    });
  },

  // GET /api/user/prakriti - Get user's prakriti assessment result
  async getUserPrakriti(userId: string = 'user_1'): Promise<PrakritiScore> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vata = Math.floor(Math.random() * 40) + 20;
        const pitta = Math.floor(Math.random() * 40) + 20;
        const kapha = 100 - vata - pitta;

        const scores = { vata, pitta, kapha };
        const maxKey = Object.keys(scores).reduce((a, b) => 
          scores[b as keyof typeof scores] > scores[a as keyof typeof scores] ? b : a
        );

        resolve({
          id: `prakriti_${userId}`,
          userId,
          vata,
          pitta,
          kapha,
          primaryDosha: maxKey,
          date: new Date().toISOString(),
        });
      }, 300);
    });
  },

  // GET /api/meals/today - Get today's meals
  async getTodaysMeals(userId: string = 'user_1'): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userId,
          date: new Date().toISOString().split('T')[0],
          meals: [
            { name: 'Breakfast', completed: true, time: '07:30', calories: 450 },
            { name: 'Mid-Morning Snack', completed: false, time: null, calories: 0 },
            { name: 'Lunch', completed: true, time: '12:45', calories: 650 },
            { name: 'Afternoon Snack', completed: true, time: '15:20', calories: 200 },
            { name: 'Dinner', completed: false, time: null, calories: 0 }
          ],
          totalConsumed: 1300,
          totalTarget: 2500
        });
      }, 400);
    });
  },

  // GET /api/wellness/insights - Get AI wellness insights
  async getWellnessInsights(userId: string = 'user_1'): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const prakritiTypes = Object.keys(predefinedInsights);
        const prakriti = prakritiTypes[Math.floor(Math.random() * prakritiTypes.length)];
        resolve(predefinedInsights[prakriti as keyof typeof predefinedInsights]);
      }, 300);
    });
  },

  // GET /api/calories/overview - Get calorie overview
  async getCalorieOverview(userId: string = 'user_1'): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const consumed = Math.floor(Math.random() * (2200 - 1800 + 1)) + 1800;
        resolve({
          userId,
          date: new Date().toISOString().split('T')[0],
          consumed,
          target: 2500,
          percentageOfTarget: (consumed / 2500) * 100,
          breakdown: {
            carbs: { value: Math.floor(consumed * 0.45), unit: 'g', target: 300 },
            protein: { value: Math.floor(consumed * 0.25), unit: 'g', target: 100 },
            fat: { value: Math.floor(consumed * 0.30), unit: 'g', target: 83 }
          }
        });
      }, 400);
    });
  },

  // GET /api/trends/weekly - Get weekly trends
  async getWeeklyTrends(userId: string = 'user_1'): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const calorieData = days.map(() => 
          Math.floor(Math.random() * (2200 - 1900 + 1)) + 1900
        );

        resolve({
          userId,
          week: 'current',
          dailyCalories: Object.fromEntries(
            days.map((day, idx) => [day, calorieData[idx]])
          ),
          averageCalories: Math.round(calorieData.reduce((a, b) => a + b) / days.length),
          doshaBalance: {
            vata: Math.floor(Math.random() * 30) + 15,
            pitta: Math.floor(Math.random() * 30) + 15,
            kapha: Math.floor(Math.random() * 30) + 15,
          }
        });
      }, 400);
    });
  },

  // POST /api/meals/log - Log a meal (for food tracking integration)
  async logMeal(userId: string, mealData: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `meal_${Date.now()}`,
          userId,
          ...mealData,
          timestamp: new Date().toISOString(),
          status: 'logged'
        });
      }, 500);
    });
  },

  // GET /api/recommendations - Get dosha-based recommendations
  async getRecommendations(userId: string = 'user_1', prakriti: string = 'vata'): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recommendations = {
          vata: {
            foods: ['warm grains', 'root vegetables', 'warming spices', 'sesame oil'],
            avoid: ['cold foods', 'raw vegetables', 'caffeine'],
            timeOfDay: 'Eat warm meals at consistent times',
            hydration: 'Drink warm herbal teas with ginger'
          },
          pitta: {
            foods: ['cooling vegetables', 'coconut', 'ghee', 'mint'],
            avoid: ['spicy foods', 'hot beverages', 'excessive salt'],
            timeOfDay: 'Medium meals at moderate intervals',
            hydration: 'Drink coconut water and cool herbal teas'
          },
          kapha: {
            foods: ['light foods', 'stimulating spices', 'warm grains', 'legumes'],
            avoid: ['heavy foods', 'dairy', 'processed foods'],
            timeOfDay: 'Light breakfast, main lunch, light dinner',
            hydration: 'Drink warm water with lemon and ginger'
          }
        };

        resolve({
          userId,
          prakriti,
          recommendations: recommendations[prakriti as keyof typeof recommendations] || recommendations.vata
        });
      }, 300);
    });
  }
};

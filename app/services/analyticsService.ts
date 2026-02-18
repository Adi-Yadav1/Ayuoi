import { HealthProfile, DailyAnalytics, WeeklyAnalytics, DoshaScore } from '@/app/types';

export const saveHealthProfile = async (profile: Partial<HealthProfile>): Promise<HealthProfile> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId: 'user_1',
    age: profile.age || 30,
    weight: profile.weight || 70,
    height: profile.height || 170,
    activityLevel: profile.activityLevel || 'moderate',
    dietaryPreferences: profile.dietaryPreferences || [],
    allergies: profile.allergies || [],
    healthConditions: profile.healthConditions || [],
    sleepPattern: profile.sleepPattern || 'moderate',
    digestiveStrength: profile.digestiveStrength || 'moderate',
    stressLevel: profile.stressLevel || 'moderate',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const getHealthProfile = async (userId: string): Promise<HealthProfile | null> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    id: 'hp_1',
    userId,
    age: 32,
    weight: 72,
    height: 175,
    activityLevel: 'moderate',
    dietaryPreferences: ['vegetarian'],
    allergies: [],
    healthConditions: ['occasional indigestion'],
    sleepPattern: 'moderate',
    digestiveStrength: 'moderate',
    stressLevel: 'moderate',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const getDailyAnalytics = async (userId: string, date: string): Promise<DailyAnalytics> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    date,
    totalCalories: 2100,
    totalProtein: 75,
    totalCarbs: 280,
    totalFat: 70,
    doshaBalance: { vata: 30, pitta: 50, kapha: 20 },
    aggregatingFoods: ['Spicy curry', 'Hot peppers'],
    balancingFoods: ['Rice', 'Coconut oil', 'Coriander']
  };
};

export const getWeeklyAnalytics = async (userId: string, weekStart: string): Promise<WeeklyAnalytics> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const weekEnd = new Date(new Date(weekStart).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return {
    weekStart: weekStart.split('T')[0],
    weekEnd,
    averageCalories: 2050,
    doshaBalance: { vata: 28, pitta: 52, kapha: 20 },
    mealConsistency: 0.85,
    foodDiversity: 0.78,
    suggestions: [
      {
        id: '1',
        title: 'Increase Cooling Foods',
        description: 'Your Pitta is elevated this week. Include more cooling foods.',
        dosha: 'pitta',
        category: 'food',
        priority: 'medium',
        actionableSteps: ['Add more salads', 'Use coconut oil'],
        alternatives: ['Cooling herbs', 'Water-rich fruits']
      }
    ]
  };
};

export const calculateDoshaBalance = (foods: any[]): DoshaScore => {
  let balance: DoshaScore = { vata: 0, pitta: 0, kapha: 0 };
  
  foods.forEach(food => {
    if (food.dosha) {
      balance.vata += food.dosha.vata;
      balance.pitta += food.dosha.pitta;
      balance.kapha += food.dosha.kapha;
    }
  });
  
  // Normalize
  const total = Math.abs(balance.vata) + Math.abs(balance.pitta) + Math.abs(balance.kapha);
  if (total > 0) {
    balance.vata = Math.round((balance.vata / total) * 100);
    balance.pitta = Math.round((balance.pitta / total) * 100);
    balance.kapha = Math.round((balance.kapha / total) * 100);
  }
  
  return balance;
};

export const generatePersonalizedAnalytics = async (
  userId: string,
  userDosha: string
): Promise<{ daily: DailyAnalytics; weekly: WeeklyAnalytics }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const today = new Date().toISOString().split('T')[0];
  const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return {
    daily: await getDailyAnalytics(userId, today),
    weekly: await getWeeklyAnalytics(userId, weekStart)
  };
};

import { RecognizedFood, FoodEntry } from '@/app/types';

const recognizedFoods: RecognizedFood[] = [
  {
    id: '1',
    name: 'Apple',
    category: 'Fruit',
    confidence: 0.98,
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    dosha: { vata: 5, pitta: -3, kapha: -2 },
    doshaImpact: { vata: 'balancing', pitta: 'aggravating', kapha: 'aggravating' },
    servingSize: '1 medium',
    servingUnit: 'g'
  },
  {
    id: '2',
    name: 'Rice',
    category: 'Grain',
    confidence: 0.99,
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    dosha: { vata: -3, pitta: -2, kapha: 2 },
    doshaImpact: { vata: 'balancing', pitta: 'balancing', kapha: 'aggravating' },
    servingSize: '1 cup cooked',
    servingUnit: 'g'
  },
  {
    id: '3',
    name: 'Mung Dal',
    category: 'Legume',
    confidence: 0.97,
    calories: 95,
    protein: 9.6,
    carbs: 17,
    fat: 0.4,
    fiber: 6.4,
    dosha: { vata: -2, pitta: -2, kapha: -3 },
    doshaImpact: { vata: 'balancing', pitta: 'balancing', kapha: 'balancing' },
    servingSize: '1 cup cooked',
    servingUnit: 'g'
  },
  {
    id: '4',
    name: 'Ghee',
    category: 'Fat',
    confidence: 0.96,
    calories: 112,
    protein: 0,
    carbs: 0,
    fat: 12.7,
    fiber: 0,
    dosha: { vata: -4, pitta: -2, kapha: 3 },
    doshaImpact: { vata: 'balancing', pitta: 'balancing', kapha: 'aggravating' },
    servingSize: '1 tbsp',
    servingUnit: 'g'
  },
  {
    id: '5',
    name: 'Ginger',
    category: 'Spice',
    confidence: 0.95,
    calories: 80,
    protein: 1.8,
    carbs: 18,
    fat: 0.8,
    fiber: 2.4,
    dosha: { vata: -3, pitta: 4, kapha: -4 },
    doshaImpact: { vata: 'balancing', pitta: 'aggravating', kapha: 'balancing' },
    servingSize: '1 tsp',
    servingUnit: 'g'
  },
  {
    id: '6',
    name: 'Green Salad',
    category: 'Vegetable',
    confidence: 0.94,
    calories: 15,
    protein: 1,
    carbs: 3,
    fat: 0.1,
    fiber: 0.6,
    dosha: { vata: 2, pitta: -3, kapha: -2 },
    doshaImpact: { vata: 'aggravating', pitta: 'balancing', kapha: 'balancing' },
    servingSize: '1 cup',
    servingUnit: 'g'
  },
  {
    id: '7',
    name: 'Turmeric',
    category: 'Spice',
    confidence: 0.96,
    calories: 312,
    protein: 9.7,
    carbs: 67.1,
    fat: 3.2,
    fiber: 21,
    dosha: { vata: -2, pitta: 2, kapha: -3 },
    doshaImpact: { vata: 'balancing', pitta: 'aggravating', kapha: 'balancing' },
    servingSize: '1 tsp',
    servingUnit: 'g'
  },
  {
    id: '8',
    name: 'Milk',
    category: 'Dairy',
    confidence: 0.98,
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    fiber: 0,
    dosha: { vata: -2, pitta: -1, kapha: 3 },
    doshaImpact: { vata: 'balancing', pitta: 'balancing', kapha: 'aggravating' },
    servingSize: '1 cup',
    servingUnit: 'ml'
  },
  {
    id: '9',
    name: 'Coconut Oil',
    category: 'Oil',
    confidence: 0.97,
    calories: 892,
    protein: 0,
    carbs: 0,
    fat: 99.1,
    fiber: 0,
    dosha: { vata: 1, pitta: -5, kapha: 2 },
    doshaImpact: { vata: 'aggravating', pitta: 'balancing', kapha: 'aggravating' },
    servingSize: '1 tbsp',
    servingUnit: 'g'
  },
  {
    id: '10',
    name: 'Honey',
    category: 'Sweetener',
    confidence: 0.98,
    calories: 64,
    protein: 0.3,
    carbs: 17.3,
    fat: 0,
    fiber: 0.2,
    dosha: { vata: -1, pitta: 1, kapha: -4 },
    doshaImpact: { vata: 'balancing', pitta: 'balancing', kapha: 'balancing' },
    servingSize: '1 tbsp',
    servingUnit: 'g'
  }
];

export const recognizeFoodFromImage = async (imageUri: string): Promise<RecognizedFood> => {
  // Simulate computer vision API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock: randomly select a recognized food
  const randomFood = recognizedFoods[Math.floor(Math.random() * recognizedFoods.length)];
  return {
    ...randomFood,
    confidence: 0.85 + Math.random() * 0.14 // Between 0.85 and 0.99
  };
};

export const getRecognizedFoods = (): RecognizedFood[] => {
  return recognizedFoods;
};

export const getFoodById = (id: string): RecognizedFood | undefined => {
  return recognizedFoods.find(food => food.id === id);
};

export const recordFoodEntry = async (
  userId: string,
  food: RecognizedFood,
  imageUrl: string,
  servingSize: number,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
): Promise<FoodEntry> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    food,
    imageUrl,
    servingSize,
    servingUnit: food.servingUnit,
    timestamp: new Date().toISOString(),
    mealType
  };
};

export const getUserFoodHistory = async (userId: string): Promise<FoodEntry[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return mock food history
  return [
    {
      id: '1',
      userId,
      food: recognizedFoods[0],
      imageUrl: 'https://via.placeholder.com/300',
      servingSize: 1,
      servingUnit: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      mealType: 'breakfast'
    },
    {
      id: '2',
      userId,
      food: recognizedFoods[2],
      imageUrl: 'https://via.placeholder.com/300',
      servingSize: 1,
      servingUnit: 'cup',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      mealType: 'lunch'
    }
  ];
};

export const getSuggestionsForFood = async (food: RecognizedFood, userDosha: string): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const suggestions: { [key: string]: string[] } = {
    vata: [
      'This food is ${impact} for your Vata dosha. Consider pairing with warming spices like ginger or cinnamon.',
      'Eat this food in moderate portions to maintain Vata balance.',
      'Combine with grounding foods like rice or root vegetables.'
    ],
    pitta: [
      'This cooling food is excellent for balancing your Pitta dosha.',
      'Enjoy this with cooling herbs like cilantro or mint.',
      'Perfect for warm seasons when your Pitta tends to aggravate.'
    ],
    kapha: [
      'This stimulating food helps activate your sluggish Kapha digestion.',
      'Combine with warming spices to maximize metabolic benefits.',
      'Eat in smaller portions to prevent heaviness.'
    ]
  };
  
  return suggestions[userDosha] || suggestions.pitta;
};

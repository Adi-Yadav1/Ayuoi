import { MealPlan, MealItem, DoeshaType } from '@/app/types';

const mealItems: { [key in DoeshaType]: MealItem[] } = {
  vata: [
    {
      id: '1',
      name: 'Warm Oatmeal with Ghee',
      description: 'Grounding breakfast with sesame seeds and warming spices',
      category: 'breakfast',
      dosha: ['vata'],
      benefits: ['Balances Vata', 'Provides sustained energy', 'Warms digestion'],
      cautions: ['Avoid if very hot', 'Keep portions moderate'],
      season: ['fall', 'winter', 'early-spring']
    },
    {
      id: '2',
      name: 'Warm Rice and Mung Dal Khichdi',
      description: 'Easily digestible comfort food with warming spices',
      category: 'lunch',
      dosha: ['vata'],
      benefits: ['Perfect for digestion', 'Deeply nourishing', 'Calming to nervous system'],
      cautions: ['Add salt according to taste', 'Best fresh'],
      season: ['all']
    },
    {
      id: '3',
      name: 'Creamy Vegetable Soup',
      description: 'Warming soup with root vegetables and healthy fats',
      category: 'lunch',
      dosha: ['vata'],
      benefits: ['Easy to digest', 'Warming', 'Provides comfort'],
      cautions: ['Avoid too cold', 'Include healthy oils'],
      season: ['fall', 'winter']
    },
    {
      id: '4',
      name: 'Warm Milk with Spices',
      description: 'Golden milk with turmeric, ginger, and cinnamon',
      category: 'dinner',
      dosha: ['vata'],
      benefits: ['Promotes sleep', 'Calming', 'Anti-inflammatory'],
      cautions: ['Drink warm, not hot', 'Before bedtime'],
      season: ['all']
    },
    {
      id: '5',
      name: 'Sesame Seed Balls',
      description: 'Nutritious snack with sesame, dates, and ghee',
      category: 'snack',
      dosha: ['vata'],
      benefits: ['Energy boost', 'Grounding', 'Nourishing'],
      cautions: ['Consume in moderation', 'Good for afternoon snack'],
      season: ['all']
    }
  ],
  pitta: [
    {
      id: '6',
      name: 'Coconut Rice Porridge',
      description: 'Cooling breakfast with fresh coconut and cooling spices',
      category: 'breakfast',
      dosha: ['pitta'],
      benefits: ['Cooling to pitta', 'Light digestion', 'Refreshing'],
      cautions: ['Avoid heating spices', 'Fresh ingredients recommended'],
      season: ['spring', 'summer']
    },
    {
      id: '7',
      name: 'Quinoa and Vegetable Salad',
      description: 'Light salad with cooling herbs and coconut oil dressing',
      category: 'lunch',
      dosha: ['pitta'],
      benefits: ['Cooling', 'Light on digestion', 'Satisfying'],
      cautions: ['Use cooling oil', 'Avoid very spicy'],
      season: ['spring', 'summer']
    },
    {
      id: '8',
      name: 'Barley and Asparagus Dish',
      description: 'Light grains with cooling vegetables',
      category: 'lunch',
      dosha: ['pitta'],
      benefits: ['Cooling', 'Hydrating', 'Detoxifying'],
      cautions: ['Lightly seasoned', 'Fresh vegetables'],
      season: ['spring', 'summer']
    },
    {
      id: '9',
      name: 'Cucumber and Melon Water',
      description: 'Hydrating drink with cooling herbs',
      category: 'dinner',
      dosha: ['pitta'],
      benefits: ['Ultra-cooling', 'Hydrating', 'Sleep promoting'],
      cautions: ['Drink at room temperature', 'Fresh preparation'],
      season: ['summer']
    },
    {
      id: '10',
      name: 'Coconut Date Energy Balls',
      description: 'Sweet snack with coconut and cooling properties',
      category: 'snack',
      dosha: ['pitta'],
      benefits: ['Gentle energy', 'Cooling', 'Satisfying'],
      cautions: ['Moderate portions', 'Avoid late evening'],
      season: ['all']
    }
  ],
  kapha: [
    {
      id: '11',
      name: 'Spiced Millet Porridge',
      description: 'Warming breakfast with stimulating spices',
      category: 'breakfast',
      dosha: ['kapha'],
      benefits: ['Stimulates digestion', 'Warming', 'Energizing'],
      cautions: ['Include warming spices', 'Don\'t oversleep after'],
      season: ['winter', 'spring']
    },
    {
      id: '12',
      name: 'Lentil and Spinach Curry',
      description: 'Stimulating lunch with warming spices and legumes',
      category: 'lunch',
      dosha: ['kapha'],
      benefits: ['Stimulates metabolism', 'Warming', 'Light on stomach'],
      cautions: ['Include mustard oil', 'Add heating spices'],
      season: ['fall', 'winter']
    },
    {
      id: '13',
      name: 'Vegetable Stir-fry',
      description: 'Light, stimulating vegetables with warming seasonings',
      category: 'lunch',
      dosha: ['kapha'],
      benefits: ['Energizing', 'Metabolic boost', 'Variety of nutrients'],
      cautions: ['Use mustard oil', 'Minimal oil overall'],
      season: ['all']
    },
    {
      id: '14',
      name: 'Ginger and Honey Tea',
      description: 'Warming tea with immune-boosting properties',
      category: 'dinner',
      dosha: ['kapha'],
      benefits: ['Stimulates digestion', 'Warming', 'Cleansing'],
      cautions: ['Hot temperature', 'Before or with light meal'],
      season: ['fall', 'winter']
    },
    {
      id: '15',
      name: 'Spiced Roasted Chickpeas',
      description: 'Crunchy snack with warming spices',
      category: 'snack',
      dosha: ['kapha'],
      benefits: ['Energizing', 'Metabolic stimulation', 'Satisfying'],
      cautions: ['Moderate portions', 'With hot beverage'],
      season: ['all']
    }
  ]
};

export const generateMealPlan = async (userId: string, dosha: DoeshaType): Promise<MealPlan> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const meals = mealItems[dosha];
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    dosha,
    meals,
    createdAt: new Date().toISOString(),
    validUntil: validUntil.toISOString()
  };
};

export const getMealPlanAsync = async (userId: string): Promise<MealPlan | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: 'plan_1',
    userId,
    dosha: 'pitta',
    meals: mealItems.pitta,
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };
};

export const getMealsByDosha = (dosha: DoeshaType): MealItem[] => {
  return mealItems[dosha];
};

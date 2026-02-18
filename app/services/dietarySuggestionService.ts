import { DietarySuggestion, DoeshaType } from '@/app/types';

const dietarySuggestions: { [key in DoeshaType]: DietarySuggestion[] } = {
  vata: [
    {
      id: '1',
      title: 'Establish Regular Eating Schedule',
      description: 'Vata benefits greatly from consistency. Eating at the same times daily helps stabilize digestion and energy.',
      dosha: 'vata',
      category: 'timing',
      priority: 'high',
      actionableSteps: [
        'Set breakfast time between 7-9 AM',
        'Lunch between 12-1 PM (largest meal)',
        'Dinner between 6-7 PM (smaller portion)',
        'Avoid skipping meals'
      ],
      alternatives: [
        'Use phone reminders for meal times',
        'Meal prep on weekends for consistency'
      ]
    },
    {
      id: '2',
      title: 'Include Warm Oils Daily',
      description: 'Sesame, almond, and vitamin E oils nourish the dry Vata constitution and improve skin health.',
      dosha: 'vata',
      category: 'food',
      priority: 'high',
      actionableSteps: [
        'Add 1 tbsp ghee or sesame oil to breakfast',
        'Use oils in cooking for lunch and dinner',
        'Try oil massage (abhyanga) 3-4 times weekly'
      ],
      alternatives: [
        'Coconut oil for summer',
        'Almond oil for skin health'
      ]
    },
    {
      id: '3',
      title: 'Favor Warm Foods and Beverages',
      description: 'Warm foods are easier for Vata digestion. Avoid raw foods, especially during winter.',
      dosha: 'vata',
      category: 'food',
      priority: 'high',
      actionableSteps: [
        'Cook vegetables until soft',
        'Drink warm water, tea, or soups',
        'Avoid excessive salads and raw fruits',
        'Choose warm spices: ginger, cinnamon, cardamom'
      ],
      alternatives: [
        'Lightly steamed vegetables',
        'Room temperature ghee with warm meals'
      ]
    },
    {
      id: '4',
      title: 'Reduce Excessive Activity',
      description: 'Vata people often overcommit. Rest is medicine for Vata. Aim for 8 hours of sleep.',
      dosha: 'vata',
      category: 'lifestyle',
      priority: 'high',
      actionableSteps: [
        'Go to bed by 10 PM daily',
        'Wake up between 6-7 AM',
        'Include 10-15 min meditation daily',
        'Practice gentle yoga 3-4 times weekly'
      ],
      alternatives: [
        'Tai chi for movement',
        'Restorative yoga for relaxation'
      ]
    },
    {
      id: '5',
      title: 'Simple Digestion Support',
      description: 'These practices strengthen your weak digestive fire safely.',
      dosha: 'vata',
      category: 'digestion',
      priority: 'medium',
      actionableSteps: [
        'Sip warm ginger water before meals',
        'Chew food thoroughly (20-30 chews)',
        'Avoid water with meals; drink 30 min after',
        'After meals, practice gentle walking'
      ],
      alternatives: [
        'Digestive chai instead of ginger water',
        'Fennel water for bloating'
      ]
    }
  ],
  pitta: [
    {
      id: '6',
      title: 'Embrace Cooling Principles',
      description: 'Cooling foods, habits, and environment are essential for balanced Pitta.',
      dosha: 'pitta',
      category: 'food',
      priority: 'high',
      actionableSteps: [
        'Favor bitter and sweet tastes',
        'Use cooling coconut or sunflower oil',
        'Eat salads with cooling greens',
        'Include water-rich fruits (melon, cucumber)'
      ],
      alternatives: [
        'Room temperature beverages',
        'Cooling herbs: cilantro, mint, brahmi'
      ]
    },
    {
      id: '7',
      title: 'Moderate Your Intensity',
      description: 'Pitta\'s perfectionism can lead to burnout. Balance is key.',
      dosha: 'pitta',
      category: 'lifestyle',
      priority: 'high',
      actionableSteps: [
        'Take short breaks every hour',
        'Practice meditation 10-15 min daily',
        'Limit competitive activities',
        'Find time for relaxing hobbies'
      ],
      alternatives: [
        'Swimming for cooling exercise',
        'Moonlight walks instead of sun exposure'
      ]
    },
    {
      id: '8',
      title: 'Avoid Heating Spices',
      description: 'Red chili, garlic, and salt aggravate Pitta. Choose milder alternatives.',
      dosha: 'pitta',
      category: 'food',
      priority: 'high',
      actionableSteps: [
        'Reduce salt intake gradually',
        'Replace chili with milder seasonings',
        'Use cooling spices: cumin, coriander, fennel',
        'Limit sour and fermented foods'
      ],
      alternatives: [
        'Black pepper in moderation',
        'Fresh herbs for flavor'
      ]
    },
    {
      id: '9',
      title: 'Protect Your Liver',
      description: 'Pitta governs liver health. Support it with cooling, bitter foods.',
      dosha: 'pitta',
      category: 'food',
      priority: 'medium',
      actionableSteps: [
        'Include bitter greens: kale, spinach',
        'Liver-supportive foods: beets, carrots',
        'Avoid fried foods and excess oil',
        'Limit alcohol and caffeine'
      ],
      alternatives: [
        'Green vegetable juices',
        'Herbal teas: chamomile, brahmi'
      ]
    },
    {
      id: '10',
      title: 'Cool Your Digestion',
      description: 'Support your strong digestive fire without overheating.',
      dosha: 'pitta',
      category: 'digestion',
      priority: 'medium',
      actionableSteps: [
        'Sip cool water throughout the day',
        'Enjoy cooling lassi after meals',
        'Avoid very hot spices',
        'Bitter herbs improve digestion balance'
      ],
      alternatives: [
        'Coconut water for hydration',
        'Mint water throughout the day'
      ]
    }
  ],
  kapha: [
    {
      id: '11',
      title: 'Stimulate Your Metabolism',
      description: 'Warming spices and stimulating foods awaken sluggish Kapha.',
      dosha: 'kapha',
      category: 'food',
      priority: 'high',
      actionableSteps: [
        'Liberally use warming spices: ginger, black pepper',
        'Include pungent flavors: garlic, onion',
        'Choose mustard oil for cooking',
        'Add cayenne pepper cautiously'
      ],
      alternatives: [
        'Warming herbal teas',
        'Spiced warm water daily'
      ]
    },
    {
      id: '12',
      title: 'Move More, Eat Less',
      description: 'Exercise is medicine for Kapha. Regular activity prevents stagnation.',
      dosha: 'kapha',
      category: 'lifestyle',
      priority: 'high',
      actionableSteps: [
        'Exercise 60 min daily (vigorous preferred)',
        'Morning yoga to awaken digestion',
        'Running, dancing, or sports ideal',
        'Vary your routine to stay engaged'
      ],
      alternatives: [
        'Brisk walking in fresh air',
        'Cycling or swimming'
      ]
    },
    {
      id: '13',
      title: 'Eat Light and Dry Foods',
      description: 'Heavy, oily, sweet foods aggravate Kapha. Choose lighter options.',
      dosha: 'kapha',
      category: 'food',
      priority: 'high',
      actionableSteps: [
        'Smaller, lighter portions',
        'Eat until 70% full only',
        'Choose light grains: millet, barley',
        'Minimize oil and dairy'
      ],
      alternatives: [
        'Air-popped grains instead of cooked',
        'Herbal teas instead of milk-based drinks'
      ]
    },
    {
      id: '14',
      title: 'Reduce Heavy Foods',
      description: 'Wheat, dairy, and sweet foods create heaviness. Be strategic.',
      dosha: 'kapha',
      category: 'food',
      priority: 'high',
      actionableSteps: [
        'Limit bread and wheat products',
        'Reduce dairy to occasional use',
        'Avoid very sweet desserts',
        'Choose legumes over heavier proteins'
      ],
      alternatives: [
        'Sprouted grains lighter than cooked',
        'Almond milk instead of cow milk'
      ]
    },
    {
      id: '15',
      title: 'Awaken Your Digestion',
      description: 'Stimulate your digestive fire with warming practices.',
      dosha: 'kapha',
      category: 'digestion',
      priority: 'medium',
      actionableSteps: [
        'Drink warm ginger tea before meals',
        'Bitter and pungent foods aid digestion',
        'Eat at midday when digestion peaks',
        'Chew well and avoid snacking'
      ],
      alternatives: [
        'Lemon water with cayenne upon waking',
        'Digestive spice blends'
      ]
    }
  ]
};

export const getDietarySuggestions = async (dosha: DoeshaType): Promise<DietarySuggestion[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  return dietarySuggestions[dosha];
};

export const getDietarySuggestionById = (id: string): DietarySuggestion | undefined => {
  for (const doshaKey in dietarySuggestions) {
    const suggestion = dietarySuggestions[doshaKey as DoeshaType].find(s => s.id === id);
    if (suggestion) return suggestion;
  }
  return undefined;
};

export const getHighPrioritySuggestions = async (dosha: DoeshaType): Promise<DietarySuggestion[]> => {
  const suggestions = await getDietarySuggestions(dosha);
  return suggestions.filter(s => s.priority === 'high').slice(0, 3);
};

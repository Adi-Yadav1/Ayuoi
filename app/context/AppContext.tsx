import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, PrakritiResult, MealPlan } from '@/app/types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  prakriti: PrakritiResult | null;
  setPrakriti: (prakriti: PrakritiResult | null) => void;
  mealPlan: MealPlan | null;
  setMealPlan: (mealPlan: MealPlan | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [prakriti, setPrakriti] = useState<PrakritiResult | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  const isAuthenticated = !!user;

  const logout = () => {
    setUser(null);
    setPrakriti(null);
    setMealPlan(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        prakriti,
        setPrakriti,
        mealPlan,
        setMealPlan,
        isAuthenticated,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

/**
 * Custom React hooks for data fetching and state management
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/app/services/apiClient';
import {
  HealthProfile,
  DoshaProfile,
  PrakritiAssessment,
  UserFoodDiary,
  DailyNutrientLog,
  HealthTrackingLog,
  Recommendation,
  WellnessProgress,
} from '@/app/types/schema';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// ──────────────────────────────────────────────
// GENERIC ASYNC HOOK
// ──────────────────────────────────────────────

export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
) => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
};

// ──────────────────────────────────────────────
// HEALTH PROFILE HOOK
// ──────────────────────────────────────────────

export const useHealthProfile = (userId: string | null) => {
  const { data, loading, error, execute } = useAsync<HealthProfile>(
    () => (userId ? apiClient.getHealthProfile(userId) : Promise.reject('No userId')),
    !!userId,
  );

  const updateHealthProfile = useCallback(
    async (updates: Partial<HealthProfile>) => {
      if (!userId) throw new Error('No userId');
      return apiClient.updateHealthProfile(userId, updates);
    },
    [userId],
  );

  return {
    healthProfile: data,
    loading,
    error,
    refetch: execute,
    updateHealthProfile,
  };
};

// ──────────────────────────────────────────────
// DOSHA PROFILE HOOK
// ──────────────────────────────────────────────

export const useDoshaProfile = (userId: string | null) => {
  const { data, loading, error, execute } = useAsync<DoshaProfile>(
    () => (userId ? apiClient.getDoshaProfile(userId) : Promise.reject('No userId')),
    !!userId,
  );

  return {
    doshaProfile: data,
    loading,
    error,
    refetch: execute,
  };
};

// ──────────────────────────────────────────────
// PRAKRITI ASSESSMENT HOOK
// ──────────────────────────────────────────────

export const usePrakritiAssessments = (userId: string | null) => {
  const { data, loading, error, execute } = useAsync<PrakritiAssessment[]>(
    () => (userId ? apiClient.getPrakritiAssessments(userId) : Promise.reject('No userId')),
    !!userId,
  );

  const createAssessment = useCallback(
    async (assessmentType: string) => {
      if (!userId) throw new Error('No userId');
      return apiClient.createPrakritiAssessment(userId, assessmentType);
    },
    [userId],
  );

  return {
    assessments: data || [],
    loading,
    error,
    refetch: execute,
    createAssessment,
  };
};

// ──────────────────────────────────────────────
// FOOD DIARY HOOK
// ──────────────────────────────────────────────

export const useFoodDiary = (userId: string | null, date: string) => {
  const { data, loading, error, execute } = useAsync<UserFoodDiary[]>(
    () =>
      userId && date
        ? apiClient.getUserFoodDiary(userId, date)
        : Promise.reject('Missing userId or date'),
    !!userId && !!date,
  );

  const addEntry = useCallback(
    async (entry: Partial<UserFoodDiary>) => {
      if (!userId) throw new Error('No userId');
      const newEntry = await apiClient.addFoodDiaryEntry(userId, entry);
      // Re-fetch after adding
      execute();
      return newEntry;
    },
    [userId, execute],
  );

  const deleteEntry = useCallback(
    async (entryId: string) => {
      if (!userId) throw new Error('No userId');
      await apiClient.deleteFoodDiaryEntry(userId, entryId);
      // Re-fetch after deletion
      execute();
    },
    [userId, execute],
  );

  const totalCalories = (data || []).reduce((sum, entry) => sum + (entry.calories || 0), 0);

  return {
    entries: data || [],
    totalCalories,
    loading,
    error,
    refetch: execute,
    addEntry,
    deleteEntry,
  };
};

// ──────────────────────────────────────────────
// DAILY NUTRIENT LOG HOOK
// ──────────────────────────────────────────────

export const useDailyNutrientLog = (userId: string | null, date: string) => {
  const { data, loading, error, execute } = useAsync<DailyNutrientLog>(
    () =>
      userId && date
        ? apiClient.getDailyNutrientLog(userId, date)
        : Promise.reject('Missing userId or date'),
    !!userId && !!date,
  );

  return {
    nutrientLog: data || null,
    loading,
    error,
    refetch: execute,
  };
};

// ──────────────────────────────────────────────
// HEALTH TRACKING HOOK
// ──────────────────────────────────────────────

export const useHealthTracking = (userId: string | null, days: number = 7) => {
  const { data, loading, error, execute } = useAsync<HealthTrackingLog[]>(
    () => (userId ? apiClient.getHealthTrackingHistory(userId, days) : Promise.reject('No userId')),
    !!userId,
  );

  const logMetrics = useCallback(
    async (metrics: Partial<HealthTrackingLog>) => {
      if (!userId) throw new Error('No userId');
      await apiClient.logHealthMetrics(userId, metrics);
      // Re-fetch after logging
      execute();
    },
    [userId, execute],
  );

  return {
    logs: data || [],
    loading,
    error,
    refetch: execute,
    logMetrics,
  };
};

// ──────────────────────────────────────────────
// RECOMMENDATIONS HOOK
// ──────────────────────────────────────────────

export const useRecommendations = (userId: string | null) => {
  const { data, loading, error, execute } = useAsync<Recommendation[]>(
    () => (userId ? apiClient.getRecommendations(userId) : Promise.reject('No userId')),
    !!userId,
  );

  const markAsRead = useCallback(
    async (recommendationId: string) => {
      if (!userId) throw new Error('No userId');
      await apiClient.markRecommendationAsRead(userId, recommendationId);
      // Re-fetch after marking as read
      execute();
    },
    [userId, execute],
  );

  const unreadCount = (data || []).filter((r) => !r.isRead).length;
  const unreadRecommendations = (data || []).filter((r) => !r.isRead);

  return {
    recommendations: data || [],
    unreadCount,
    unreadRecommendations,
    loading,
    error,
    refetch: execute,
    markAsRead,
  };
};

// ──────────────────────────────────────────────
// WELLNESS PROGRESS HOOK
// ──────────────────────────────────────────────

export const useWellnessProgress = (userId: string | null, periodType: string = 'WEEKLY') => {
  const { data, loading, error, execute } = useAsync<WellnessProgress>(
    () =>
      userId
        ? apiClient.getWellnessProgress(userId, periodType)
        : Promise.reject('No userId'),
    !!userId,
  );

  return {
    progress: data || null,
    loading,
    error,
    refetch: execute,
  };
};

// ──────────────────────────────────────────────
// WATER INTAKE HOOK
// ──────────────────────────────────────────────

export const useWaterIntake = (userId: string | null, date: string) => {
  const [totalMl, setTotalMl] = useState(0);
  const [loading, setLoading] = useState(false);

  const logWater = useCallback(
    async (amountMl: number) => {
      if (!userId) throw new Error('No userId');
      setLoading(true);
      try {
        await apiClient.logWaterIntake(userId, amountMl);
        setTotalMl((prev) => prev + amountMl);
      } catch (error) {
        console.error('Failed to log water intake', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  return {
    totalMl,
    loading,
    logWater,
  };
};

// ──────────────────────────────────────────────
// SLEEP LOG HOOK
// ──────────────────────────────────────────────

export const useSleepLog = (userId: string | null, date: string) => {
  const [loading, setLoading] = useState(false);

  const logSleep = useCallback(
    async (data: Record<string, unknown>) => {
      if (!userId) throw new Error('No userId');
      setLoading(true);
      try {
        return await apiClient.logSleep(userId, data);
      } catch (error) {
        console.error('Failed to log sleep', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  return {
    loading,
    logSleep,
  };
};

// ──────────────────────────────────────────────
// EXERCISE LOG HOOK
// ──────────────────────────────────────────────

export const useExerciseLog = (userId: string | null, date: string) => {
  const [loading, setLoading] = useState(false);

  const logExercise = useCallback(
    async (data: Record<string, unknown>) => {
      if (!userId) throw new Error('No userId');
      setLoading(true);
      try {
        return await apiClient.logExercise(userId, data);
      } catch (error) {
        console.error('Failed to log exercise', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  return {
    loading,
    logExercise,
  };
};

// ──────────────────────────────────────────────
// MOOD LOG HOOK
// ──────────────────────────────────────────────

export const useMoodLog = (userId: string | null, date: string) => {
  const [loading, setLoading] = useState(false);

  const logMood = useCallback(
    async (data: Record<string, unknown>) => {
      if (!userId) throw new Error('No userId');
      setLoading(true);
      try {
        return await apiClient.logMood(userId, data);
      } catch (error) {
        console.error('Failed to log mood', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  return {
    loading,
    logMood,
  };
};

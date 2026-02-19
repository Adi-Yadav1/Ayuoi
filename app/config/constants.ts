export const API_BASE_URL = "https://api.veda-ayurveda.com/v1";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  REFRESH_TOKEN: "/auth/refresh",

  // User
  USER_PROFILE: "/user/profile",
  USER_HEALTH_PROFILE: "/user/health-profile",

  // Prakriti
  PRAKRITI_ASSESSMENT: "/prakriti/assess",
  PRAKRITI_RESULT: "/prakriti/:userId/result",

  // Meal Plans
  MEAL_PLANS: "/meal-plans",
  MEAL_PLAN_CREATE: "/meal-plans/generate",

  // Food
  FOOD_RECOGNIZE: "/food/recognize",
  FOOD_HISTORY: "/food/history/:userId",
  FOOD_LOG: "/food/log",

  // Suggestions
  DIETARY_SUGGESTIONS: "/suggestions/dietary/:dosha",

  // Analytics
  ANALYTICS_DAILY: "/analytics/daily/:userId",
  ANALYTICS_WEEKLY: "/analytics/weekly/:userId",
};

export const NOTIFICATION_SETTINGS = {
  MEAL_REMINDERS: true,
  DIETARY_TIPS: true,
  WEEKLY_SUMMARY: true,
};

export const APP_SETTINGS = {
  LANGUAGE: "en",
  THEME: "light",
  UNITS: "metric", // metric or imperial
};

// Feature flags
export const FEATURES = {
  MEAL_PLANNING: true,
  FOOD_RECOGNITION: true,
  ANALYTICS: true,
  AI_SUGGESTIONS: true,
};

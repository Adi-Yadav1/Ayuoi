/**
 * API Service Layer
 * Handles all REST API calls to the backend
 */

import { User, AuthResponse, HealthProfile, PrakritiAssessment, DailyNutrientLog, UserFoodDiary, Recommendation, WellnessProgress, MealPlan, HealthTrackingLog, DoshaProfile } from '@/app/types/schema';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://prakriti-backend-1.onrender.com/api';

class APIClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  clearAuthToken() {
    this.token = null;
  }

  private async makeRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: Record<string, unknown>,
  ) {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `API Error: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // If we can't parse error response, use status text
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // ──────────────────────────────────────────────
  // AUTH ENDPOINTS
  // ──────────────────────────────────────────────

  async signup(email: string, username: string, password: string) {
    const response = await this.makeRequest('POST', '/auth/signup', {
      email,
      username,
      password,
    });
    
    // Backend wraps response in data property, extract it
    const authData = response.data || response;
    
    return authData as AuthResponse;
  }

  async login(email: string, password: string) {
    const response = await this.makeRequest('POST', '/auth/login', {
      email,
      password,
    });
    
    // Log response for debugging
    console.log('Login response:', response);
    
    // Backend wraps response in data property, extract it
    const authData = response.data || response;
    
    return authData as AuthResponse;
  }

  async getCurrentUser() {
    const response = await this.makeRequest('GET', '/auth/me');
    return response as User;
  }

  // ──────────────────────────────────────────────
  // HEALTH PROFILE ENDPOINTS
  // ──────────────────────────────────────────────

  async getHealthProfile(userId: string) {
    const response = await this.makeRequest('GET', `/users/${userId}/health-profile`);
    return response as HealthProfile;
  }

  async createHealthProfile(userId: string, data: Partial<HealthProfile>) {
    const response = await this.makeRequest('POST', `/users/${userId}/health-profile`, data);
    return response as HealthProfile;
  }

  async updateHealthProfile(userId: string, data: Partial<HealthProfile>) {
    const response = await this.makeRequest('PUT', `/users/${userId}/health-profile`, data);
    return response as HealthProfile;
  }

  // ──────────────────────────────────────────────
  // PRAKRITI ASSESSMENT ENDPOINTS
  // ──────────────────────────────────────────────

  async createPrakritiAssessment(userId: string, assessmentType: string) {
    const response = await this.makeRequest('POST', `/users/${userId}/prakriti-assessments`, {
      assessmentType,
    });
    return response as PrakritiAssessment;
  }

  async submitPrakritiResponse(assessmentId: string, questionId: string, optionId: string) {
    const response = await this.makeRequest(
      'POST',
      `/prakriti-assessments/${assessmentId}/responses`,
      { questionId, optionId },
    );
    return response;
  }

  async completePrakritiAssessment(assessmentId: string) {
    const response = await this.makeRequest(
      'PUT',
      `/prakriti-assessments/${assessmentId}/complete`,
    );
    return response as PrakritiAssessment;
  }

  async getPrakritiAssessments(userId: string) {
    const response = await this.makeRequest('GET', `/users/${userId}/prakriti-assessments`);
    return response as PrakritiAssessment[];
  }

  async getDoshaProfile(userId: string) {
    const response = await this.makeRequest('GET', `/users/${userId}/dosha-profile`);
    return response as DoshaProfile;
  }

  async submitPrakritiTraits(traits: Record<string, string>) {
    const response = await this.makeRequest('POST', '/profile/prakriti-traits', traits);
    return response;
  }

  async submitDoshaTraits(traits: Record<string, string>) {
    const response = await this.makeRequest('POST', '/profile/dosha-traits', traits);
    return response;
  }

  // ──────────────────────────────────────────────
  // FOOD & NUTRITION ENDPOINTS
  // ──────────────────────────────────────────────

  async searchFoodItems(query: string, category?: string) {
    const params = new URLSearchParams();
    params.append('query', query);
    if (category) params.append('category', category);

    const response = await this.makeRequest('GET', `/food-items?${params.toString()}`);
    return response;
  }

  async getFoodItem(foodItemId: string) {
    const response = await this.makeRequest('GET', `/food-items/${foodItemId}`);
    return response;
  }

  // ──────────────────────────────────────────────
  // FOOD DIARY ENDPOINTS
  // ──────────────────────────────────────────────

  async getUserFoodDiary(userId: string, date: string) {
    const response = await this.makeRequest(
      'GET',
      `/users/${userId}/food-diary?date=${date}`,
    );
    return response as UserFoodDiary[];
  }

  async addFoodDiaryEntry(userId: string, entry: Partial<UserFoodDiary>) {
    const response = await this.makeRequest(
      'POST',
      `/users/${userId}/food-diary`,
      entry,
    );
    return response as UserFoodDiary;
  }

  async deleteFoodDiaryEntry(userId: string, entryId: string) {
    const response = await this.makeRequest(
      'DELETE',
      `/users/${userId}/food-diary/${entryId}`,
    );
    return response;
  }

  // ──────────────────────────────────────────────
  // NUTRITION TRACKING
  // ──────────────────────────────────────────────

  async getDailyNutrientLog(userId: string, date: string) {
    const response = await this.makeRequest(
      'GET',
      `/users/${userId}/daily-nutrient-logs?date=${date}`,
    );
    return response as DailyNutrientLog;
  }

  async getWeeklyNutrientLogs(userId: string, startDate: string) {
    const response = await this.makeRequest(
      'GET',
      `/users/${userId}/daily-nutrient-logs?startDate=${startDate}&days=7`,
    );
    return response as DailyNutrientLog[];
  }

  // ──────────────────────────────────────────────
  // HEALTH TRACKING ENDPOINTS
  // ──────────────────────────────────────────────

  async logHealthMetrics(userId: string, data: Partial<HealthTrackingLog>) {
    const response = await this.makeRequest(
      'POST',
      `/users/${userId}/health-tracking`,
      data,
    );
    return response as HealthTrackingLog;
  }

  async getHealthTrackingHistory(userId: string, days: number = 7) {
    const response = await this.makeRequest(
      'GET',
      `/users/${userId}/health-tracking?days=${days}`,
    );
    return response as HealthTrackingLog[];
  }

  async logWaterIntake(userId: string, amountMl: number) {
    const response = await this.makeRequest(
      'POST',
      `/users/${userId}/water-intake`,
      { amountMl },
    );
    return response;
  }

  async logSleep(userId: string, data: Record<string, unknown>) {
    const response = await this.makeRequest(
      'POST',
      `/users/${userId}/sleep-logs`,
      data,
    );
    return response;
  }

  async logExercise(userId: string, data: Record<string, unknown>) {
    const response = await this.makeRequest(
      'POST',
      `/users/${userId}/exercise-logs`,
      data,
    );
    return response;
  }

  async logMood(userId: string, data: Record<string, unknown>) {
    const response = await this.makeRequest(
      'POST',
      `/users/${userId}/mood-logs`,
      data,
    );
    return response;
  }

  // ──────────────────────────────────────────────
  // MEAL PLANNING ENDPOINTS
  // ──────────────────────────────────────────────

  async createMealPlan(userId: string, data: Partial<MealPlan>) {
    const response = await this.makeRequest(
      'POST',
      `/users/${userId}/meal-plans`,
      data,
    );
    return response as MealPlan;
  }

  async getMealPlans(userId: string) {
    const response = await this.makeRequest('GET', `/users/${userId}/meal-plans`);
    return response as MealPlan[];
  }

  async getMealPlan(mealPlanId: string) {
    const response = await this.makeRequest('GET', `/meal-plans/${mealPlanId}`);
    return response as MealPlan;
  }

  // ──────────────────────────────────────────────
  // RECOMMENDATIONS ENDPOINTS
  // ──────────────────────────────────────────────

  async getRecommendations(userId: string) {
    const response = await this.makeRequest('GET', `/users/${userId}/recommendations`);
    return response as Recommendation[];
  }

  async markRecommendationAsRead(userId: string, recommendationId: string) {
    const response = await this.makeRequest(
      'PATCH',
      `/users/${userId}/recommendations/${recommendationId}`,
      { isRead: true },
    );
    return response as Recommendation;
  }

  // ──────────────────────────────────────────────
  // WELLNESS PROGRESS ENDPOINTS
  // ──────────────────────────────────────────────

  async getWellnessProgress(userId: string, periodType: string = 'WEEKLY') {
    const response = await this.makeRequest(
      'GET',
      `/users/${userId}/wellness-progress?periodType=${periodType}`,
    );
    return response as WellnessProgress;
  }

  async getDailyWellnessScore(userId: string) {
    const response = await this.makeRequest(
      'GET',
      `/users/${userId}/wellness-progress/daily`,
    );
    return response;
  }

  // ──────────────────────────────────────────────
  // DINACHARYA (DAILY ROUTINE) ENDPOINTS
  // ──────────────────────────────────────────────

  async logDinacharya(userId: string, data: Record<string, unknown>) {
    const response = await this.makeRequest(
      'POST',
      `/users/${userId}/dinacharya-logs`,
      data,
    );
    return response;
  }

  async getDinacharyaLog(userId: string, date: string) {
    const response = await this.makeRequest(
      'GET',
      `/users/${userId}/dinacharya-logs?date=${date}`,
    );
    return response;
  }

  // ──────────────────────────────────────────────
  // IMAGE RECOGNITION ENDPOINTS
  // ──────────────────────────────────────────────

  async recognizeFood(userId: string, imageUri: string) {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'food.jpg',
    } as any);

    const response = await fetch(`${this.baseURL}/users/${userId}/food-recognition`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Food recognition failed');
    }

    return response.json();
  }
}

export const apiClient = new APIClient();

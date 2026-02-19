/**
 * Doctor Service
 * Wrapper service for doctor-related API calls
 */

import {
    Booking,
    DoctorDetailsResponse,
    DoctorListResponse,
    SlotsResponse,
} from "@/app/types/index";
import { apiClient } from "./apiClient";

class DoctorService {
  /**
   * API 1 - List All Doctors (PUBLIC, no auth)
   * Fetches doctors with pagination and specialty list
   */
  async listDoctors(
    page: number = 1,
    limit: number = 10,
  ): Promise<DoctorListResponse> {
    return apiClient.listDoctors(page, limit);
  }

  /**
   * API 2 - Search Doctors (PUBLIC)
   * Search by name, specialty, location, qualification, education
   */
  async searchDoctors(
    searchQuery: string,
    sortBy?: string,
    order?: "asc" | "desc",
  ): Promise<DoctorListResponse> {
    return apiClient.searchDoctors(searchQuery, sortBy, order);
  }

  /**
   * API 3 - Filter Doctors by Specialty & Fee (PUBLIC)
   */
  async filterDoctors(
    specialty?: string,
    minFee?: number,
    maxFee?: number,
    sortBy?: string,
    order?: "asc" | "desc",
  ): Promise<DoctorListResponse> {
    return apiClient.filterDoctors(specialty, minFee, maxFee, sortBy, order);
  }

  /**
   * API 4 - Get Doctor Details + Today's Slots (PUBLIC)
   */
  async getDoctorDetails(
    doctorId: string,
    date?: string,
  ): Promise<DoctorDetailsResponse> {
    return apiClient.getDoctorDetails(doctorId, date);
  }

  /**
   * API 5 - Get Doctor Slots for a Date (PUBLIC)
   */
  async getDoctorSlots(
    doctorId: string,
    date?: string,
  ): Promise<SlotsResponse> {
    return apiClient.getDoctorSlots(doctorId, date);
  }

  /**
   * API 6 - Book a Slot (AUTHENTICATED)
   * Requires authentication token
   */
  async bookSlot(
    doctorId: string,
    slotId: string,
    notes?: string,
  ): Promise<Booking> {
    return apiClient.bookSlot(doctorId, slotId, notes);
  }

  /**
   * API 7 - My Bookings (AUTHENTICATED)
   * Fetches user's bookings with optional status filter
   */
  async getMyBookings(status?: string): Promise<Booking[]> {
    return apiClient.getMyBookings(status);
  }

  /**
   * API 8 - Cancel Booking (AUTHENTICATED)
   */
  async cancelBooking(bookingId: string): Promise<Booking> {
    return apiClient.cancelBooking(bookingId);
  }
}

// Create and export singleton instance
export const doctorService = new DoctorService();

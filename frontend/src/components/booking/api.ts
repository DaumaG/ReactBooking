import axiosInstance from "@/config/axios";
import { BookingCreateRequest, Booking } from "./types";

export const createBooking = async (bookingCreateRequest: BookingCreateRequest): Promise<Booking> => {
  const response = await axiosInstance.post("/bookings", bookingCreateRequest);
  return await response.data;
};

import axiosInstance from "@/config/axios";
import { BookingCreateRequest, Booking } from "./types";

export const createBooking = async (bookingCreateRequest: BookingCreateRequest): Promise<Booking> => {
  const response = await axiosInstance.post("/bookings", bookingCreateRequest);
  return await response.data;
};

export const getBookings = async (userEmail: string): Promise<Booking[]> => {
  console.log(`atejome i getBookings su email ${userEmail}`);
  const response = await axiosInstance.get(`/bookings/user/${userEmail}`);
  console.log("musu response yra:");
  console.log(response);
  return await response.data;
};


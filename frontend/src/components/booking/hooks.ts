import { useQuery } from "@tanstack/react-query";
import { createBooking, getBookings } from "./api";
import { BookingCreateRequest } from "./types";
import {
    UseMutationResult,
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";

export const CREATE_BOOKING_KEY = "CREATE_BOOKING";
export const GET_BOOKINGS_KEY = "GET_BOOKINGS";
export const BUSINESS_KEY = "BUSINESS";

export const useBookingCreate = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createBooking,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [CREATE_BOOKING_KEY] }),
})};

export const useBookingsGet = (userEmail: string) => {
  return useQuery({
    queryKey: [BUSINESS_KEY],
    queryFn: () => getBookings(userEmail),
  });
};
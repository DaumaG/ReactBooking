import { useQuery } from "@tanstack/react-query";
import { createBooking, getBookings } from "./api";
import { BookingCreateRequest } from "./types";
import { ErrorResponse } from "@/types/error";
import {
    UseMutationResult,
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
import { Booking } from './types';

export const CREATE_BOOKING_KEY = "CREATE_BOOKING";
export const GET_BOOKINGS_KEY = "GET_BOOKINGS";
export const BUSINESS_KEY = "BUSINESS";

export const useBookingCreate = (): UseMutationResult<
  Booking,
  ErrorResponse,
  BookingCreateRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [CREATE_BOOKING_KEY] }),
    });
};

export const useBookingsGet = (userEmail: string) => {
  console.log(`atejome i useBookingsGet su email ${userEmail}`);
  return useQuery({
    queryKey: [GET_BOOKINGS_KEY],
    queryFn: () => getBookings(userEmail),
  });
};
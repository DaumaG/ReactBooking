import { useQuery } from "@tanstack/react-query";
import { createBooking } from "./api";
import { BookingCreateRequest } from "./types";
import { ErrorResponse } from "@/types/error";
import {
    UseMutationResult,
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
import { Booking } from './types';

export const CREATE_BOOKING_KEY = "CREATE_BOOKING";

// export const useBookingCreate = () => {
//     const queryClient = useQueryClient();
  
//     return useMutation({
//       mutationFn: createBooking,
//       onSuccess: () => queryClient.invalidateQueries({ queryKey: [CREATE_BOOKING_KEY] }),
// })};

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
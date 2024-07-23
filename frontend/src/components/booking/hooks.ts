import { useQuery } from "@tanstack/react-query";
import { createBooking } from "./api";
import { BookingCreateRequest } from "./types";
import {
    UseMutationResult,
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";

export const CREATE_BOOKING_KEY = "CREATE_BOOKING";
export const BUSINESS_KEY = "BUSINESS";

export const useBookingCreate = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createBooking,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [CREATE_BOOKING_KEY] }),
})};
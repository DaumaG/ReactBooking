import { useQuery } from "@tanstack/react-query";
import { fetchBusinesses, fetchBusiness } from "./api";

export const BUSINESSES_KEY = "BUSINESSES";
export const BUSINESS_KEY = "BUSINESS";

export const useBusinesses = () => {
  return useQuery({
    queryKey: [BUSINESSES_KEY],
    queryFn: fetchBusinesses,
  });
};

export const useBusiness = (businessId: string) => {
  return useQuery({
    queryKey: [BUSINESS_KEY],
    queryFn: () => fetchBusiness(businessId),
  });
};


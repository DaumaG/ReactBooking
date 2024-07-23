import axiosInstance from "@/config/axios";
import { Business } from "./types";

export const fetchBusinesses = async (): Promise<Business[]> => {
  const response = await axiosInstance.get("/businesses");
  return await response.data;
};

export const fetchBusiness = async (businessId: string): Promise<Business> => {
  const response = await axiosInstance.get(`/businesses/${businessId}`);
  return await response.data;
};
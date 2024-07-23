import * as Yup from "yup";
import { BookingCreateRequest } from "./types";
import { errorMessage } from "@/consts/errorMessage";
import { User } from "../user/types";
import { Business } from "../business/types";
  
export const bookingValidationSchema: Yup.Schema<BookingCreateRequest> =
  Yup.object().shape({
    businessId: Yup.string().required(errorMessage.required),
    businessName: Yup.string().required(errorMessage.required),
    date: Yup.date()
      .required(errorMessage.required),
    time: Yup.string().required(errorMessage.required),
    userEmail: Yup.string().required(errorMessage.required),
    userName: Yup.string().required(errorMessage.required),
  });


export const bookingCreateRequestInitialValues = (businessIdParam: string, user: User, data: Business): BookingCreateRequest => {
    return {
        businessId: businessIdParam,
        businessName: data?.name ?? "",
        date: new Date(),
        time: "14:00",
        userEmail: user?.email ?? "",
        userName: user?.name ?? ""
    }
};
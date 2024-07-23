import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from "./Form.module.scss";
import Button from "../common/Button";
import { useBusiness } from "../business/hooks";
import { useBookingCreate } from "./hooks";
import { bookingCreateRequestInitialValues, bookingValidationSchema } from "@/components/booking/consts";import dayjs from 'dayjs';
import { BookingCreateRequest } from './types';
import { useSnackbar } from "notistack";
import { ErrorResponse } from "@/types/error";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react';  
 
interface BookingFormProps {
    businessId?: string;
}

const tomorrow = dayjs().add(1, 'day');
const BookingForm: React.FC<BookingFormProps> = ({ businessId }) => {
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);  
  const { mutateAsync: createBooking } = useBookingCreate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useContext(UserContext);
  if (!user){
    return <div>Unauthorized</div>
  }
 
  if (!businessId){
    return <div>Business is not selected</div>
  }
 
  const { data, error } = useBusiness(businessId);
  if (!data){
    return <div>{error?.message}</div>
  }
 
  const initialValues = bookingCreateRequestInitialValues(businessId, user, data);

  const handleSubmit = async (values: BookingCreateRequest) => {
    try{
      values.date.setHours(0, 0, 0, 0); 
      await createBooking(values);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);    
    }
    catch (error) {
      setShowSuccessNotification(false);
      const errorMessage = error as ErrorResponse;
        console.log(errorMessage);
        enqueueSnackbar(errorMessage?.response?.data.message ?? "", {
          variant: "error",
        })
    };
  };
 
  const createDateWithHoursAndMinutes = (timeString: string) => {  
    const date = new Date(); 
    const [hours, minutes] = timeString.split(':').map(Number);  
    date.setHours(hours, minutes, 0, 0);
   
    return date;  
  }
  
  return (
    <div className={styles.container}>
        <Formik
        initialValues={initialValues}
        validationSchema={bookingValidationSchema}
        onSubmit={handleSubmit}
        >
        {/* Render Prop funkcionalumas kuris leidžia ištraukti parametrus renderyje */}
        {({ setFieldValue, isSubmitting }) => (
            <Form className={styles.form}>
              <div className="separate">
                <div className={styles.field}>
                    <label htmlFor="businessId">Business name: <b>{initialValues.businessName}</b></label>
                </div>
              </div>
              <div className={styles.jcdf}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={[ 'DatePicker' ]}>
                      <DesktopDatePicker disablePast minDate={tomorrow} name="date" label="date" defaultValue={tomorrow} onChange={(newValue) => setFieldValue("date", newValue?.toDate())} />
                    </DemoContainer>
                    <DemoContainer components={[ 'DatePicker' ]}>
                        <TimePicker name="time" label="Time" defaultValue={dayjs(createDateWithHoursAndMinutes(initialValues.time))} onChange={(newValue) => setFieldValue("time", newValue?.format('HH:mm'))}  />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                {data && data.imageUrls && data.imageUrls.length > 0 && 
                <div className={styles.bookingImage}>
                  <img src={data.imageUrls[0]} alt={data.name} className={styles.image} />
                </div>  
                }
              </div>
              <Button type="submit" disabled={isSubmitting}>Book now</Button>
              {showSuccessNotification && (  
              <div className={styles.notf}>  
                Booking succeeded!  
              </div>  
)}  
            </Form>
        )}
        </Formik>
    </div>
  );
};
 
export default BookingForm;
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from "./Form.module.scss";
import Button from "../common/Button";
import { useBusiness } from "../business/hooks";
import { useBookingCreate } from "./hooks";
import { bookingCreateRequestInitialValues, bookingValidationSchema } from "@/components/booking/consts";import dayjs from 'dayjs';
import { BookingCreateRequest } from './types';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';  
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ROUTES } from "../../router/consts";
import { useState } from 'react';  
 
interface BookingFormProps {
    businessId?: string;
  }

const BookingForm: React.FC<BookingFormProps> = ({ businessId }) => {
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);  
  const { mutateAsync: createBooking } = useBookingCreate();
  const navigate = useNavigate();  
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
    const { } = await createBooking(values);
    // Neveikia jeigu schema nepraeina

    /*if(error){
      setShowSuccessNotification(true);
     return;
    }*/

    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 5000);    
    console.log(values);
    /*navigate(ROUTES.HOME);*/
  };
 
  const createDateWithHoursAndMinutes = (timeString: string) => {  
    const date = new Date();  
    const [hours, minutes] = timeString.split(':').map(Number);  
    date.setHours(hours, minutes, 0, 0);
   
    return date;  
  }
  // 2. Panaudojam Formik komponentą ir priskiriam initialValues
  // 3. sukuriam onSubmit f-ciją ir nurodom values tipą
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
                      <DesktopDatePicker name="date" defaultValue={dayjs(initialValues.date)} onChange={(newValue) => setFieldValue("date", newValue?.toDate())} />
                    </DemoContainer>
                    <DemoContainer components={[ 'DatePicker' ]}>
                        <TimePicker name="time" label="Time" defaultValue={dayjs(createDateWithHoursAndMinutes(initialValues.time))} onChange={(newValue) => setFieldValue("time", newValue?.format('HH:mm'))}  />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className={styles.bookingImage}>
                  <img src={data.imageUrls[0]} alt={data.name} className={styles.image} />
                </div>  
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
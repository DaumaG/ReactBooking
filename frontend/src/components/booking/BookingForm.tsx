import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from "./Form.module.scss";
import Button from "../common/Button";
import { useBusiness } from "../business/hooks";
import { bookingCreateRequestInitialValues, bookingValidationSchema } from "@/components/booking/consts";import dayjs from 'dayjs';
import { BookingCreateRequest } from './types';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface BookingFormProps {
    businessId?: string;
  }

 
// 1. sukuriam initial values
// const registerFormInitialValues = (businessIdParam: string): BookingCreateRequest => {
//     const { user } = useContext(UserContext);
//     const { data } = useBusiness(businessIdParam);

//     return {
//         businessId: businessIdParam,
//         businessName: data?.name ?? "",
//         date: new Date(),
//         time: "14:00",
//         userEmail: user?.email ?? "",
//         userName: user?.name ?? ""
//     }
// };

const BookingForm: React.FC<BookingFormProps> = ({ businessId }) => {
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

  const handleSubmit = (values: BookingCreateRequest) => {
    // Neveikia jeigu schema nepraeina
    console.log(values);
  };

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
        {({ setFieldValue, values, isSubmitting }) => (
            <Form className={styles.form}>
              <div className="separate">
                <div className={styles.field}>
                    <label htmlFor="businessId">Business name: {initialValues.businessName}</label>
                </div>
              </div>  
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={[ 'DatePicker' ]}>
                  <DesktopDatePicker defaultValue={dayjs(initialValues.date)} />
                </DemoContainer>
                <DemoContainer components={[ 'DatePicker' ]}>
                    <TimePicker label="Time" />
                </DemoContainer>
              </LocalizationProvider>
              <Button type="submit" disabled={isSubmitting}>Book now</Button>
            </Form>
        )}
        </Formik>
    </div>
  );
};

export default BookingForm;

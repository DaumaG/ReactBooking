import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from 'react';
import { BookingFormValues } from "../../types/booking";
import { UserContext } from '../../context/UserContext';
import styles from "./Form.module.scss";
import Button from "../common/Button";
import ResponsiveDatePickers from "./Calendar";
import FormikField from "@/components/common/FormikInput";

interface BookingFormProps {
    businessId?: string;
  }

 
// 1. sukuriam initial values
const registerFormInitialValues = (businessIdParam: string): BookingFormValues => {
    const { user } = useContext(UserContext);
    
    return {
        businessId: businessIdParam,
        date: new Date(),
        time: "14:00",
        userEmail: user?.email ?? "",
        userName: user?.name ?? ""
    }
};

const BookingForm: React.FC<BookingFormProps> = ({ businessId }) => {
  const handleSubmit = (values: BookingFormValues) => {
    // Neveikia jeigu schema nepraeina
    console.log(values);
  };

  if (!businessId){
    return <div>Business was not found</div>
  }

  // 2. Panaudojam Formik komponentą ir priskiriam initialValues
  // 3. sukuriam onSubmit f-ciją ir nurodom values tipą
  return (
    
    <div className={styles.container}>
        <Formik
        initialValues={registerFormInitialValues(businessId)}
        validationSchema={() => {}}
        //   validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
        >
        {/* Render Prop funkcionalumas kuris leidžia ištraukti parametrus renderyje */}
        {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className="separate">
                <div className={styles.field}>
                    <label htmlFor="businessId">Business</label>
                    <Field type="text" name="businessId" />
                    <ErrorMessage name="name" component="div" className={styles.error} />
                </div>
                <div>
                  <ResponsiveDatePickers/>
                  {/* <div className={styles.field}>
                      <label htmlFor="time">Time</label>
                      <Field type="text" name="time" />
                      <ErrorMessage name="time" component="div" className={styles.error} />
                  </div> */}
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting}>Book now</Button>
            </Form>
        )}
        </Formik>
    </div>
  );
};

export default BookingForm;

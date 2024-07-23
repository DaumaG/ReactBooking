import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from 'react';
import { BookingFormValues } from "../../types/booking";
import { UserContext } from '../../context/UserContext';
// import { registerValidationSchema } from "./consts";
// import styles from "./Form.module.scss";

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
    return <div>BusinessID is required</div>
  }

  // 2. Panaudojam Formik komponentą ir priskiriam initialValues
  // 3. sukuriam onSubmit f-ciją ir nurodom values tipą
  return (
    <Formik
      initialValues={registerFormInitialValues(businessId)}
      validationSchema={() => {}}
    //   validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {/* Render Prop funkcionalumas kuris leidžia ištraukti parametrus renderyje */}
      {({ isSubmitting }) => (
        <Form className={""}>
          <div className={""}>
            <label htmlFor="businessId">BusinessId</label>
            {/* 4. Sukuriam inputus su Field komponentu ir būtinai!!! panaudojam name atributą */}
            {/* Jeigu nepridėsite "name" atributo neveiks Formiko onChange handleris */}
            <Field type="text" name="businessId" />
            {/* Panaudojam komponentą ir nurodom name atributą kuriam laukui rodo errorą */}
            <ErrorMessage
              name="name"
              component="div"
            //   className={styles.error}
            />
          </div>
          <div className={""}>
            <label htmlFor="date">Date</label>
            {/* 4. Sukuriam inputus su Field komponentu ir būtinai!!! panaudojam name atributą */}
            {/* Jeigu nepridėsite "name" atributo neveiks Formiko onChange handleris */}
            <Field type="date" name="date" />
            {/* Panaudojam komponentą ir nurodom name atributą kuriam laukui rodo errorą */}
            <ErrorMessage
              name="date"
              component="div"
            //   className={styles.error}
            />
          </div>
          <div className={""}>
            <label htmlFor="time">Time</label>
            {/* 4. Sukuriam inputus su Field komponentu ir būtinai!!! panaudojam name atributą */}
            {/* Jeigu nepridėsite "name" atributo neveiks Formiko onChange handleris */}
            <Field type="text" name="time" />
            {/* Panaudojam komponentą ir nurodom name atributą kuriam laukui rodo errorą */}
            <ErrorMessage
              name="time"
              component="div"
            //   className={styles.error}
            />
          </div>
          <div className={""}>
            <label htmlFor="userEmail">userEmail</label>
            {/* 4. Sukuriam inputus su Field komponentu ir būtinai!!! panaudojam name atributą */}
            {/* Jeigu nepridėsite "name" atributo neveiks Formiko onChange handleris */}
            <Field type="text" name="userEmail" />
            {/* Panaudojam komponentą ir nurodom name atributą kuriam laukui rodo errorą */}
            <ErrorMessage
              name="userEmail"
              component="div"
            //   className={styles.error}
            />
          </div>

          <div className={""}>
            <label htmlFor="userName">userName</label>
            {/* 4. Sukuriam inputus su Field komponentu ir būtinai!!! panaudojam name atributą */}
            {/* Jeigu nepridėsite "name" atributo neveiks Formiko onChange handleris */}
            <Field type="text" name="userName" />
            {/* Panaudojam komponentą ir nurodom name atributą kuriam laukui rodo errorą */}
            <ErrorMessage
              name="userName"
              component="div"
            //   className={styles.error}
            />
          </div>

          {/* <div className={styles.formGroup}>
            <label htmlFor="surname">Pavardė</label>
            <Field name="surname" />
            <ErrorMessage
              name="surname"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">El. paštas</label>
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Slaptažodis</label>
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div> */}

          <button type="submit" disabled={isSubmitting}>
            Pateikti
          </button>
        </Form>
      )}
    </Formik>

    // <form onSubmit={handleSubmit}>
    //   <input type="text" name="name" />
    //   <input type="email" name="email" />
    //   <input type="password" name="password" />
    //   <button type="submit">Submit</button>
    // </form>
  );
};

export default BookingForm;

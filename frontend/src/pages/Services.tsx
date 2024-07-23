import BookedList from "@/components/bookedServices/BookedList";
import styles from "./Home.module.scss";

const Services = () => {
  return (
    <>
      <h2 className={styles.title}>Your orded services</h2>
      <BookedList />
    </>
  );
};

export default Services;

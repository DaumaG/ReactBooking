import styles from "./BookCard.module.scss"
import { Business } from "../business/types";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { ROUTES } from "@/router/consts";
import { Booking } from "../booking/types";

interface BookingCardProps {
  business: Business;
  booking: Booking;
}
const formatDate = (date: Date, time: string) => {  
    const d = new Date(date);  
    const year = d.getFullYear();  
      
    const month = (d.getMonth() + 1).toString().padStart(2, '0');  
    const day = d.getDate().toString().padStart(2, '0');  
      
    return `${year}-${month}-${day} ${time}`;  
  };  
    
  const BookedCard = ({ business, booking }: BookingCardProps) => {  
    const navigate = useNavigate();
    const createBookingPath = generatePath(ROUTES.CREATE_BOOKING, { businessId: business._id });
  
    return (
      <div className={styles.card}>
        {business.imageUrls.length && (
          <img
            src={business.imageUrls[0]}
            alt={business.name}
            className={styles.image}
          />
        )}
        <div className={styles.infoContainer}>
          <span className={styles.chip}>{business.category}</span>
          <h3 className={styles.name}>{business.name}</h3>
          <p className={styles.contactPerson}>{business.contactPerson}</p>
          <p className={styles.address}>{business.address}</p>
          <p className={styles.date}><b>{"Booking time: "}</b>{formatDate(booking.date, booking.time)}</p>
        </div>
      </div>
    );
  };
  
  export default BookedCard;

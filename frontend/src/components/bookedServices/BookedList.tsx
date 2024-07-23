import classNames from "classnames";
import styles from "./BookList.module.scss";
import { useBusinesses } from "../business/hooks";
import BookedCard from "./BookedCard";
import { useBookingsGet } from "../booking/hooks";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
 
 
const GetBookings = () => {
  const { user } = useContext(UserContext);
  if (!user?.email){
    return [];
  }
 
  const { data } = useBookingsGet(user?.email ?? "");
 
  return data;
}
const BookedList = () => {
  const myBookings = GetBookings() ?? [];
  const { data } = useBusinesses();
  const businesses = data ?? [];
 
  return (
    <div className={classNames(styles.container)}>  
      {myBookings.map((booking, i) => {  
        const businessDetails = businesses.find(  
          (business) => business._id === booking.businessId  
        );  
 
        return (  
          businessDetails && (  
            <BookedCard  
              key={i}
              business={businessDetails}
              booking={booking}
            />  
          )  
        );  
      })}  
    </div>  
  );  
};  
 
export default BookedList;
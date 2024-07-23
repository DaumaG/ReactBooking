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

  console.log("user meail tyea");
  const { data } = useBookingsGet(user?.email ?? "");
  console.log(data);
  
  return data;
}
const BookedList = () => {
  const myBookings = GetBookings() ?? [];
  const { data } = useBusinesses();
  const businesses = data ?? [];

  return (  
    <div className={classNames(styles.container)}>  
      {myBookings.map((booking) => {  
        const businessDetails = businesses.find(  
          (business) => business._id === booking.businessId  
        );  
  
        // Only render a BookedCard if business details are found  
        return (  
          businessDetails && (  
            <BookedCard  
              key={booking.businessId} // Use booking ID or a combination of booking ID and business ID  
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

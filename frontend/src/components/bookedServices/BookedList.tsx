import classNames from "classnames";
import styles from "../business/BusinessCard.module.scss";
import { Category } from "../category/types";
import { useBusinesses } from "../business/hooks";
import BookedCard from "./BookedCard";
import { useBookingsGet } from "../booking/hooks";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

interface BusinessListProps {
  categoryName?: Category["name"];
  className?: string;
}

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

const BookedList = ({ categoryName, className }: BusinessListProps) => {
  const myBookings = GetBookings() ?? [];
  const { data } = useBusinesses();
  const businesses = data ?? [];

  if(!myBookings){
    return <div>"Negalima"</div>
  }
  const filteredBusinesses = categoryName  
    ? businesses.filter((business) => business.category === categoryName)  
    : businesses;  
    console.log(myBookings[0].businessId)
    return (  
      <div className={classNames(styles.container, className)}>  
        {myBookings.map((booking) => {  
          const businessDetails = filteredBusinesses.find(  
            (business) => business._id === booking.businessId  
          );  
    
          // Only render a BookedCard if business details are found  
          return (  
            businessDetails && (  
              <BookedCard  
                key={booking.businessId} // Use booking ID or a combination of booking ID and business ID  
                business={businessDetails}  
              />  
            )  
          );  
        })}  
      </div>  
    );  
  };  

export default BookedList;

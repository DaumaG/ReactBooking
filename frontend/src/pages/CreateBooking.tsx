import BookingForm from "@/components/booking/BookingForm";
import { useParams } from "react-router-dom";

const Book = () => {
    const { businessId } = useParams();
    
    return <BookingForm businessId={businessId} />
}

export default Book;
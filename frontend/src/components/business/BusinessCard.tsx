import Button from "../common/Button";
import styles from "./BusinessCard.module.scss";
import { Business } from "./types";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { ROUTES } from "@/router/consts";

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {  
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
        <Button onClick={() => navigate(createBookingPath)}>Book now</Button>
      </div>
    </div>
  );
};

export default BusinessCard;

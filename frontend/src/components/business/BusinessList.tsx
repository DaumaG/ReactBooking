import classNames from "classnames";
import styles from "./BusinessList.module.scss";
import { Category } from "../category/types";
import { useBusinesses } from "./hooks";
import BookedCard from "../bookedServices/BookedCard";
import BusinessCard from "./BusinessCard";

interface BusinessListProps {
  categoryName?: Category["name"];
  className?: string;
}

const BusinessList = ({ categoryName, className }: BusinessListProps) => {
  const { data } = useBusinesses();
  const businesses = data ?? [];

  const filteredBusiness = categoryName
    ? businesses.filter((business) => business.category === categoryName)
    : businesses;

  return (
    <div className={classNames(styles.container, className)}>
      {filteredBusiness.map((business) => (
        <BusinessCard key={business._id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;

import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (  
    <div className={styles.aboutUsContainer}>  
      <h1 className={styles.aboutUsTitle}>About Us</h1>  
      <p className={styles.aboutUsText}>  
        "Logoi Ipsum" is a dynamic and innovative company that has quickly  
        established itself as a leader in its industry. With a strong commitment  
        to customer satisfaction and a forward-thinking approach, Logoi Ipsum  
        offers a diverse range of services designed to meet the evolving needs of  
        its clientele.  
      </p>  
    </div>  
  );  
};

export default AboutUs;

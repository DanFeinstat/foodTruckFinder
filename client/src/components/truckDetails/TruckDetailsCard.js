import React from "react";
import styles from "./TruckDetailsCard.module.css";

const TruckDetailsCard = ({ truckName, truckBlurb }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{truckName}</h3>
      <p className={styles.blurb}>{truckBlurb}</p>
    </div>
  );
};

export default TruckDetailsCard;

import React, { useState, useContext } from "react";
import styles from "./SetActive.module.css";
import { AppContext } from "../store/store";

const SetActive = () => {
  const [active, setActive] = useState(false);
  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
      });
      if (!active) {
        setActive(true);
      }
    } else {
      console.log(`geolocation is not supported in the browser`);
    }
  };

  return (
    <div className={styles.container}>
      {}
      <button
        className={styles.activeBtn}
        onClick={() => {
          updateLocation();
        }}
      >
        {active ? `Update Location` : `Go Active`}
      </button>
      {active && <button className={styles.inactiveBtn}>Go offLine</button>}
    </div>
  );
};

export default SetActive;

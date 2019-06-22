import React, { useContext, useState } from "react";
import styles from "./DetailsShelf.module.css";
import TruckDetailsCard from "./TruckDetailsCard";
import { AppContext } from "../store/store";

const DetailsShelf = () => {
  const { state, dispatch } = useContext(AppContext);
  //   const [toDisplay, setToDisplay] = useState(state.trucksToDisplay);

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <button className={styles.menuBtn}>Log In</button>
        <button className={styles.menuBtn}>Sign Up</button>
      </div>
      {state.trucksToDisplay.map((truck, index) => {
        return (
          <TruckDetailsCard
            key={index.toString()}
            truckName={truck.name}
            truckBlurb={truck.blurb}
          />
        );
      })}
    </div>
  );
};

export default DetailsShelf;

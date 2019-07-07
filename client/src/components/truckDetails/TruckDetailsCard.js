import React, { useContext } from "react";
import { AppContext } from "../store/store";
import styles from "./TruckDetailsCard.module.css";

const TruckDetailsCard = ({
  truckName,
  truckBlurb,
  truckLatitude,
  truckLongitude,
}) => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div
      className={styles.container}
      onMouseOver={() => {
        dispatch({
          type: `popupValue`,
          payload: {
            name: truckName,
            blurb: truckBlurb,
            longitude: truckLongitude,
            latitude: truckLatitude,
          },
        });
      }}
    >
      <h3 className={styles.title}>{truckName}</h3>
      <p className={styles.blurb}>{truckBlurb}</p>
    </div>
  );
};

export default TruckDetailsCard;

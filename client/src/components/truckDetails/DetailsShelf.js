import React, { useContext, useState } from "react";
import styles from "./DetailsShelf.module.css";
import TruckDetailsCard from "./TruckDetailsCard";
import { withRouter } from "react-router-dom";
import { AppContext } from "../store/store";

const DetailsShelf = props => {
  const { state, dispatch } = useContext(AppContext);
  //   const [toDisplay, setToDisplay] = useState(state.trucksToDisplay);

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        {state.owner.id ? (
          <button
            className={styles.menuBtn}
            onClick={() => {
              props.history.push(`/truckDashboard`);
            }}
          >
            Account
          </button>
        ) : (
          <button
            className={styles.menuBtn}
            onClick={() => {
              props.history.push(`/signup`);
            }}
          >
            Log In
          </button>
        )}
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

export default withRouter(DetailsShelf);

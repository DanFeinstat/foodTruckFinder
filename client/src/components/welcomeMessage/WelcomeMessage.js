import React, { useContext } from "react";
import styles from "./WelcomeMessage.module.css";
import { AppContext } from "../store/store";

const WelcomeMessage = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome {state.owner.name}</h1>
      <p className={styles.content}>
        To grab your current location and add your truck to the map, hit the "Go
        Active" button. Once active you'll be able to update the map location
        when you move with the "Update Location" button or take your truck off
        the map with "Go Offline".
      </p>
    </div>
  );
};

export default WelcomeMessage;

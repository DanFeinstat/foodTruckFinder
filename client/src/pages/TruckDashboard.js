import React from "react";
import Header from "../components/header/Header";
import UpdateDescription from "../components/UpdatedDescription/UpdateDescription";
import SetActive from "../components/setActive/SetActive";
import WelcomeMessage from "../components/welcomeMessage/WelcomeMessage";
import styles from "./TruckDashboard.module.css";

const TruckDashboard = () => {
  return (
    <div className={styles.containerx}>
      <Header />
      <WelcomeMessage />
      <UpdateDescription />
      <SetActive />
    </div>
  );
};

export default TruckDashboard;

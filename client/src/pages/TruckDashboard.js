import React from "react";
import Header from "../components/header/Header";
import UpdateDescription from "../components/UpdatedDescription/UpdateDescription";
import styles from "./TruckDashboard.module.css";

const TruckDashboard = () => {
  return (
    <div className={styles.containerx}>
      <Header />
      <UpdateDescription />
    </div>
  );
};

export default TruckDashboard;

import React, { useEffect, useContext } from "react";
import Header from "../components/header/Header";
import UpdateDescription from "../components/UpdatedDescription/UpdateDescription";
import SetActive from "../components/setActive/SetActive";
import WelcomeMessage from "../components/welcomeMessage/WelcomeMessage";
import styles from "./TruckDashboard.module.css";
import { AppContext } from "../components/store/store";
import ownerApi from "../utils/ownerApi";

const TruckDashboard = props => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.owner.id) {
      props.history.push(`/signup`);
    }
  }, []);
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

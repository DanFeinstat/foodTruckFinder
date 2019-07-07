import React, { useState, useEffect, useContext } from "react";
import Header from "../components/header/Header";
import DashboardMenu from "../components/dashboardMenu/DashboardMenu";
import UpdateDescription from "../components/UpdatedDescription/UpdateDescription";
import SetActive from "../components/setActive/SetActive";
import WelcomeMessage from "../components/welcomeMessage/WelcomeMessage";
import styles from "./TruckDashboard.module.css";
import { AppContext } from "../components/store/store";
import ownerApi from "../utils/ownerApi";

const TruckDashboard = props => {
  const { state, dispatch } = useContext(AppContext);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (!state.owner.id) {
      props.history.push(`/signup`);
    }
  }, []);
  return (
    <div className={styles.containerx}>
      <Header
        menuActive={menuActive}
        setMenuActive={setMenuActive}
        mapPage={false}
      />
      <WelcomeMessage />
      <UpdateDescription />
      <SetActive />
      {menuActive ? <DashboardMenu /> : null}
    </div>
  );
};

export default TruckDashboard;

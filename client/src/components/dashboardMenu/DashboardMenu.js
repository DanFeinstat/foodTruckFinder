import React, { useContext, useState } from "react";
import styles from "./DashboardMenu.module.css";
import { withRouter } from "react-router-dom";
import { AppContext } from "../store/store";

const DashboardMenu = props => {
  const { state, dispatch } = useContext(AppContext);

  const logout = () => {
    dispatch({ type: `logout` });
    localStorage.removeItem("foodTruckTrackerJwt");
    props.history.push(`/`);
  };
  //   const [toDisplay, setToDisplay] = useState(state.trucksToDisplay);

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <button
          className={styles.menuBtn}
          onClick={() => {
            props.history.push(`/`);
          }}
        >
          Map
        </button>

        <button
          className={styles.menuBtn}
          onClick={() => {
            logout();
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default withRouter(DashboardMenu);

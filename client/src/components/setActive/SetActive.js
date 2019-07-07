import React, { useState, useContext } from "react";
import styles from "./SetActive.module.css";
import ownerApi from "../../utils/ownerApi";
import { AppContext } from "../store/store";
import io from "socket.io-client";

const socket = io.connect();

const SetActive = () => {
  const { state, dispatch } = useContext(AppContext);
  const [active, setActive] = useState(false);
  function getLocationSynchronously(options = {}) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  const updateLocation = async () => {
    try {
      const { coords } = await getLocationSynchronously();
      const { latitude, longitude } = coords;
      const timeStamp = new Date();
      const newLocation = {
        latitude: latitude,
        longitude: longitude,
        time: timeStamp,
      };
      const newUserData = {
        id: state.owner.id,
        data: newLocation,
      };
      ownerApi
        .updateLocation(newUserData, localStorage.foodTruckTrackerJwt)
        .then(res => {
          ownerApi
            .setActive({ id: state.owner.id }, localStorage.foodTruckTrackerJwt)
            .then(response => {
              setActive(true);
              socket.emit("truckStatusChange");
              alert(`location updated!`);
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const goOffline = () => {
    ownerApi
      .setInactive({ id: state.owner.id }, localStorage.foodTruckTrackerJwt)
      .then(response => {
        setActive(false);
        socket.emit("truckStatusChange");
        alert(`Now Offline`);
      });
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
      {active && (
        <button
          className={styles.inactiveBtn}
          onClick={() => {
            goOffline();
          }}
        >
          Go offLine
        </button>
      )}
    </div>
  );
};

export default SetActive;

import React, { useState, useEffect, useContext } from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  // MapContext,
  // Image,
  // Marker,
} from "react-mapbox-gl";
import styles from "./Map.module.css";
// import foodMarker from "../../assets/images/foodMapMarker.png";
import { AppContext } from "../store/store";
import ownerApi from "../../utils/ownerApi";
import io from "socket.io-client";
// import TruckLocationIcon from "../icons/TruckLocationIcon";

const socket = io.connect();

//default public token
const token = `pk.eyJ1IjoiZGFuZmVpbnN0YXQiLCJhIjoiY2p3ZTVhMnduMHIxZjN6b3UzdXNtNDBwMCJ9.IcWOA5mFg_ZIpLsoXu_e_g`;
const Mapbox = ReactMapboxGl({ accessToken: token });

const Map = ({ menuActive }) => {
  const { state, dispatch } = useContext(AppContext);
  // const [mapBounds, setMapBounds] = useState({});
  // const [popupInfo, setPopupInfo] = useState();
  // const [popupValue, setPopupValue] = useState();
  const [mapCenter, setMapCenter] = useState([-121.4944, 38.5816]);
  const [viewHeight, setViewHeight] = useState(
    document.documentElement.clientHeight
  );
  const [mapHeight, setMapHeight] = useState(
    document.documentElement.clientHeight - 56
  );

  function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  const getCenterPosition = async () => {
    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;
      setMapCenter([longitude, latitude]);
    } catch (error) {
      console.error(error);
    }
  };

  const getTrucks = () => {
    ownerApi.getAllActive().then(res => {
      let response = res.data;
      console.log(response);
      let newActiveTrucks = [];
      for (let i = 0; i < response.length; i++) {
        let newTruck = {
          name: response[i].name,
          latitude: response[i].location[0].latitude,
          longitude: response[i].location[0].longitude,
          blurb: response[i].description,
        };
        newActiveTrucks.push(newTruck);
      }
      // response.map(item => {
      //   let newTruck = {
      //     name: item.name,
      //     latitude: item.location[0].latitude,
      //     longitude: item.location[0].longitude,
      //     blurb: item.description,
      //   };
      //   newActiveTrucks.push(newTruck);
      // });
      dispatch({ type: `addTruck`, payload: newActiveTrucks });
    });
  };

  useEffect(() => {
    getCenterPosition();
    getTrucks();
  }, []);

  useEffect(() => {
    socket.on("newTruckActivity", message => {
      getTrucks();
    });
  });

  useEffect(() => {
    if (viewHeight !== mapHeight + 56) {
      const newMapHeight = viewHeight - 56;
      setMapHeight(newMapHeight);
    }
    const handleResize = () => {
      setViewHeight(document.documentElement.clientHeight);
    };
    window.addEventListener(`resize`, handleResize);
    return () => {
      window.removeEventListener(`resize`, handleResize);
    };
  }, [viewHeight, mapHeight]);

  useEffect(() => {
    const newMapHeight = viewHeight - 56;
    setMapHeight(newMapHeight);
  }, [viewHeight]);
  return (
    <Mapbox
      style="mapbox://styles/mapbox/streets-v8"
      minZoom={4}
      maxZoom={15}
      center={mapCenter}
      onStyleLoad={map => {
        let rawBounds = map.getBounds();
        let onLoadBounds = {
          latRange: [rawBounds._ne.lat, rawBounds._sw.lat],
          lngRange: [rawBounds._ne.lng, rawBounds._sw.lng],
        };
        // console.log(onLoadBounds);
        dispatch({
          type: `newMapBounds`,
          payload: onLoadBounds,
        });
        // setMapBounds(map.getBounds());
        // console.log(map.getBounds());
      }}
      onClick={() => {
        dispatch({ type: `popupValue` });
      }}
      containerStyle={{
        height: `${mapHeight}px`,
        width: `${menuActive ? `calc(100% - 160px)` : `100%`}`,
      }}
      onDragEnd={map => {
        let rawBounds = map.getBounds();
        let onLoadBounds = {
          latRange: [rawBounds._ne.lat, rawBounds._sw.lat],
          lngRange: [rawBounds._ne.lng, rawBounds._sw.lng],
        };
        // console.log(onLoadBounds);
        dispatch({
          type: `newMapBounds`,
          payload: onLoadBounds,
        });
        // setMapBounds(map.getBounds());
        // console.log(map.getBounds());
      }}
      onZoomEnd={map => {
        let rawBounds = map.getBounds();
        let onLoadBounds = {
          latRange: [rawBounds._ne.lat, rawBounds._sw.lat],
          lngRange: [rawBounds._ne.lng, rawBounds._sw.lng],
        };
        // console.log(onLoadBounds);
        dispatch({
          type: `newMapBounds`,
          payload: onLoadBounds,
        });
        // setMapBounds(map.getBounds());
        // console.log(map.getBounds());
      }}
    >
      >
      <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "restaurant-15" }}
      >
        {state.trucksToDisplay.map((truck, index) => {
          let truckData = { name: truck.name, blurb: truck.blurb };
          return (
            <Feature
              key={index.toString()}
              coordinates={[truck.longitude, truck.latitude]}
              dataCoordinates={[truck.longitude, truck.latitude]}
              onClick={({ feature }) => {
                let details = {
                  name: truckData.name,
                  blurb: truckData.blurb,
                  longitude: feature.geometry.coordinates[0],
                  latitude: feature.geometry.coordinates[1],
                };
                console.log(details);
                dispatch({
                  type: `popupValue`,
                  payload: {
                    name: truckData.name,
                    blurb: truckData.blurb,
                    longitude: feature.geometry.coordinates[0],
                    latitude: feature.geometry.coordinates[1],
                  },
                });
                // setPopupValue(truckData);
                // setPopupInfo(feature.geometry.coordinates);
                setMapCenter(feature.geometry.coordinates);
              }}
            />
          );
        })}
      </Layer>
      {state.popupValue && (
        <Popup coordinates={state.popupValue.coords}>
          <div className={styles.popup}>
            <div>
              <h3>{state.popupValue.name}</h3>
              <div>{state.popupValue.blurb}</div>
            </div>
          </div>
        </Popup>
      )}
    </Mapbox>
  );
};

export default Map;

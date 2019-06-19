import React, { useState, useEffect, useContext } from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  MapContext,
} from "react-mapbox-gl";
import styles from "./Map.module.css";
import { AppContext } from "../store/store";
// import { callbackify } from "util";

//default public token
const token = `pk.eyJ1IjoiZGFuZmVpbnN0YXQiLCJhIjoiY2p3ZTVhMnduMHIxZjN6b3UzdXNtNDBwMCJ9.IcWOA5mFg_ZIpLsoXu_e_g`;
const Mapbox = ReactMapboxGl({ accessToken: token });

const Map = ({ menuActive }) => {
  const { state, dispatch } = useContext(AppContext);
  const [mapBounds, setMapBounds] = useState({});
  const [popupInfo, setPopupInfo] = useState();
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

      // Handle coordinates
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  useEffect(() => {
    getCenterPosition();
  }, []);

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
        setPopupInfo();
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
      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        {state.trucksToDisplay.map((truck, index) => {
          return (
            <Feature
              key={index.toString()}
              coordinates={[truck.longitude, truck.latitude]}
              dataCoordinates={[truck.longitude, truck.latitude]}
              onClick={({ feature }) => {
                console.log(feature.geometry.coordinates);

                setPopupInfo(feature.geometry.coordinates);
                setMapCenter(feature.geometry.coordinates);
              }}
            />
          );
        })}
      </Layer>
      {popupInfo && (
        <Popup coordinates={popupInfo}>
          <div className={styles.popup}>
            <div>Test</div>
          </div>
        </Popup>
      )}
    </Mapbox>
  );
};

export default Map;

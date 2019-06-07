import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import { callbackify } from "util";

//default public token
const token = `pk.eyJ1IjoiZGFuZmVpbnN0YXQiLCJhIjoiY2p3ZTVhMnduMHIxZjN6b3UzdXNtNDBwMCJ9.IcWOA5mFg_ZIpLsoXu_e_g`;
const Mapbox = ReactMapboxGl({ accessToken: token });

const Map = () => {
  const [popupInfo, setPopupInfo] = useState();
  const [mapCenter, setMapCenter] = useState([-121.4944, 38.5816]);
  const [viewHeight, setViewHeight] = useState(
    document.documentElement.clientHeight
  );
  const [mapHeight, setMapHeight] = useState(
    document.documentElement.clientHeight - 56
  );

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
  });

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
      containerStyle={{
        height: `${mapHeight}px`,
        width: "100%",
      }}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        <Feature
          coordinates={[-121.4944, 38.5816]}
          dataCoordinates={[-121.4944, 38.5816]}
          onClick={({ feature }) => {
            console.log(feature.geometry.coordinates);

            setPopupInfo(feature.geometry.coordinates);
            setMapCenter(feature.geometry.coordinates);
          }}
        />
        <Feature
          coordinates={[-121.4954, 38.5916]}
          dataCoordinates={[-121.4954, 38.5916]}
          onClick={({ feature }) => {
            console.log(feature.geometry.coordinates);

            setPopupInfo(feature.geometry.coordinates);
            setMapCenter(feature.geometry.coordinates);
          }}
        />
      </Layer>
      {popupInfo && (
        <Popup coordinates={popupInfo}>
          <div>Test</div>
        </Popup>
      )}
      {/* <Popup key={station.id} coordinates={station.position}>
            <StyledPopup>
              <div>{station.name}</div>
              <div>
                {station.bikes} bikes / {station.slots} slots
              </div>
            </StyledPopup>
          </Popup> */}
    </Mapbox>
  );
};

export default Map;

import React, { useState } from "react";
import Map from "../components/map/Map";
import DetailsShelf from "../components/truckDetails/DetailsShelf";
import Header from "../components/header/Header";
import "../App.css";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <div className="App">
      <Header
        menuActive={menuActive}
        setMenuActive={setMenuActive}
        mapPage={true}
      />
      <Map menuActive={menuActive} />
      {menuActive ? <DetailsShelf /> : null}
    </div>
  );
}

export default App;

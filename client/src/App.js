import React, { useState } from "react";
import Map from "./components/map/Map";
import Header from "./components/header/Header";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [mapBounds, setMapBounds] = useState({});
  return (
    <div className="App">
      <Header menuActive={menuActive} setMenuActive={setMenuActive} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      <Map menuActive={menuActive} updateMapBounds={setMapBounds} />{" "}
      {/* {menuActive ? <Menu /> : null} */}
      {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

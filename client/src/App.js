import React, { useState } from "react";
import Map from "./components/map/Map";
import DetailsShelf from "./components/truckDetails/DetailsShelf";
import Header from "./components/header/Header";
import logo from "./logo.svg";
import "./App.css";
import { AppContextProvider } from "./components/store/store";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <div className="App">
      <AppContextProvider>
        <Header menuActive={menuActive} setMenuActive={setMenuActive} />
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Map menuActive={menuActive} /> {menuActive ? <DetailsShelf /> : null}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </AppContextProvider>
    </div>
  );
}

export default App;

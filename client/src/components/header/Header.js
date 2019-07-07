import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/HambreLogo.png";
import { withRouter } from "react-router-dom";

const Header = props => {
  return (
    <header className={styles.container}>
      <img
        src={logo}
        className={styles.logo}
        alt={`Logo`}
        onClick={() => {
          props.history.push("/");
        }}
      />
      {props.children}
      {!props.authPage && (
        <button
          className={styles.menu}
          onClick={() => {
            props.setMenuActive(!props.menuActive);
          }}
        >
          {!props.mapPage
            ? `Menu`
            : props.menuActive === false
            ? `Show Details`
            : `Hide Details`}
        </button>
      )}
    </header>
  );
};

export default withRouter(Header);

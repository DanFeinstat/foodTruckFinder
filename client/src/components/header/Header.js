import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/HambreLogo.png";

const Header = ({ children, menuActive, setMenuActive }) => {
  return (
    <header className={styles.container}>
      <img src={logo} className={styles.logo} alt={`Logo`} />
      {children}
      <button
        className={styles.menu}
        onClick={() => {
          setMenuActive(!menuActive);
        }}
      >
        {menuActive === false ? `Show Details` : `Hide Details`}
      </button>
    </header>
  );
};

export default Header;

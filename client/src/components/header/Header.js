import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/HambreLogo.png";

const Header = props => {
  return (
    <header className={styles.container}>
      <img src={logo} className={styles.logo} alt={`Logo`} />
      {props.children}
    </header>
  );
};

export default Header;

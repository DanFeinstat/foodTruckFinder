import React from "react";
import styles from "./LogIn.module.css";

const LogIn = () => {
  return (
    <form className={styles.container}>
      <h1>Log In</h1>
      {/* <div className={styles.inputGroup}>
        <label for="username">Truck Name</label>
        <input
          className={styles.input}
          maxlength="20"
          name="name"
          type="text"
          id="username"
          placeholder=" enter your truck's name"
          // onChange={props.inputChange}
        />
      </div> */}
      <div className={styles.inputGroup}>
        <label className={styles.label} for="email">
          Email
        </label>
        <input
          className={styles.input}
          maxlength="50"
          name="email"
          type="email"
          id="email"
          placeholder=" yourEmail@whatever.com"
          autoComplete="email"
          // onChange={props.inputChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} for="password">
          Password
        </label>
        <input
          className={styles.input}
          maxlength="20"
          name="password"
          type="password"
          id="password"
          placeholder=" enter password"
          autoComplete="current-password"
          // onChange={props.inputChange}
        />
        {/* <button onClick={props.logInSubmit} className={styles.submitBtn}>
        Submit
      </button> */}
      </div>
    </form>
  );
};
export default LogIn;

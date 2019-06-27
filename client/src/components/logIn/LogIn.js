import React, { useState } from "react";
import styles from "./LogIn.module.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [emailFailed, setEmailFailed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFailed, setPasswordFailed] = useState(false);
  return (
    <form className={styles.container}>
      <h1>Log In</h1>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          maxLength="50"
          name="email"
          type="email"
          id="email"
          placeholder=" yourEmail@whatever.com"
          autoComplete="email"
          // onChange={props.inputChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          maxLength="20"
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
      <input type="submit" className={styles.submitBtn} />
    </form>
  );
};
export default LogIn;

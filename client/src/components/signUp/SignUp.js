import React from "react";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <form className={styles.container}>
      <h1>Sign Up</h1>
      <div className={styles.inputGroup}>
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
      </div>
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
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} for="confirmPassword">
          Confirm Password
        </label>
        <input
          className={styles.input}
          maxLength="20"
          name="confirmPassword"
          type="password"
          id="confirmPassword"
          placeholder=" enter your password again"
          // onChange={props.inputChange}
        />
        <label className={styles.label}>Truck Details</label>
        <textarea
          className={styles.input}
          maxLength="200"
          type="text"
          name="blurb"
          placeholder=" describe your truck"
          rows="3"
        />
        {/* <button onClick={props.signupSubmit} className={styles.submitBtn}>
        Submit
      </button> */}
      </div>
    </form>
  );
};
export default SignUp;

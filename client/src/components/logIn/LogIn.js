import React, { useState, useContext } from "react";
import ownerApi from "../../utils/ownerApi";
import styles from "./LogIn.module.css";
import { AppContext } from "../store/store";
import { withRouter } from "react-router-dom";

const LogIn = props => {
  const { state, dispatch } = useContext(AppContext);
  const [email, setEmail] = useState("");
  // const [emailFailed, setEmailFailed] = useState(false);
  const [password, setPassword] = useState("");
  // const [passwordFailed, setPasswordFailed] = useState(false);

  const handleInputChange = (e, function_name) => {
    const newValue = e.target.value;
    function_name(newValue);
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    let regex = RegExp(/.+@.+\..+/);
    let validEmailFormat = regex.test(email);
    // console.log(validEmailFormat);
    if (!email || !validEmailFormat) {
      // setEmailFailed(true);
      return alert("Please enter a correctly formatted email address");
    } else if (!password) {
      // setPasswordFailed(true);
      return alert("Please enter a password.");
    }
    let userData = {
      email: email,
      password: password,
    };
    // console.log(userData);

    ownerApi.logIn(userData).then(response => {
      if (response.data.status === "error") {
        alert(response.data.message);
      } else {
        localStorage.setItem("foodTruckTrackerJwt", response.data.data.token);
        // console.log(response.data.data.user);
        setPassword("");
        dispatch({
          type: `login`,
          payload: {
            id: response.data.data.user._id,
            name: response.data.data.user.name,
            description: response.data.data.user.description,
            loggedIn: true,
          },
        });
        props.history.push(`/truckDashboard`);
      }
    });
  };
  return (
    <form
      className={styles.container}
      onSubmit={e => {
        handleLoginSubmit(e);
      }}
    >
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
          placeholder=" yourEmail@whatever.com"
          autoComplete="email"
          onChange={e => {
            handleInputChange(e, setEmail);
          }}
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
          placeholder=" enter password"
          autoComplete="current-password"
          onChange={e => {
            handleInputChange(e, setPassword);
          }}
        />
        {/* <button onClick={props.logInSubmit} className={styles.submitBtn}>
        Submit
      </button> */}
      </div>
      <input type="submit" className={styles.submitBtn} />
    </form>
  );
};
export default withRouter(LogIn);

import React, { useState, useContext } from "react";
import ownerApi from "../../utils/ownerApi";
import styles from "./SignUp.module.css";
import { AppContext } from "../store/store";

const SignUp = props => {
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [nameFailed, setNameFailed] = useState(false);
  const [email, setEmail] = useState("");
  const [emailFailed, setEmailFailed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFailed, setPasswordFailed] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFailed, setConfirmPasswordFailed] = useState(false);
  const [description, setDescription] = useState("");

  const handleInputChange = (e, function_name) => {
    const newValue = e.target.value;
    function_name(newValue);
  };

  const handleSignupSubmit = e => {
    e.preventDefault();
    let regex = RegExp(/.+@.+\..+/);
    let validEmailFormat = regex.test(email);
    // console.log(validEmailFormat);
    if (!name) {
      setNameFailed(true);
      return alert("Please enter a name.");
    } else if (!email || !validEmailFormat) {
      setEmailFailed(true);
      return alert("Please enter a correctly formatted email address");
    } else if (!password) {
      setPasswordFailed(true);
      return alert("Please enter a password.");
    } else if (!confirmPassword) {
      setConfirmPasswordFailed(true);
      return alert("Please confirm your password.");
    } else if (password !== confirmPassword) {
      setConfirmPassword("");
      setConfirmPasswordFailed(true);
      return alert("Your passwords do not match");
    }
    let userData = {
      name: name,
      email: email,
      password: password,
      description: description,
    };
    ownerApi.signUp(userData).then(response => {
      let userInfo = {
        email: email,
        password: password,
      };

      ownerApi
        .logIn(userInfo)
        .then(response => {
          if (response.data.status === "error") {
            alert(response.data.message);
          } else {
            localStorage.setItem(
              "foodTruckTrackerJwt",
              response.data.data.token
            );
            // console.log(response.data.user);
            setPassword("");
            setConfirmPassword("");
            dispatch({
              type: `login`,
              payload: {
                id: response.data.user._id,
                name: name,
                description: description,
                loggedIn: true,
              },
            });
          }
        })
        .then(res => {
          props.history.push(`/dashboard`);
        });
    });
  };

  return (
    <form
      className={styles.container}
      onSubmit={e => {
        handleSignupSubmit(e);
      }}
    >
      <h1>Sign Up</h1>
      <div className={styles.inputGroup}>
        <label htmlFor="username">Truck Name</label>
        <input
          className={`${styles.input} ${nameFailed ? styles.redBorder : null}`}
          maxLength="30"
          name="name"
          type="text"
          placeholder=" enter your truck's name"
          value={name}
          onClick={() => {
            if (nameFailed) {
              setNameFailed(false);
            }
          }}
          onChange={e => {
            handleInputChange(e, setName);
          }}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={`${styles.input} ${emailFailed ? styles.redBorder : null}`}
          maxLength="50"
          name="email"
          type="email"
          placeholder=" yourEmail@whatever.com"
          autoComplete="email"
          value={email}
          onClick={() => {
            if (emailFailed) {
              setEmailFailed(false);
            }
          }}
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
          className={`${styles.input} ${
            passwordFailed ? styles.redBorder : null
          }`}
          maxLength="20"
          name="password"
          type="password"
          placeholder=" enter password"
          autoComplete="current-password"
          value={password}
          onClick={() => {
            if (passwordFailed) {
              setPasswordFailed(false);
            }
          }}
          onChange={e => {
            handleInputChange(e, setPassword);
          }}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className={`${styles.input} ${
            confirmPasswordFailed ? styles.redBorder : null
          }`}
          maxLength="20"
          name="confirmPassword"
          type="password"
          placeholder=" enter your password again"
          value={confirmPassword}
          onClick={() => {
            if (confirmPasswordFailed) {
              setConfirmPasswordFailed(false);
            }
          }}
          onChange={e => {
            handleInputChange(e, setConfirmPassword);
          }}
        />
        <label className={styles.label}>Truck Details</label>
        <textarea
          className={styles.input}
          maxLength="200"
          type="text"
          name="description"
          placeholder=" describe your truck"
          rows="3"
          value={description}
          onChange={e => {
            handleInputChange(e, setDescription);
          }}
        />
        <input type="submit" className={styles.submitBtn} />
        {/* <button onClick={props.signupSubmit} className={styles.submitBtn}>
        Submit
      </button> */}
      </div>
    </form>
  );
};
export default SignUp;

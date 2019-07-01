import React, { useState, useContext } from "react";
import styles from "./UpdateDescription.module.css";
import ownerApi from "../../utils/ownerApi";
import { AppContext } from "../store/store";

const UpdateDescription = () => {
  const { state, dispatch } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(state.owner.description);

  const handleInputChange = (e, function_name) => {
    const newValue = e.target.value;
    function_name(newValue);
  };

  const addUpdateDescription = async (obj, authToken) => {
    ownerApi.updateDescription(obj, authToken).then(res => {
      console.log(res);
      ownerApi
        .getUser(state.owner.id, localStorage.foodTruckTrackerJwt)
        .then(response => {
          console.log(response);
          dispatch({
            type: `editDescription`,
            payload: {
              id: response.data._id,
              description: response.data.description,
              authToken: localStorage.foodTruckTrackerJwt,
            },
          });
        });
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Description</h3>
      <div
        className={styles.editBtn}
        onClick={() => {
          setEditing(!editing);
        }}
      >
        Edit
      </div>
      {editing ? (
        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
            setEditing(false);
            // console.log(state.owner.id);
            // ownerApi
            //   .getUser(state.owner.id, localStorage.foodTruckTrackerJwt)
            //   .then(res => {
            //     console.log(res);
            //   });
            // console.log(newDescription);
            let newObj = {
              id: state.owner.id,
              description: newDescription,
            };
            addUpdateDescription(newObj, localStorage.foodTruckTrackerJwt);
          }}
        >
          <textarea
            className={styles.textarea}
            value={newDescription}
            onChange={e => {
              handleInputChange(e, setNewDescription);
            }}
            maxLength="200"
            type="text"
            name="description"
            rows="6"
          />
          <input type="submit" className={styles.submitBtn} />
        </form>
      ) : (
        <div className={styles.content}>{state.owner.description}</div>
      )}
    </div>
  );
};

export default UpdateDescription;

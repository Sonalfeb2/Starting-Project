import React, { useState, useRef } from "react";
import Wrappers from "../Helpers/Wrapper";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = props => {
  const [error, setError] = useState();
  const nameInputRef = useRef("");
  const ageInputRef = useRef("");
  const collegeInputRef = useRef("");
  const addUserHandler = event => {
    event.preventDefault();
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    const collegeName = collegeInputRef.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0||collegeName.trim().length===0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)."
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0)."
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge,collegeName);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    collegeInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <Wrappers>
      {error &&
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number"  ref={ageInputRef} />
          <label htmlFor="collegename">College Name</label>
          <input id="collegename" type="text"  ref={collegeInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrappers>
  );
};

export default AddUser;

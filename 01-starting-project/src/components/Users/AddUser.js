import React, { useRef, useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const enteredUsername = useRef();
  const enteredAge = useRef();
  const enteredCollege = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const userName = enteredUsername.current.value;
    const userAge = enteredAge.current.value;
    const userCollege = enteredCollege.current.value;
    console.log(userCollege);
    if (
      userName.trim().length === 0 ||
      userAge.trim().length === 0 ||
      userCollege.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+userAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(userName, userAge, userCollege);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={enteredUsername} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={enteredAge} />
          <label htmlFor="college">College Name</label>
          <input id="college" type="text" ref={enteredCollege} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;

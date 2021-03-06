import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import { useRef, useState } from "react";
import Modal from "../UI/Modal";

const AddUser = (props) => {
  const nameInp = useRef();
  const ageInp = useRef();
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const onCancelHandler = () => {
    setIsError(false);
  };
  const addUserHandler = (event) => {
    const name = nameInp.current.value;
    const age = ageInp.current.value;
    event.preventDefault();
    if (!name.trim() && !age.trim()) {
      setIsError(true);
      setTitle("Invalid Input");
      setMessage("Please enter name and age");
      return;
    }
    if (+age <= 0) {
      setIsError(true);
      setTitle("Invalid Age");
      setMessage("Please enter a valid age");
      return;
    }
    props.onAddUser({ name, age, id: Math.random().toString() });
    nameInp.current.value = "";
    ageInp.current.value = "";
  };
  return (
    <div>
      {isError && (
        <Modal
          onCancel={onCancelHandler}
          title={title}
          message={message}
        ></Modal>
      )}
      {!isError && (
        <Card className={classes.input}>
          <form onSubmit={addUserHandler}>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" ref={nameInp} />
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" ref={ageInp}></input>
            </div>
            <Button type="submit">Add User</Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default AddUser;

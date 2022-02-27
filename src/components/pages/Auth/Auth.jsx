import React, { useEffect } from "react";
import ReactSelect from "react-select";
import Layout from "../../Layout/Layout";
import newWorkoutImg from "../../../images/new-workout.jpg";
import styles from "./Auth.module.scss";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../ui/Alert/Alert";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "log") {
      setError(true);
      console.log("log");
    } else {
      console.log("sing");
      setError(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setError(false), 2000);
  }, [error]);

  return (
    <>
      <Layout
        bgImg={newWorkoutImg}
        heading="Authorization / Authentication"
      ></Layout>

      <form className={styles.wrapper} onSubmit={handleSubmit}>
        {error && <Alert type="success" msg="You are been successfully" />}
        {/* <Alert type='warning' msg='warning'/>
          <Alert type='info' msg='info'/> */}
        <Field
          placeholder="Enter Name"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Field
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={styles.wrapperButton}>
          <Button appearance="small" onClick={() => setType("log")}>
            Log in
          </Button>
          <Button
            className={styles.singup}
            appearance="small"
            onClick={() => setType("sing")}
          >
            Sing up
          </Button>
        </div>
      </form>
    </>
  );
}

export default Auth;

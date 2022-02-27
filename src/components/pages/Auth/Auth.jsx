import React from "react";
import Layout from "../../Layout/Layout";
import newWorkoutImg from "../../../images/new-workout.jpg";
import styles from "./Auth.module.scss";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import { useState } from "react";
import Alert from "../../ui/Alert/Alert";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Loader from "../../ui/Loader/Loader";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const {mutate: register, isLoading, error} = useMutation('Registration', () => $api({
     url: '/users',
     body: {email, password}, 
     type: "POST",
     auth: false
    }),{
      onSuccess(data){
        console.log((data))
      }
    }
    
    )

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "log") {
      console.log('ВХОД')
    } else {
      register()
    }
  };

console.log('error',error)
  return (
    <>
      <Layout
        bgImg={newWorkoutImg}
        heading="Authorization / Authentication"
      ></Layout>

      <form className={styles.wrapper} onSubmit={handleSubmit}>
        {error && <Alert type="error" msg={error} />}
        {/* <Alert type='warning' msg='warning'/>
          <Alert type='info' msg='info'/> */}
        {isLoading && <Loader/>}  
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

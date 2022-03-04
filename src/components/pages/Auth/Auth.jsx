import React, { useContext, useEffect } from "react";
import Layout from "../../Layout/Layout";
import newWorkoutImg from "../../../images/new-workout.jpg";
import styles from "./Auth.module.scss";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import { useState } from "react";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { FirebaseAuthContext } from "../../contexts/firebaseAuth";
import { useAuth } from "../../hooks/useAuth";

const Auth = () => {

  const auth = useContext(FirebaseAuthContext)

  const {isAuth, setIsAuth} = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const [type, setType] = useState("sing");

  const [successAuth, setSuccessAuth] = useState(false)
  const [successSing, setSuccessSing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true)
    setError(false)

    if (type === "log") {
       signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('USER-login',user)
        setIsLoading(false)
        setSuccessAuth(true)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setError(true)
        setIsLoading(false)
      });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('USER-Sing',user)
        setIsLoading(false)
        setSuccessSing(true)
        setIsAuth(true)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setError(true)
        setIsLoading(false)
      });
     
    }
  };
  useEffect(() => {
    if (successAuth || successSing){
      setTimeout(()=> {
        setSuccessAuth(false)
        setSuccessSing(false)
      }, 3000)
    }

  }, [successAuth,successSing])

  return (
    <>
      <Layout
        bgImg={newWorkoutImg}
        heading="Authorization / Authentication"
      ></Layout>

      <form className={styles.wrapper} onSubmit={handleSubmit}>
        {error && <Alert type="error" msg={errorMessage} />}
        {successAuth && <Alert type="success" msg='Успешный вход' />}
        {successSing && <Alert type="success" msg='Успешная регистрация' />}
        {/* <Alert type='warning' msg='warning'/>
          <Alert type='info' msg='info'/> */}
        {isLoading && <Loader/>}  
        <Field
          placeholder="Enter E-mail"
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

import { useEffect } from "react";
import Layout from "../../Layout/Layout";
import authImg from "../../../images/auth-img.jpg";
import styles from "./Auth.module.scss";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import { useState } from "react";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setUserEmail, setLoading, setError } from "../../../redux/appSlice";

import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from "firebase/firestore";

import { db } from "../../../index";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const auth = getAuth();
    let navigate = useNavigate();

    const collectionStatistic = collection(db, "statistic");

    const { error, loading } = useSelector(state => state.app);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [successAuth, setSuccessAuth] = useState(false);
    const [successSing, setSuccessSing] = useState(false);

    const handleSingUp = e => {
        e.preventDefault();

        dispatch(setError(false));
        dispatch(setLoading(true));

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("USER-Sing", user);
                dispatch(setLoading(false));
                setSuccessSing(true);
                setEmail("");
                setPassword("");
            })
            .catch(error => {
                setErrorMessage(error.message);
                dispatch(setError(true));
                dispatch(setLoading(false));
            });
    };

    const handleLogin = e => {
        e.preventDefault();

        dispatch(setLoading(true));
        dispatch(setError(false));

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                dispatch(setIsAuth(true));
                const user = userCredential.user;

                localStorage.setItem("email", `${user.email}`);
                dispatch(setUserEmail(user.email));

                dispatch(setLoading(false));
                setSuccessAuth(true);
                setEmail("");
                setPassword("");
            })
            .then(() => {
                const q = query(collectionStatistic, where("email", "==", `${localStorage.getItem("email")}`));
                onSnapshot(q, snapshot => {
                    if (snapshot.docs.length === 0) {
                        addDoc(collectionStatistic, {
                            email: localStorage.getItem("email"),
                            minutes: 0,
                            level: "HARD",
                            up: 0,
                            createdAt: serverTimestamp(),
                            exersices: [],
                            workout: [],
                        }).then(() => console.log("Успешное добавление статистики:", localStorage.getItem("email")));
                    }
                });
            })
            .catch(error => {
                setErrorMessage(error.message);
                dispatch(setError(true));
                dispatch(setLoading(false));
            });
    };

    useEffect(() => {
        if (successAuth || successSing) {
            setTimeout(() => {
                setSuccessAuth(false);
                setSuccessSing(false);
                navigate("/");
            }, 1500);
        }
        // eslint-disable-next-lines
    }, [successAuth, successSing, navigate]);

    useEffect(() => {
        return () => {
            dispatch(setError(false));
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Layout bgImg={authImg} heading="Authorization / Authentication"></Layout>

            <div className={styles.wrapper}>
                {error && <Alert type="error" msg={errorMessage} />}
                {successAuth && <Alert type="success" msg="Успешный вход" />}
                {successSing && <Alert type="success" msg="Успешная регистрация" />}

                {loading && <Loader />}
                <Field placeholder="Enter E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Field placeholder="Enter Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

                <div className={styles.wrapperButton}>
                    <Button appearance="small" onClick={handleLogin}>
                        Войти
                    </Button>
                    <Button className={styles.singup} appearance="small" onClick={handleSingUp}>
                        Зарегистрироваться
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Auth;

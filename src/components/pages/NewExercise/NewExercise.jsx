import { useEffect } from "react";
import Layout from "../../Layout/Layout";
import newExersiceImg from "../../../images/new-exersice.jpg";
import styles from "./NewExercise.module.scss";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import { useState } from "react";
import shoulders from "../../../images/exersice/shoulders.svg";
import legs from "../../../images/exersice/legs.svg";
import chest from "../../../images/exersice/chest.svg";
import hit from "../../../images/exersice/hit.svg";
import biceps from "../../../images/exersice/biceps.svg";
import cn from "classnames";

import { db } from "../../../index";

import { updateDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../../../redux/appSlice";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";

const data = [
    { image: chest, name: "chest" },
    { image: shoulders, name: "shoulders" },
    { image: biceps, name: "biceps" },
    { image: legs, name: "legs" },
    { image: hit, name: "hit" },
];

function NewExercise() {
    // const collectionStatistic = collection(db, "statistic");
    const { loading, error, documentId } = useSelector(state => state.app);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [times, setTimes] = useState(3);
    const [imageName, setImageName] = useState(data[0].name);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        dispatch(setLoading(true));
        dispatch(setError(false));

        if (name && times && imageName) {
            const docRef = doc(db, "statistic", localStorage.getItem("documentId") || documentId);
            updateDoc(docRef, {
                exersices: [
                    {
                        nameExersice: name,
                        times: times,
                        imageName: imageName,
                    },
                ],
            })
                .then(() => {
                    dispatch(setLoading(false));
                    setSuccess(true);
                })
                .catch(error => {
                    dispatch(setLoading(false));
                    setErrorMessage(error.message);
                    dispatch(setError(true));
                });
        }
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 1500);
        }
    }, [success]);

    useEffect(() => {
        return () => {
            dispatch(setError(false));
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Layout bgImg={newExersiceImg} heading="Create New Exercise"></Layout>

            <form className={styles.wrapper} onSubmit={onSubmit}>
                {error && <Alert type="error" msg={errorMessage.split(":")[0]} />}
                {success && <Alert type="success" msg="Тренировка добавлена" />}
                {loading && <Loader />}
                <Field placeholder="Enter Name" type="text" value={name} required onChange={e => setName(e.target.value)} />
                <Field placeholder="Enter Times" type="number" value={times} required onChange={e => setTimes(e.target.value)} />
                <div className={styles.images}>
                    {data.map(el => (
                        <img
                            className={cn(styles.image, {
                                [styles.active]: el.name === imageName,
                            })}
                            key={el.name}
                            src={el.image}
                            alt={el.name}
                            onClick={() => setImageName(el.name)}
                        />
                    ))}
                </div>
                <Button style={{ marginTop: "30px" }} appearance="small">
                    Create
                </Button>
            </form>
        </>
    );
}

export default NewExercise;

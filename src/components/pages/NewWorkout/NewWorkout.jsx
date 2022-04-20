import ReactSelect from "react-select";
import Layout from "../../Layout/Layout";
import newWorkoutImg from "../../../images/new-workout.jpg";
import styles from "./NewWorkout.module.scss";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../../../redux/appSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import { db } from "../../..";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";

function NewWorkout() {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const { userStatitic, loading, error, documentId } = useSelector(state => state.app);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [exercisesCurrent, setExercisesCurrent] = useState([]);

    const onSubmit = e => {
        e.preventDefault();

        dispatch(setLoading(true));
        dispatch(setError(false));

        console.log({ name, exercisesCurrent });

        if (name && exercisesCurrent.length) {
            const docRef = doc(db, "statistic", localStorage.getItem("documentId") || documentId);
            if (docRef) {
                updateDoc(docRef, {
                    workout: arrayUnion({
                        id: uuidv4(),
                        name,
                        exercisesCurrent,
                    }),
                })
                    .then(() => {
                        dispatch(setLoading(false));
                        setSuccess(true);
                        setName("");
                        setExercisesCurrent([]);
                    })
                    .catch(error => {
                        dispatch(setLoading(false));
                        setErrorMessage(error.message);
                        dispatch(setError(true));
                    });
            }
        } else {
            dispatch(setLoading(false));
            setErrorMessage("Выберите упражнение");
            dispatch(setError(true));
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
            <Layout bgImg={newWorkoutImg} heading="Create New Workout"></Layout>

            <form className={styles.wrapper} onSubmit={onSubmit}>
                {error && <Alert type="error" msg={errorMessage.split(":")[0]} />}
                {success && <Alert type="success" msg="Тренировка успешно добавлена" />}
                {loading && <Loader />}
                <Field placeholder="Enter Name" type="text" value={name} required onChange={e => setName(e.target.value)} />
                <Link className={styles.link} to="/new-exersice">
                    Add new exercise
                </Link>
                <ReactSelect
                    classNamePrefix="select2-selection"
                    placeholder="Exersice..."
                    title="Exersice"
                    options={userStatitic.exersices ? userStatitic.exersices.map(el => ({ value: el.id, label: el.nameExersice })) : []}
                    value={exercisesCurrent}
                    onChange={setExercisesCurrent}
                    isMulti
                />
                <Button style={{ marginTop: "30px" }} appearance="small">
                    Create
                </Button>
            </form>
        </>
    );
}

export default NewWorkout;

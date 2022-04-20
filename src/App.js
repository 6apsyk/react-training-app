import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
import Auth from "./components/pages/Auth/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDocumentId, setIsAuth, setUserEmail, setUserStatistic } from "./redux/appSlice";
import NewExercise from "./components/pages/NewExercise/NewExercise";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from ".";

function App() {
    const dispatch = useDispatch();
    const auth = getAuth();
    const collectionStatistic = collection(db, "statistic");
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log("Пользователь вошёл", user);
            // const uid = user.uid;
        } else {
            console.log("Пользователь вышёл или не заходил");
        }
    });

    useEffect(() => {
        const email = localStorage.getItem("email");

        async function getDocument() {
            if (email) {
                dispatch(setUserEmail(email));
                dispatch(setIsAuth(true));
                const q = query(collectionStatistic, where("email", "==", `${email}`));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    dispatch(setDocumentId(doc.id));
                    localStorage.setItem("documentId", doc.id);
                    const { minutes, level, up, exersices, workout } = doc.data();
                    console.log(minutes, level, up, exersices, workout);
                    dispatch(setUserStatistic({ minutes, level, up, exersices, workout }));
                });
            }
        }

        getDocument();

        // eslint-disable-next-line
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-workout" element={<NewWorkout />} />
                <Route path="/new-exersice" element={<NewExercise />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

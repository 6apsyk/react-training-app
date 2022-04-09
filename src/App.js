import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
import Auth from "./components/pages/Auth/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuth, setUserEmail } from "./redux/appSlice";
import NewExercise from "./components/pages/NewExercise/NewExercise";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
    const dispatch = useDispatch();
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log("Пользователь вошёл", user);
            // const uid = user.uid;
        } else {
            console.log("Пользователь вышёл");
        }
    });

    useEffect(() => {
        const email = localStorage.getItem("email");

        if (email) {
            dispatch(setUserEmail(email));
            dispatch(setIsAuth(true));
        }
        // eslint-disable-next-line
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home auth={auth} />} />
                <Route path="/new-workout" element={<NewWorkout auth={auth} />} />
                <Route path="/new-exersice" element={<NewExercise auth={auth} />} />
                <Route path="/auth" element={<Auth auth={auth} />} />
                <Route path="*" element={<Home auth={auth} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

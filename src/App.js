import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
import Auth from "./components/pages/Auth/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuth, setUserEmail } from "./redux/appSlice";

function App() {
  const dispatch = useDispatch();

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
        <Route path="/" element={<Home />} />
        <Route path="/new-workout" element={<NewWorkout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

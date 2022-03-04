import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
import Auth from "./components/pages/Auth/Auth";
import { useState } from "react";
import { AuthContext } from "./components/contexts/AuthContext";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-workout" element={<NewWorkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

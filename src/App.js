import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-workout" element={<NewWorkout />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

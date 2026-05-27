import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import InterviewDetails from "./pages/InterviewDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/result" element={<Result />} />
        <Route path="/interview/:id" element={<InterviewDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

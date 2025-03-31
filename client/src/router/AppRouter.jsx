import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UploadResume from "../pages/UploadResume"
import Register from "../pages/Register";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/upload" element={<UploadResume />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;
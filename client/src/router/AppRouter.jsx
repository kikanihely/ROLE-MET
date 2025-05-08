import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UploadResume from "../pages/UploadResume"
import Register from "../pages/Register";
import Login from "../pages/Login";
import MainRegister from "../pages/MainRegister";
import RegisterCompany from "../pages/RegisterCompany";
import Dashboard from "../pages/Dashboard";
import CompanyDashboard from "../component/CompanyDashboard";
import AddJob from "../component/AddJob";
import EditJob from "../component/EditJob";
import ProfilePage from "../pages/ProfilePAge";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/upload" element={<UploadResume />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/mainRegister" element={<MainRegister />} /> 
        <Route path="/registerCompany" element={<RegisterCompany />} /> 
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
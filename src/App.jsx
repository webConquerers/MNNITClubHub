import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin'; 
import RegUser from "./pages/RegUser";
import AdminDashboard from "./AdminDashboard";
import UserPage from "./pages/UserPage";
import UserClubs from "./pages/UserClubs";
import ClubOverview from "./pages/ClubOverview"
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginUser" element={<LoginUser />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/RegUser" element={<RegUser/>}/>
          <Route path="/UserPage" element={<UserPage/>}/>
          <Route path="/UserClubs" element={<UserClubs/>}/>
          <Route path="/ClubOverview" element={<ClubOverview/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

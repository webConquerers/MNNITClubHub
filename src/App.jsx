import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginUser from "./pages/LoginUser";

import RegUser from "./pages/RegUser";
import AdminDashboard from "./AdminDashboard";
import UserPage from "./pages/UserPage";
import UserClubs from "./pages/UserClubs";
import ClubOverview from "./pages/ClubOverview";

import EventAdd from "./pages/EventAdd";
import EmailVerify from "./pages/EmailVerify";
import OAuthSuccess from "./pages/OAuthSuccess";
import ForgotPassword from "./components/ForgotPassword";
import VerifyResetOtp from "./components/VerifyResetOtp";
import ResetPassword from "./components/ResetPassword";
function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginUser" element={<LoginUser />} />
          <Route path="/verifyEmail" element={<EmailVerify />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/RegUser" element={<RegUser />} />
          <Route path="/UserPage" element={<UserPage />} />
          <Route path="/UserClubs/:userId" element={<UserClubs />} />
          <Route path="/ClubOverview" element={<ClubOverview />} />
          <Route path="/addAnnouncement" element={<EventAdd />} />
          <Route path="/club/:clubId" element={<ClubOverview />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path ="/ForgotPassword" element ={<ForgotPassword />} />
          <Route path="/addEvent/:clubId" element={<EventAdd />} />
          
          <Route path="/verify-reset" element={<VerifyResetOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

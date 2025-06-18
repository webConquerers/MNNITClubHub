// pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAuthToken, storeUserSession } from "../../server/utils/authUtils";
import { toast } from "react-toastify";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userName = params.get("userName");
    const userId = params.get("userId");

    if (token && userName && userId) {
      saveAuthToken(token);
      storeUserSession(userName, userId);

      toast.success("Google Login Successful!");
      setTimeout(() => navigate("/UserPage"), 1000);
    } else {
      toast.error("OAuth login failed.");
      navigate("/LoginUser");
    }
  }, []);

  return <div className="text-white text-xl ">Logging you in...</div>;
};

export default OAuthSuccess;

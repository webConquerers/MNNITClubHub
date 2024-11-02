import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SingnUpPage from './SignUp';

const Navbar = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginOptions((prev) => !prev);
  };

  const handleLoginAsUser = () => {
    console.log("Logging in as User");
    // Perform user login logic here
    navigate('./LoginPage'); // Redirect to user dashboard
  };

  const handleLoginAsAdmin = () => {
    console.log("Logging in as Admin");
    // Perform admin login logic here
    navigate("./LoginPage"); // Redirect to admin dashboard
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.dropdown') === null) {
        setShowLoginOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-green-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">MNNITClubHub</h1>
      <div className="relative dropdown">
        <button
          className="bg-white text-green-900 px-4 py-2 rounded"
          onClick={handleLoginClick}
        >
          Login
        </button>
        {showLoginOptions && (
          <div className="absolute bg-white text-green-900 mt-2 rounded shadow-md">
            <button
              className="block px-4 py-2 hover:bg-green-100 w-full text-left"
              onClick={handleLoginAsUser}
            >
              Register as User
            </button>
            <button
              className="block px-4 py-2 hover:bg-green-100 w-full text-left"
              onClick={handleLoginAsAdmin}
            >
              Register as Admin
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

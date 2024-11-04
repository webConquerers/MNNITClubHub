import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginOptions((prev) => !prev);
  };

  const handleLoginAsUser = () => {
    console.log("Logging in as User");
    navigate('./LoginUser'); 
  };

  const handleLoginAsAdmin = () => {
    console.log("Logging in as Admin");
    // Perform admin login logic here
    navigate("./LoginAdmin"); // Redirect to admin dashboard
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
    <nav className="bg-sky-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">MNNITClubHub</h1>
      <div className="relative dropdown">
        <button
          className="bg-white text-sky-900 px-4 py-2 rounded"
          onClick={handleLoginClick}
        >
          Login
        </button>
        {showLoginOptions && (
          <div className="absolute bg-white text-sky-900 mt-2 rounded shadow-md">
            <button
              className="block px-4 py-2 hover:bg-sky-100 w-full text-left"
              onClick={handleLoginAsUser}
            >
              User
            </button>
            <button
              className="block px-4 py-2 hover:bg-sky-100 w-full text-left"
              onClick={handleLoginAsAdmin}
            >
              Admin
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';

const Navbar = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const handleLoginClick = () => {
    setShowLoginOptions((prev) => !prev);
  };

  const handleLoginAsUser = () => {
    console.log("Logging in as User");
  };

  const handleLoginAsAdmin = () => {
    console.log("Logging in as Admin");
  };

  return (
    <nav className="bg-green-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">MNNITClubHub</h1>
      <div>
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
              Login as User
            </button>
            <button
              className="block px-4 py-2 hover:bg-green-100 w-full text-left"
              onClick={handleLoginAsAdmin}
            >
              Login as Admin
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

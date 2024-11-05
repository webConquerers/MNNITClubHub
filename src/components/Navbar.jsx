
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('./LoginUser');
  };

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
        
      </div>
    </nav>
  );
};

export default Navbar;

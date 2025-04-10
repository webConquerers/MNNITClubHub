
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('./LoginUser');
  };
  const handleSignupClick =() => {
    navigate('/RegUser')
  }

  return (
    <nav className="bg-sky-900 text-white pt-4 flex justify-between">
      <h1 className="text-xl font-bold">MNNITClubHub</h1>
      <div className="relative dropdown">
        <button
          className="bg-white text-sky-900 py-2 rounded "
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className="bg-white text-sky-900 px-4 py-2 rounded"
          onClick={handleSignupClick}
        >
          SignUp
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;

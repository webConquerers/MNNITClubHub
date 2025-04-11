import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import CreateClub from "./ClubCreateForm";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [isFormOpen, setFormOpen] = useState(false);
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/clubs/${storedUserId}`
        );
        setClubs(response.data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        toast.error("Failed to load clubs.");
      }
    };

    fetchClubs();
  }, [storedUserId]);

  const HandleJoin = async (clubId) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/request/join/${clubId}`,{userId:storedUserId})
      alert(res.data.message)
    } catch (error) {
      alert(error.response.data.message || "Something went wrong")
    }
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col bg-gray-900 text-gray-100">
      <div className="bg-[url('assets/icon.webp')] bg-cover bg-center w-full h-[800px]">
        <div className="bg-black/70">
          <div className="bg-cover bg-center w-full h-[800px]">
            <nav className="bg-sky-900 text-white p-4 flex justify-between">
              <h1 className="text-xl font-bold">MNNITClubHub</h1>
              <div className="flex justify-between">
                <a href={`/UserClubs/${storedUserId}`}>
                  <button className="text-lg text-white font-serif font-normal py-0">
                    Your Clubs
                  </button>
                </a>

                <button
                  
                  className="px-6 flex items-center space-x-2 py-0"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>{userName || "User"}</span>
                </button>
              </div>
            </nav>

            <main className="flex-grow p-8">
              <section className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-sky-400 mb-4">
                  Welcome to MNNITClubHub
                </h1>
                <p className="text-xl text-gray-300">
                  Connect with clubs, manage events, and track your journey!
                </p>

                <button
                  className="flex mt-4 text-lg font-bold h-8 text-center text-blue-500 bg-black rounded-xl hover:bg-blue-500 hover:translate-y-0.5 hover:text-black"
                  onClick={() => setFormOpen(true)}
                >
                  <Plus className="h-5" />
                  Create Club
                </button>
              </section>

              <div style={{ display: isFormOpen ? "block" : "none" }}>
                <CreateClub onClose={() => setFormOpen(false)} />
              </div>

              <section className="mt-12">
                <h2 className="text-3xl font-semibold text-center text-sky-400 mb-6">
                  College Clubs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {clubs.map((club) => (
                    <div
                      key={club.id}
                      className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      <h3 className="text-xl font-bold text-sky-400 mb-2">
                        {club.name}
                      </h3>
                      <p className="text-gray-300 mb-4">{club.description}</p>
                      <div className="flex ">
                        <a href={`/club/${club._id}`}>
                          <button className="bg-sky-700 text-gray-100 px-4 py-2 rounded hover:bg-sky-500">
                            View
                          </button>
                        </a>
                        <div className="pl-0.5 ">
                          <button className=" bg-black h-10 hover:-translate-y-1 hover:bg-blue-500 rounded-lg px-2"
                          onClick={()=> HandleJoin(club._id)}>
                            Join{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              
            </main>
            <Footer className="bottom-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

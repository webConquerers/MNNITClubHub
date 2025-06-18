import  { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";
import AdminSection from "./Dashboard/userAdminClubs";
import { useParams } from "react-router-dom";

const HomePage = () => {
  
  const [userName, setUserName] = useState("");
  const [clubRequests, setClubRequests] = useState([]);
  const token = useParams();
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
    if (storedName) setUserName(storedName);

    const fetchClubRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/user/club-requests/${userId}`,
           {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClubRequests(res.data);
      } catch (err) {
        console.error("Error fetching club requests:", err);
      }
    };

    fetchClubRequests();
  }, []);



  const EditProfile = () => {
    console.log("user profile");
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col bg-gray-900 text-gray-100">
      <div className="bg-[url('assets/icon.webp')] bg-cover bg-center w-full h-[800px]">
        <div className="bg-black/70">
          <div className="bg-cover bg-center w-full h-[800px]">
            <nav className="bg-sky-900 text-white p-4 flex justify-between">
              <h1 className="text-xl font-bold">MNNITClubHub</h1>
              <div className="flex justify-between">
                <button
                  onClick={EditProfile}
                  className="px-6 flex items-center space-x-2"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>{userName || "User"}</span>
                </button>
              </div>
            </nav>

            <main className="flex-grow p-8 w-full">
              {/* Club Join Requests */}
              <section className="mt-12">
                <h2 className="text-3xl font-semibold text-center text-sky-400 mb-6">
                  Your Club Join Requests
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {clubRequests.map((club, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-bold text-sky-400 mb-2">
                        {club.name}
                      </h3>
                      <p className="text-gray-300 mb-2">{club.description}</p>
                      <p
                        className={`font-semibold ${
                          club.status === "approved"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        Status: {club.status}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
          <section className="">
                <AdminSection userId={localStorage.getItem("userId")} />
              </section>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

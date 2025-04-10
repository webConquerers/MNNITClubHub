import React, { useState, useEffect }  from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName); 
  }, []);
  const HandleClubs = () => {
    console.log("happening");
    navigate("/ClubOverview");
  };
  const EditProfile=()=>{
    console.log("user profile");
    navigate("/Profile")
  }
  const clubs = [
    {
      name: "Robotics Club",
      description:
        "Explore robotics and automation with hands-on projects and competitions.",
    },
    {
      name: "Computer Coding Club",
      description:
        "Join us for coding challenges, hackathons, and learning new programming languages.",
    },
    {
      name: "Aero Club",
      description:
        "Discover the world of aviation through workshops, seminars, and flying events.",
    },
  ];

  const upcomingEvents = [
    {
      title: "Robotics Workshop",
      date: "2024-11-10",
      time: "10:00 AM",
    },
    {
      title: "Coding Hackathon",
      date: "2024-11-15",
      time: "9:00 AM",
    },
    {
      title: "Aero Club Open House",
      date: "2024-11-20",
      time: "1:00 PM",
    },
  ];

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
              <section className="mt-12">
                <h2 className="text-3xl font-semibold text-center text-sky-400 mb-6">
                  Your Clubs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {clubs.map((club, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      <h3 className="text-xl font-bold text-sky-400 mb-2">
                        {club.name}
                      </h3>
                      <p className="text-gray-300 mb-4">{club.description}</p>
                      <button
                        className="bg-sky-700 text-gray-100 px-4 py-2 rounded hover:bg-sky-500"
                        onClick={HandleClubs}
                      >
                        See Club Discussions
                      </button>
                    </div>
                  ))}
                </div>
              </section>
              <section className="">
                if(userId==)
              </section>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

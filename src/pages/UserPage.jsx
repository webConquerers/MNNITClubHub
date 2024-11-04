import React from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const HandleClubs = () => {
    console.log("hapeening");
    navigate("/UserClubs");
  };
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
                  onClick={HandleClubs}
                  className="text-lg text-white font-serif font-normal"
                >
                  Your Clubs
                </button>
                <button
                  onClick={HandleClubs}
                  className="px-6 flex items-center space-x-2"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Shourya</span>
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
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-semibold text-center text-sky-400 mb-6">
                  College Clubs
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
                      <button className="bg-sky-700 text-gray-100 px-4 py-2 rounded hover:bg-sky-500">
                        Join Club
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-semibold text-center text-sky-400 mb-6">
                  Upcoming Events
                </h2>
                <div className="bg-gray-800 shadow-md rounded-lg p-6">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr>
                        <th className="border-b-2 border-sky-700 p-2 text-gray-200">
                          Event
                        </th>
                        <th className="border-b-2 border-sky-700 p-2 text-gray-200">
                          Date
                        </th>
                        <th className="border-b-2 border-sky-700 p-2 text-gray-200">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingEvents.map((event, index) => (
                        <tr key={index} className="border-b border-gray-600">
                          <td className="p-2 text-gray-300">{event.title}</td>
                          <td className="p-2 text-gray-300">{event.date}</td>
                          <td className="p-2 text-gray-300">{event.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
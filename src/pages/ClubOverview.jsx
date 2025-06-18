import { useEffect, useState } from "react";
import { Users, Calendar, Bell, Mail, Github, Plus } from "lucide-react";


import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import ChatsSection from "./ChatSection";
import { toast } from "react-toastify";

function Clubs() {
  const [isJoined, setIsJoined] = useState(true);
  const { clubId } = useParams();
  const [clubName, setClubName] = useState("");
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchClubsData() {
      try {
        const res = await axios.get(`http://localhost:3001/api/clubs/${clubId}/data`);
        setClubName(res.data.name || "Club Name");
        setMembers(Array.isArray(res.data.members) ? res.data.members : []);
        setDescription(res.data.description || "No description available");
      } catch (err) {
        console.error("Failed to fetch Clubs", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchClubsData();
  }, [clubId]);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/announcements/${clubId}/clubAnnouncements`
        );
        setEvents(Array.isArray(res.data.announcements) ? res.data.announcements : []);
      } catch (error) {
        console.error("Failed to fetch events", error);
        setEvents([]);
      }
    }
    fetchAnnouncements();
  }, [clubId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-600 to-gray-100 flex items-center justify-center">
        <div className="text-white text-2xl">Loading club data...</div>
      </div>
    );
  }

  const handleLeaveClub = async () => {
    try {
      await axios.post(`http://localhost:3001/api/clubs/${clubId}/leave`, {
        userId,
      });
      
      setIsJoined(false);
      // Optionally, refetch members to update UI
      if (!isJoined) {
              toast.success("Leaved !!!", { autoClose: 3000 });
      
             
      
              setTimeout(() => {
                Navigate("/UserPage" ); // Navigate after a short delay
              }, 500); // Ensures localStorage is updated before navigating
            } 
          
  
    } catch (error) {
      console.error("Failed to leave club", error);
      alert("Failed to leave club. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-600 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Github className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{clubName}</h1>
                <p className="text-blue-100">{description}</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (isJoined) {
                  handleLeaveClub();
                } else {
                  // You can implement join functionality here if needed
                  setIsJoined(true);
                }
              }}
              className="px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 bg-red-500 hover:bg-red-600"
            >
              {isJoined ? "Leave Club" : "Join Club"}
           </button>

          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Announcements + Discussions (ChatsSection) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Announcements */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Bell className="h-6 w-6 mr-2 text-blue-600" />
                  Announcements
                </h2>
              </div>
              {events.length === 0 ? (
                <div className="text-blue-700">No announcements yet.</div>
              ) : (
                events.map((event) => (
                  <div
                    key={event._id || Math.random()}
                    className="border-b last:border-b-0 pb-4 last:pb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors"
                  >
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {event.title || "Untitled Announcement"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{event.content || "No content"}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Posted on{" "}
                      {event.createdAt
                        ? new Date(event.createdAt).toLocaleString()
                        : "Unknown date"}
                    </p>
                    {event.registerLink && (
                      <a
                        href={event.registerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Register →
                      </a>
                    )}
                  </div>
                ))
              )}
            </section>

            {/* Discussions: ChatsSection component */}
            <ChatsSection clubId={clubId} userId={userId} />
          </div>

          {/* Right Sidebar: Events, Members, Contact */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Upcoming Events
                </h2>
                <a href={`/addEvent/${clubId}`}>
                  <button className="flex items-center text-sm font-bold bg-blue-300 border-black/10 rounded-full hover:shadow-md hover:translate-y-0.5 hover:bg-blue-500 px-3 py-1">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </button>
                </a>
              </div>
              <p className="text-gray-500 text-sm">(Events shown via announcements)</p>
            </section>

            {/* Members */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Members
              </h2>
              <div className="space-y-4">
                {members.length > 0 ? (
                  members.map((member, index) => (
                    <div
                      key={member._id || index}
                      className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={`https://ui-avatars.com/api/?name=${member.user?.name || "User"}`}
                          alt={member.user?.name || "User"}
                          className="w-10 h-10 rounded-full ring-2 ring-blue-100"
                        />
                        <span
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                            member.status === "online"
                              ? "bg-green-500"
                              : member.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {member.user?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500">{member.role || "Member"}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No members found</p>
                )}
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Contact
              </h2>
              <p>Email: club-contact@example.com</p>
              <p>Phone: +1 234 567 8900</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clubs;

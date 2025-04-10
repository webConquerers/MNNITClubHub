import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  MessageSquare,
  Bell,
  Mail,
  Github,
  Star,
  Plus,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Clubs() {
  const [isJoined, setIsJoined] = useState(false);

  const { clubId } = useParams(); // get from route like `/club/:clubId`
  console.log(clubId);
  const [clubName, setClubName] = useState("");
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState("");
  const discussions = [
    {
      id: 1,
      author: "Shourya Mishra",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      title: "Ideas for next hackathon theme",
      content:
        "I was thinking we could focus on sustainability and green tech. What do you all think?",
      likes: 12,
      replies: 5,
      timestamp: "2 hours ago",
      tags: ["hackathon", "planning", "sustainability"],
    },
    {
      id: 2,
      author: "Sidharth Gupta",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      title: "Workshop session proposals",
      content:
        "Looking for volunteers to lead workshops next month. Please share your ideas!",
      likes: 8,
      replies: 3,
      timestamp: "5 hours ago",
      tags: ["workshop", "community"],
    },
    {
      id: 3,
      author: "Shourya Mishra",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      title: "Ideas for next hackathon theme",
      content:
        "I was thinking we could focus on sustainability and green tech. What do you all think?",
      likes: 12,
      replies: 5,
      timestamp: "2 hours ago",
      tags: ["hackathon", "planning", "sustainability"],
    },
    {
      id: 4,
      author: "Sidharth Gupta",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      title: "Workshop session proposals",
      content:
        "Looking for volunteers to lead workshops next month. Please share your ideas!",
      likes: 8,
      replies: 3,
      timestamp: "5 hours ago",
      tags: ["workshop", "community"],
    },
  ];

  useEffect(() => {
    async function fetchClubsData() {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/clubs/${clubId}/data`
        );
        setClubName(res.data.name);

        setMembers(res.data.members || []);
        setDescription(res.data.description);
      } catch (err) {
        console.error("Failed to fetch Clubs", err);
      }
    }
    fetchClubsData();
  }, [clubId]);

  useEffect(() => {
    async function fetchAnnouncemets() {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/announcements/${clubId}/clubAnnouncements`
        );

        setEvents(res.data.announcements);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    }
    fetchAnnouncemets();
  }, [clubId]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-600 to-gray-100">
      {/* Header */}
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
              onClick={() => setIsJoined(!isJoined)}
              className="px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105
            bg-red-500 hover:bg-red-600"
            >
              Leave Club
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Announcements */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Bell className="h-6 w-6 mr-2 text-blue-600" />
                  Announcements
                </h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-yellow-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-blue-800">
                      Welcome to our new club platform!
                    </h3>
                    <p className="text-blue-700 mt-1">
                      We're excited to have you here. Explore our upcoming
                      events and join the discussions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Discussions */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                  Discussions
                </h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Post
                </button>
              </div>
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="border-b pb-6 last:border-b-0 last:pb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={discussion.avatar}
                        alt={discussion.author}
                        className="w-10 h-10 rounded-full ring-2 ring-blue-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-800">
                              {discussion.author}
                            </h3>
                            <span className="text-sm text-gray-500">
                              • {discussion.timestamp}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-800 mt-1">
                          {discussion.title}
                        </h4>
                        <p className="text-gray-600 mt-2">
                          {discussion.content}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {discussion.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
                  View all Discussions →
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Events */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className=" flex justify-between">
                <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Upcoming Events
                </h2>
                <a href={`/addEvent/${clubId}`} className=" ">
                  {" "}
                  <button className="flex text-sm font-bold bg-blue-300  border-black/10 rounded-full hover:shadow-md hover:translate-y-0.5 hover:bg-blue-500">
                    <Plus className="h-4 w-4 hover:text-white"></Plus>{" "}
                    Announcements
                  </button>{" "}
                </a>
              </div>

              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="border-b last:border-b-0 pb-4 last:pb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Posted on {new Date(event.createdAt).toLocaleString()}
                        </p>
                      </div>
                      
                    </div>

                    {event.registerLink && (
                      <a
                        href={event.registerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Register <span className="ml-1">→</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Members */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Members
              </h2>
              <div className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full ring-2 ring-white"
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
                      <p className="font-medium text-gray-800">{member.user.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
                  View all members →
                </button>
              </div>
            </section>
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Contact Us
              </h2>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>@ccClubMNNIT</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>ccClub@mnnit.ac.in</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clubs;

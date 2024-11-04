import React, { useState } from 'react';
import { Users, Calendar, MessageSquare, Bell, Mail, Github, Twitter, MessageCircle, ThumbsUp, Share2, Star, Bookmark } from 'lucide-react';

function Clubs() {
  const [isJoined, setIsJoined] = useState(false);
  
  const members = [
    { id: 1, name: 'Shourya Mishra', role: 'President', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', status: 'online' },
    { id: 2, name: 'Sidharth Gupta', role: 'Vice President', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', status: 'away' },
    { id: 3, name: 'Shreya', role: 'Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', status: 'online' },
    { id: 4, name: 'Shashwat', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', status: 'offline' }
  ];

  const events = [
    {
      id: 1,
      title: 'CodeSangam 2024',
      date: 'November 9, 2024',
      time: '9:00 AM',
      location: 'Computer Centre',
      description: 'Coding Competitions, Webster',
      attendees: 45
    },
    {
      id: 2,
      title: 'Tech Talk: AI Ethics',
      date: 'November 10, 2024',
      time: '5:00 PM ',
      location: 'Virtual Meeting',
      description: 'Discussion on ethical implications of AI development.',
      attendees: 32
    }
  ];

  const discussions = [
    {
      id: 1,
      author: 'Shourya Mishra',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      title: 'Ideas for next hackathon theme',
      content: 'I was thinking we could focus on sustainability and green tech. What do you all think?',
      likes: 12,
      replies: 5,
      timestamp: '2 hours ago',
      tags: ['hackathon', 'planning', 'sustainability']
    },
    {
      id: 2,
      author: 'Sidharth Gupta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      title: 'Workshop session proposals',
      content: 'Looking for volunteers to lead workshops next month. Please share your ideas!',
      likes: 8,
      replies: 3,
      timestamp: '5 hours ago',
      tags: ['workshop', 'community']
    },
    {
    id: 3,
      author: 'Shourya Mishra',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      title: 'Ideas for next hackathon theme',
      content: 'I was thinking we could focus on sustainability and green tech. What do you all think?',
      likes: 12,
      replies: 5,
      timestamp: '2 hours ago',
      tags: ['hackathon', 'planning', 'sustainability']
    },
    {
        id: 4,
        author: 'Sidharth Gupta',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        title: 'Workshop session proposals',
        content: 'Looking for volunteers to lead workshops next month. Please share your ideas!',
        likes: 8,
        replies: 3,
        timestamp: '5 hours ago',
        tags: ['workshop', 'community']
      },
  ];

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
                <h1 className="text-3xl font-bold">CC Club MNNIT</h1>
                <p className="text-blue-100">Where passionate developers meet</p>
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
                    <h3 className="font-semibold text-blue-800">Welcome to our new club platform!</h3>
                    <p className="text-blue-700 mt-1">We're excited to have you here. Explore our upcoming events and join the discussions.</p>
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
                {discussions.map(discussion => (
                  <div key={discussion.id} className="border-b pb-6 last:border-b-0 last:pb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start space-x-4">
                      <img
                        src={discussion.avatar}
                        alt={discussion.author}
                        className="w-10 h-10 rounded-full ring-2 ring-blue-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-800">{discussion.author}</h3>
                            <span className="text-sm text-gray-500">• {discussion.timestamp}</span>
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-800 mt-1">{discussion.title}</h4>
                        <p className="text-gray-600 mt-2">{discussion.content}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {discussion.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
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
              <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="border-b last:border-b-0 pb-4 last:pb-0 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{event.date} • {event.time}</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {event.attendees} Registered
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                    <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                      Register
                      <span className="ml-1">→</span>
                    </button>
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
                {members.map(member => (
                  <div key={member.id} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full ring-2 ring-white"
                      />
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                        member.status === 'online' ? 'bg-green-500' :
                        member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{member.name}</p>
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
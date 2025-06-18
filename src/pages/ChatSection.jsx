import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
function ChatsSection({ clubId, userId }) {
  const [discussions, setDiscussions] = useState([]);
  const [content, setContent] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  // Fetch discussions function
  const fetchDiscussions = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/clubs/${clubId}/getChats`);
      const data = await res.json();
      setDiscussions(Array.isArray(data.chats) ? data.chats : []);
    } catch (error) {
      console.error("Failed to fetch discussions", error);
      setDiscussions([]);
    }
  };

  // Load discussions initially and when clubId changes
  useEffect(() => {
    fetchDiscussions();
  }, [clubId]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    const chatBox = document.getElementById("chat-section");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [discussions]);

  // Handle new message post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await fetch(`http://localhost:3001/api/clubs/${clubId}/postChats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, clubId, userId }),
      });
      setContent("");
      fetchDiscussions();
    } catch (error) {
      console.error("Error posting chat:", error);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
          Discussions
        </h2>
      </div>
      <div id="chat-section" className="space-y-6 max-h-96 overflow-y-auto">
        {discussions.length > 0 ? (
          discussions.map((chat) => (
            <div
              key={chat._id || Math.random()}
              className="border-b pb-6 last:border-b-0 last:pb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${chat.postedBy?.name || "User"}`}
                  alt={chat.postedBy?.name || "User"}
                  className="w-10 h-10 rounded-full ring-2 ring-blue-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {chat.postedBy?.name || "Anonymous"}
                  </h3>
                  <p className="text-gray-600 mt-2">{chat.content || "No content"}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {chat.postedAt
                      ? new Date(chat.postedAt).toLocaleString()
                      : "Unknown date"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No discussions yet</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="w-full flex items-center mt-4">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 rounded-2xl bg-cyan-200 px-4 py-2"
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className="w-50 h-10 ml-2 bg-black text-white rounded-xl font-bold hover:translate-x-0.5 hover:bg-blue-600 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </form>
    </section>
  );
}

export default ChatsSection;

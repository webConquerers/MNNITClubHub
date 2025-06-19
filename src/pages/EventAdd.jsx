import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EventAdd() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    registerLink: ""
  });

  const navigate = useNavigate();
  const {clubId} = useParams(); // Replace or pass via props/context
  
  const userId = localStorage.getItem("userId"); // Replace or pass via auth context


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/announcements/${clubId}/create`, {
        ...formData,
        clubId,
        userId
      });
      navigate(`/club/${clubId}`); // Redirect to club page
    } catch (error) {
      console.error("Failed to create announcement:", error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto backdrop-blur-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Add Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-4 py-2 rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="w-full border px-4 py-2 rounded"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <input
          type="url"
          placeholder="Register Link (optional)"
          className="w-full border px-4 py-2 rounded"
          value={formData.registerLink}
          onChange={(e) => setFormData({ ...formData, registerLink: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  );
}

export default EventAdd;

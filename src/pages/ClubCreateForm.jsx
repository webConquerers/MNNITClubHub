/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateClub = ({ onClose }) => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateClub = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const adminId = localStorage.getItem("userId");
      if (!adminId) {
        toast.error("Please log in first!");
        return;
      }

      console.log("Submitting:", { clubName, description, adminId });

      const response = await axios.post(
        "http://localhost:3001/api/createClub",
        { name: clubName, description, adminId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (response.data.success) {
        toast.success("Club created successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Creation error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to create club");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg relative">
        <h2 className="text-2xl font-bold text-white mb-4">Create Club</h2>
        <form onSubmit={handleCreateClub}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Club Name</label>
            <input
              type="text"
              id="club"
              name="club"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClub;
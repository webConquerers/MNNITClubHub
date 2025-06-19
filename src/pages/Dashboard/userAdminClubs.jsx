/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const AdminSection = ({ userId }) => {
  const [adminClubs, setAdminClubs] = useState([]);

  useEffect(() => {
   
    axios.get(`http://localhost:3001/api/admin-clubs/${userId}`)
      .then(res => {
        setAdminClubs(res.data.adminClubs);
      })
      .catch(err => console.error(err));
  }, [userId]);

  const handleApprove = async (clubId, memberId) => {
    try {
      await axios.post("http://localhost:3001/api/approve-request", {
        clubId,
        userId: memberId,
      });
      // Refresh list after approval
      setAdminClubs(prev =>
        prev.map(club =>
          club._id === clubId
            ? {
                ...club,
                members: club.members.map(member =>
                  member.user._id === memberId
                    ? { ...member, status: "approved" }
                    : member
                ),
              }
            : club
        )
      );
      
    } catch (err) {
      console.error("Error approving member:", err);
    }
  };
  if (!adminClubs.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold">Admin Section - Pending Requests</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {adminClubs.map(club => (
        <div key={club._id} className="backdrop-blur-lg p-4 rounded-2xl my-4  ">
          <h4 className="font-semibold text-cyan-400 border-red-200 shadow-lg">{club.name}</h4>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">
              Pending Requests
            </summary>
            <ul className="mt-2">
              {club.members
                .filter(member => member.status === "pending")
                .map(member => (
                  <li key={member.user._id} className="p-2 flex justify-between">
                    {member.user.name} ({member.user.email})
                    <button
                      onClick={() => handleApprove(club._id, member.user._id)}
                      className="bg-green-500 text-lg text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                  </li>
                ))}
            </ul>
          </details>
          </div>
      ))}
      </div>
     
       
    </div>
  );
};

export default AdminSection;

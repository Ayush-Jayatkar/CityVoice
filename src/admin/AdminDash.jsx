import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDash.css';

function AdminDash() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => console.error("Error fetching complaints:", err));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${id}/status`, {
        status: newStatus,
      });

      setComplaints(prev =>
        prev.map(c =>
          c.id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="complaints-container">
      <h1 className="admin-title">Admin Portal – Submitted Complaints</h1>
      {complaints.map(complaint => (
        <div key={complaint.id} className="complaint-card">
          {complaint.image_url && (
            <img
              src={complaint.image_url}
              alt="Complaint"
              className="complaint-image"
            />
          )}
          <div className="complaint-content">
            <h2 className="complaint-title">{complaint.title}</h2>
            <p className="complaint-description">{complaint.description}</p>
            <p className="complaint-address">
              📍 {complaint.addressLine1}, {complaint.city} ({complaint.zipCode})<br />
              Landmark: {complaint.nearbyLandmarks}
            </p>
            <span className={`complaint-status ${complaint.status.toLowerCase().replace(' ', '-')}`}>
              {complaint.status}
            </span>

            <div className="status-controls">
              <label htmlFor={`status-${complaint.id}`}>Change Status:</label>
              <select
                id={`status-${complaint.id}`}
                value={complaint.status}
                onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDash;

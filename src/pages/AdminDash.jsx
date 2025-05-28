import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDash.css';


function AdminDash() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/complaints')  // Change this if backend is hosted elsewhere
      .then(res => setComplaints(res.data))
      .catch(err => console.error("Error fetching complaints:", err));
  }, []);

  return (
  <div className="complaints-container">
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
        </div>
      </div>
    ))}
  </div>
);

}

export default AdminDash;

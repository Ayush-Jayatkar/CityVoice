import React, { useState, useEffect } from 'react';
import './AdminDash.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/complaints');
      
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
      
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeDetailView = () => {
    setSelectedComplaint(null);
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <h2>Reported Issues</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="complaints-grid">
          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            complaints.map((complaint) => (
              <div 
                key={complaint.id} 
                className="complaint-card"
                onClick={() => handleComplaintClick(complaint)}
              >
                <div className={`status-badge ${complaint.status.toLowerCase()}`}>
                  {complaint.status}
                </div>
                <h3>{complaint.title}</h3>
                <p className="category">{complaint.category}</p>
                <p className="date">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
                <p className="address">{complaint.address.city}</p>
              </div>
            ))
          )}
        </div>
      )}

      {selectedComplaint && (
        <div className="detail-overlay">
          <div className="detail-container">
            <button className="close-btn" onClick={closeDetailView}>×</button>
            
            <h2>{selectedComplaint.title}</h2>
            <div className={`status-badge ${selectedComplaint.status.toLowerCase()}`}>
              {selectedComplaint.status}
            </div>
            
            <div className="detail-grid">
              <div className="detail-image">
                <img 
                  src={`http://localhost:5000/${selectedComplaint.imagePath}`} 
                  alt={selectedComplaint.title} 
                />
              </div>
              
              <div className="detail-info">
                <p><strong>Category:</strong> {selectedComplaint.category}</p>
                <p><strong>Date Reported:</strong> {new Date(selectedComplaint.createdAt).toLocaleDateString()}</p>
                <p><strong>Address:</strong><br />
                  {selectedComplaint.address.line1}<br />
                  {selectedComplaint.address.line2 && <>{selectedComplaint.address.line2}<br /></>}
                  {selectedComplaint.address.city}, {selectedComplaint.address.zipCode}
                </p>
                
                <div className="detail-description">
                  <h4>Description:</h4>
                  <p>{selectedComplaint.description}</p>
                </div>
                
                <div className="action-buttons">
                  <button className="action-btn approve">Mark In Progress</button>
                  <button className="action-btn resolve">Mark Resolved</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
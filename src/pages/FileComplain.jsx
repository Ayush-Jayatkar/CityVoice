import React, { useState } from 'react';
import './FileComplain.css';

const FileComplain = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    addressLine1: '',
    nearbyLandmarks: '',
    city: '',
    zipCode: ''
  });
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please upload an image file');
      return;
    }

    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please upload an image file');
      return;
    }

    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      setError('Please upload an image');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Create a FormData object to send the form data and image
      const submitData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Add the image
      submitData.append('image', image);

      // Send the data to your Python backend
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        body: submitData,
        // Note: Don't set Content-Type header when using FormData
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }

      // Reset the form and show success message
      setFormData({
        title: '',
        description: '',
        category: '',
        addressLine1: '',
        nearbyLandmarks: '',
        city: '',
        zipCode: ''
      });
      setImage(null);
      setPreview('');
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="complain-container">
      <h2>Report an Issue</h2>
      
      {isSuccess && (
        <div className="success-message">
          Your issue has been successfully reported! A reference number has been sent to your email.
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="complain-form">
        <div className="form-group">
          <label htmlFor="title">Issue Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a descriptive title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the issue in detail"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Photo Evidence</label>
          <div className="upload-options">
            <div className="upload-option" onClick={() => document.getElementById('uploadInput').click()}>
              <i className="fas fa-camera"></i> Device/Gallery
            </div>
            <div className="upload-option" onClick={() => document.getElementById('uploadInput').click()}>
              <i className="fas fa-cloud"></i> Google Drive
            </div>
          </div>
          
          <div 
            className="upload-area" 
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById('uploadInput').click()}
          >
            <p>Drag & drop your photo here</p>
            <p>or click to select from your device</p>
            <input 
              type="file" 
              id="uploadInput" 
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          
          {preview && (
            <div className="preview-container">
              <h4>Photo Preview:</h4>
              <img src={preview} alt="Issue preview" />
              <button type="button" onClick={removeImage} className="remove-btn">
                Remove Image
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Issue Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="roads">Roads & Infrastructure</option>
            <option value="utilities">Utilities (Water, Electricity)</option>
            <option value="waste">Waste Management</option>
            <option value="safety">Safety & Security</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="addressLine1">Address Line 1</label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            placeholder="Street address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nearbyLandmarks">Nearby Landmarks</label>
          <input
            type="text"
            id="nearbyLandmarks"
            name="nearbyLandmarks"
            value={formData.nearbyLandmarks}
            onChange={handleChange}
            placeholder="Apartment, Shop, Park, etc."
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Issue Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileComplain;
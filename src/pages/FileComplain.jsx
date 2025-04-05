import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
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


    const CLIENT_ID = "143574698600-kgecvniuftoucr6qlu5ord5mc8hdhaq6.apps.googleusercontent.com";
    const API_KEY = "AIzaSyA7qenwXOo-FPBGwjE28Pe-Qq4xl1Cif94";
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

    useEffect(() => {
        const initClient = async () => {
            try {
                await gapi.load("client:auth2", async () => {
                    await gapi.client.init({
                        apiKey: API_KEY,
                        clientId: CLIENT_ID,
                        discoveryDocs: DISCOVERY_DOCS,
                        scope: SCOPES,
                    });
                });

                await gapi.load("picker");
            } catch (err) {
                console.error("Error loading Google API:", err);
                setError("Error loading Google Drive API.");
            }
        };

        initClient();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        handleImageSelection(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleImageSelection(file);
    };

    const handleImageSelection = (file) => {
        if (!file) return;

        if (!file.type.match('image.*')) {
            setError('Please upload an image file');
            return;
        }

        setImage(file);

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
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });
            submitData.append('image', image);

            const response = await fetch('http://localhost:5000/api/complaints', {
                method: 'POST',
                body: submitData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit complaint');
            }

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

            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);

        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openGooglePicker = async () => {
        try {
            const authInstance = gapi.auth2?.getAuthInstance();
            if (!authInstance) {
                setError("Google API is not initialized properly.");
                return;
            }

            if (!authInstance.isSignedIn.get()) {
                await authInstance.signIn();
            }

            const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;

            const picker = new window.google.picker.PickerBuilder()
                .setOAuthToken(accessToken)
                .addView(window.google.picker.ViewId.DOCS_IMAGES)
                .setCallback(async (data) => {
                    if (data.action === window.google.picker.Action.PICKED) {
                        const file = data.docs[0];
                        try {
                            const response = await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });

                            if (!response.ok) {
                                throw new Error('Failed to download file from Google Drive.');
                            }

                            const blob = await response.blob();
                            const fileObj = new File([blob], file.name, { type: file.mimeType });
                            handleImageSelection(fileObj);
                        } catch (err) {
                            console.error('Error fetching Google Drive file:', err);
                            setError("Failed to fetch file from Google Drive.");
                        }
                    }
                })
                .build();
            picker.setVisible(true);
        } catch (err) {
            console.error('Error opening Google Picker:', err);
            setError("Error opening Google Drive Picker.");
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
                        <div className="upload-option" onClick={openGooglePicker}>
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
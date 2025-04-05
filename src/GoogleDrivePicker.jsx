import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const GoogleDrivePicker = ({ onFileSelect }) => {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID; 
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; 
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

        // Load Google Picker API
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => console.log("Google Picker API Loaded");
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Google API:", error);
      }
    };

    initClient();
  }, []);

  const openPicker = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }

      const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;

      window.gapi.load("picker", () => {
        const picker = new window.google.picker.PickerBuilder()
          .setOAuthToken(accessToken)
          .addView(window.google.picker.ViewId.DOCS_IMAGES)
          .setCallback((data) => {
            if (data.action === window.google.picker.Action.PICKED) {
              onFileSelect(data.docs[0]); // Send selected file details
            }
          })
          .build();
        picker.setVisible(true);
      });
    } catch (error) {
      console.error("Error opening Google Picker:", error);
    }
  };

  return <button onClick={openPicker}>Select from Google Drive</button>;
};

export default GoogleDrivePicker;

# backend/app.py

from flask import Flask, request, jsonify
import cloudinary.uploader
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Correctly fetch environment variables by their names
CLOUD_NAME = os.getenv('CLOUD_NAME')
API_KEY = os.getenv('API_KEY')
API_SECRET = os.getenv('API_SECRET')
UPLOAD_PRESET = os.getenv('UPLOAD_PRESET')

# Validate environment variables
if not all([CLOUD_NAME, API_KEY, API_SECRET, UPLOAD_PRESET]):
    raise EnvironmentError("One or more required environment variables are missing.")

cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET,
    secure=True  # Ensure secure URLs
)

@app.route('/api/complaints', methods=['POST'])
def submit_complaint():
    try:
        data = request.form
        title = data.get('title')
        description = data.get('description')
        image_file = request.files['image']

        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(
            image_file,
            upload_preset=UPLOAD_PRESET
        )

        image_url = upload_result['secure_url']

        # Store the data in a database or file  
        # ...

        print(f"Complaint received: {title}, {description}, Image URL: {image_url}")

        return jsonify({'message': 'Complaint submitted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary.uploader
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from models import db, Complaint

load_dotenv()

app = Flask(__name__)
CORS(app)

# Set up Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET'),
    secure=True
)

# Connect PostgreSQL via SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create DB tables
with app.app_context():
    db.create_all()

@app.route('/api/complaints', methods=['POST'])
def submit_complaint():
    try:
        data = request.form
        image_file = request.files['image']

        # Upload image to Cloudinary
        upload_result = cloudinary.uploader.upload(
            image_file,
            upload_preset=os.getenv('UPLOAD_PRESET')
        )
        image_url = upload_result['secure_url']

        # Create complaint object
        complaint = Complaint(
            title=data.get('title'),
            description=data.get('description'),
            category=data.get('category'),
            address_line1=data.get('addressLine1'),
            nearby_landmarks=data.get('nearbyLandmarks'),
            city=data.get('city'),
            zip_code=data.get('zipCode'),
            image_url=image_url
        )

        db.session.add(complaint)
        db.session.commit()

        return jsonify({'message': 'Complaint submitted and stored in DB successfully!'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

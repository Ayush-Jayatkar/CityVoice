from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary.uploader
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, Complaint

# Load environment variables
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

# Configure PostgreSQL database
DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in the .env file")

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Create DB tables if they don't exist
with app.app_context():
    db.create_all()

@app.route('/api/complaints', methods=['POST'])
def submit_complaint():
    print("HIII")
    try:
        data = request.form
        image_file = request.files.get('image')  # Use .get() to avoid KeyError if no file is uploaded

        # Upload image to Cloudinary if provided
        image_url = None
        if image_file:
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

@app.route('/api/complaints/<int:complaint_id>/status', methods=['PUT'])
def update_complaint_status(complaint_id):
    try:
        data = request.json
        new_status = data.get('status')

        if not new_status:
            return jsonify({'error': 'Status is required'}), 400

        complaint = Complaint.query.get(complaint_id)
        if not complaint:
            return jsonify({'error': 'Complaint not found'}), 404

        complaint.status = new_status
        db.session.commit()

        return jsonify({'message': 'Complaint status updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/complaints', methods=['GET'])
def get_all_complaints():
    try:
        complaints = Complaint.query.order_by(Complaint.id.desc()).all()
        results = []
        for complaint in complaints:
            results.append({
                'id': complaint.id,
                'title': complaint.title,
                'description': complaint.description,
                'category': complaint.category,
                'addressLine1': complaint.address_line1,
                'nearbyLandmarks': complaint.nearby_landmarks,
                'city': complaint.city,
                'zipCode': complaint.zip_code,
                'image_url': complaint.image_url,
                'status': complaint.status
            })
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

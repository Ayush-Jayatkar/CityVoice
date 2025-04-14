from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Complaint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=True)
    address_line1 = db.Column(db.String(200), nullable=True)
    nearby_landmarks = db.Column(db.String(200), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    zip_code = db.Column(db.String(20), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)

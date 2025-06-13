from flask import Flask
from flask_cors import CORS
from config import Config
from routes import bp  # Import the real blueprint
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin import db as realtime_db  # ✅ Realtime DB import

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Path to your credentials file
cred_path = "C:\\Users\\Acer\\OneDrive\\Desktop\\sahaj yatra\\traffic control\\Smart-Traffic\\firebase-credentials.json"
cred = credentials.Certificate(cred_path)

# Initialize Firebase App with Firestore + Realtime DB
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://smarttraffic-52386-default-rtdb.firebaseio.com/'  # ✅ Realtime DB URL
})

# Initialize Firestore client
db = firestore.client()

# ✅ Optional: Access to Realtime DB root reference (can be passed to routes)
realtime_db_ref = realtime_db.reference()

# Inject Firestore DB into routes
import routes  # Needed to access the module and set db
routes.db = db
routes.realtime_db_ref = realtime_db_ref  # ✅ Optional, if you want to use it in routes

# Register blueprint
app.register_blueprint(bp)

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
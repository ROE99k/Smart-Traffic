from flask import Blueprint, request, jsonify
from services import update_traffic_data, get_led_states, traffic_data
from datetime import datetime

bp = Blueprint('api', __name__)
db = None  # Will be injected from app.py
realtime_db_ref = None  # Will be injected from app.py

@bp.route('/traffic-signal', methods=['POST'])
def update_traffic():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400

    direction = data.get("junction") or data.get("direction")
    count = data.get("vehicle_count") or data.get("count")

    if direction is None or count is None:
        return jsonify({"error": "Missing direction or vehicle count"}), 400

    try:
        count = int(count)
    except ValueError:
        return jsonify({"error": "vehicle_count must be an integer"}), 400

    try:
        updated_data = update_traffic_data(direction, count)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    # ✅ Improved logging for Firestore + Realtime DB
    try:
        log_data = {
            "direction": direction,
            "vehicle_count": count,
            "green": updated_data["green"],
            "timestamp": datetime.now().isoformat()
        }

        if db:
            db.collection("traffic_data").add(log_data)

        if realtime_db_ref:
            print("📤 Attempting to push to Realtime DB at /traffic_data")
            realtime_db_ref.child("traffic_data").push(log_data)
            print("✅ Data pushed to Realtime DB")

    except Exception as e:
        print("❌ Firebase Realtime DB Error:", e)

    return jsonify({"message": "Traffic data updated", "green": updated_data["green"]}), 200

@bp.route('/traffic-signal', methods=['GET'])
def get_traffic():
    return jsonify({
        "density": traffic_data["density"],
        "green": traffic_data["green"],
        "led_states": get_led_states()
    }), 200

@bp.route('/traffic-status', methods=['GET'])
def get_traffic_for_esp32():
    return jsonify({"green": traffic_data["green"]}), 200

@bp.route('/')
def index():
    return '✅ Flask Traffic Signal API is running!'

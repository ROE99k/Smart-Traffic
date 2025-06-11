from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

app = Flask(__name__)
CORS(app)

# Default traffic data
traffic_data = {
    "density": {
        "north": 0,
        "south": 0,
        "east": 0,
        "west": 0
    },
    "green": "none"
}

# Helper: Get LED states for each direction
def get_led_states():
    led_states = {
        "north": [0, 0, 0],
        "south": [0, 0, 0],
        "east": [0, 0, 0],
        "west": [0, 0, 0]
    }
    green = traffic_data["green"]
    if green in led_states:
        led_states[green] = [1, 1, 1]
    return led_states

# Decide which direction gets green based on highest vehicle count
def decide_green_light():
    return max(traffic_data["density"], key=traffic_data["density"].get)

# POST: Receive vehicle count from YOLO or ESP32
@app.route('/traffic-signal', methods=['POST'])
def update_traffic():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400

    direction = data.get("junction") or data.get("direction")  # support both keys
    count = data.get("vehicle_count") or data.get("count")

    if direction not in traffic_data["density"]:
        return jsonify({"error": f"Invalid direction '{direction}'"}), 400
    if count is None:
        return jsonify({"error": "vehicle_count missing"}), 400

    traffic_data["density"][direction] = count
    traffic_data["green"] = decide_green_light()

    print(f"✅ Updated traffic data: {traffic_data} (Received from {direction})")
    return jsonify({"message": "Traffic data updated", "green": traffic_data["green"]}), 200

# GET: Frontend gets traffic info
@app.route('/traffic-signal', methods=['GET'])
def get_traffic():
    return jsonify({
        "density": traffic_data["density"],
        "green": traffic_data["green"],
        "led_states": get_led_states()
    })

# GET: ESP32 checks which direction is green
@app.route('/traffic-status', methods=['GET'])
def get_traffic_for_esp32():
    return jsonify({"green": traffic_data["green"]})

# Root route
@app.route('/')
def index():
    return '✅ Flask Traffic Signal API is running!'

# Run server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

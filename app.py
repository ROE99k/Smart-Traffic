from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Set Google Cloud credential file path (optional if used elsewhere in your app)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

app = Flask(__name__)
CORS(app)  # Allow frontend or ESP32 to connect

# Store current traffic density per junction and which road has green light
traffic_data = {
    "density": {
        "north": 0,
        "south": 0,
        "east": 0,
        "west": 0
    },
    "green": None
}

def get_led_states():
    led_states = {
        "north": [0, 0, 0],
        "south": [0, 0, 0],
        "east": [0, 0, 0],
        "west": [0, 0, 0]
    }
    green_road = traffic_data.get("green")
    if green_road in led_states:
        led_states[green_road] = [1, 1, 1]
    return led_states

def decide_green_light():
    densities = traffic_data["density"]
    if not densities:
        return None
    max_dir = max(densities, key=densities.get)
    return max_dir

@app.route('/traffic-signal', methods=['POST'])
def update_traffic():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400

    junction = data.get("junction")
    vehicle_count = data.get("vehicle_count")

    if junction not in traffic_data["density"]:
        return jsonify({"error": f"Invalid junction '{junction}'"}), 400
    if vehicle_count is None:
        return jsonify({"error": "vehicle_count missing"}), 400

    traffic_data["density"][junction] = vehicle_count
    traffic_data["green"] = decide_green_light()

    print("✅ Updated traffic data:", traffic_data)
    return jsonify({"message": "Data received and traffic updated", "green": traffic_data["green"]}), 200

@app.route('/traffic-signal', methods=['GET'])
def get_traffic():
    response = {
        "density": traffic_data.get("density", {}),
        "green": traffic_data.get("green", None),
        "led_states": get_led_states()
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

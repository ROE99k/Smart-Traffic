from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/vehicle-data', methods=['POST'])
def receive_vehicle_data():
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No JSON received"}), 400

    print("✅ Received vehicle data:", data)

    # You can process/store data here if needed

    return jsonify({"status": "success", "message": "Data received"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

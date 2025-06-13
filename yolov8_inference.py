import cv2
import threading
import requests
import time
from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO("yolov8n.pt")

# Confidence threshold
CONFIDENCE_THRESHOLD = 0.5

# Video sources
video_sources = {
    "north": "c:/Users/Acer/Videos/Recording 2025-06-09 105131.mp4",
    "south": "c:/Users/Acer/Videos/Recording 2025-06-09 110004.mp4",
    "east":  "c:/Users/Acer/Videos/Recording 2025-06-10 131013.mp4",
    "west":  "c:/Users/Acer/Videos/Recording 2025-06-09 110635.mp4"
}

# Updated Flask backend URL
backend_url = "http://127.0.0.1:5000/traffic-signal"

def count_vehicles(frame):
    results = model(frame)
    vehicle_count = 0
    for result in results:
        for box in result.boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            if conf > CONFIDENCE_THRESHOLD and cls in [2, 3, 5, 7]:  # car, motorcycle, bus, truck
                vehicle_count += 1
    return vehicle_count

def process_video(direction, path):
    print(f"[{direction.upper()}] Starting video: {path}")
    cap = cv2.VideoCapture(path)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print(f"[{direction.upper()}] Video ended or cannot read frame.")
            break

        vehicle_count = count_vehicles(frame)
        print(f"[{direction.upper()}] Vehicle Count: {vehicle_count}")

        # Send data to backend
        data = {
            "vehicle_count": vehicle_count,
            "junction": direction
        }
        try:
            response = requests.post(backend_url, json=data)
            print(f"[{direction.upper()}] Sent to server | Status: {response.status_code}")
        except Exception as e:
            print(f"[{direction.upper()}] Error sending data: {e}")

        time.sleep(2)  # Delay between frames

    cap.release()
    print(f"[{direction.upper()}] Video processing complete.")

# Start threads for each direction
threads = []
for direction, path in video_sources.items():
    t = threading.Thread(target=process_video, args=(direction, path))
    t.start()
    threads.append(t)

# Wait for all threads to complete
for t in threads:
    t.join()

print("✅ All videos processed.")

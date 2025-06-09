# utils.py
import cv2

def draw_boxes(frame, vehicles):
    for x1, y1, x2, y2 in vehicles:
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
    return frame

def count_vehicles(vehicles):
    return len(vehicles)

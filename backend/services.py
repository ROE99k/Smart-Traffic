# services.py

traffic_data = {
    "density": {"north": 0, "south": 0, "east": 0, "west": 0},
    "green": "none"
}

def get_led_states():
    """
    Returns LED states for all directions.
    The green direction LEDs are set to [1,1,1], others to [0,0,0].
    """
    led_states = {direction: [0, 0, 0] for direction in traffic_data["density"]}
    green = traffic_data["green"]
    if green in led_states:
        led_states[green] = [1, 1, 1]
    return led_states

def decide_green_light():
    """
    Determines which direction should get the green light
    based on the highest vehicle count.
    """
    return max(traffic_data["density"], key=traffic_data["density"].get)

def update_traffic_data(direction, count):
    """
    Updates vehicle count for a direction and recalculates green light.
    Raises ValueError if the direction is invalid.
    """
    if direction not in traffic_data["density"]:
        raise ValueError(f"Invalid direction '{direction}'")
    traffic_data["density"][direction] = count
    traffic_data["green"] = decide_green_light()
    return traffic_data

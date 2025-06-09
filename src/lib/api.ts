import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000"; // Backend server URL

export const postTrafficSignal = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/traffic-signal`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting traffic signal:", error);
    throw error;
  }
};

export const testFirebaseURL = async () => {
  try {
    const response = await axios.get('https://smarttraffic-52386-default-rtdb.firebaseio.com/.json');
    console.log('Firebase Data:', response.data);
  } catch (error) {
    console.error('Error testing Firebase URL:', error);
  }
};

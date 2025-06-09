// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Important if you're using Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfuH_1Fuk0II13z_KeJLhoKUIVhEB7sp8",
  authDomain: "smarttraffic-52386.firebaseapp.com",
  databaseURL: "https://smarttraffic-52386-default-rtdb.firebaseio.com", // ✅ Must be added
  projectId: "smarttraffic-52386",
  storageBucket: "smarttraffic-52386.appspot.com", // ✅ Corrected
  messagingSenderId: "762048186064",
  appId: "1:762048186064:web:8e569a3c04a0f9e95740d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database (Realtime Database)
const database = getDatabase(app);

export { database };

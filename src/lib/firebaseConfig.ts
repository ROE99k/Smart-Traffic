import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfuH_1Fuk0II13z_KeJLhoKUIVhEB7sp8",
  authDomain: "smarttraffic-52386.firebaseapp.com",
  projectId: "smarttraffic-52386",
  storageBucket: "smarttraffic-52386.appspot.com",
  messagingSenderId: "762048186064",
  appId: "1:762048186064:web:8e569a3c04a0f9e95740d5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

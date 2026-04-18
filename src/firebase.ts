// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcavyuTAd_Q6l8ZRz5Htwlo_3obpRqsss",
  authDomain: "hiltunes-song-match.firebaseapp.com",
  projectId: "hiltunes-song-match",
  storageBucket: "hiltunes-song-match.firebasestorage.app",
  messagingSenderId: "519833721047",
  appId: "1:519833721047:web:f12d2ef909385810393892",
  measurementId: "G-3YTD81D0PQ"
};

// Initialize Firebase
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

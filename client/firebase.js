// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "motor-mart-e0618.firebaseapp.com",
  projectId: "motor-mart-e0618",
  storageBucket: "motor-mart-e0618.firebasestorage.app",
  messagingSenderId: "142138492481",
  appId: "1:142138492481:web:51b0d91fcd0ee81aea28c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
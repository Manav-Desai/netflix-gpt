// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-2eab8.firebaseapp.com",
  projectId: "netflixgpt-2eab8",
  storageBucket: "netflixgpt-2eab8.appspot.com",
  messagingSenderId: "198102266826",
  appId: "1:198102266826:web:623c6d8591bf60f0071533",
  measurementId: "G-ZDNWSJ7D54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
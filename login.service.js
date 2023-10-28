// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2xjCY_QVD8zEnUgNHgSWtVgE0WQqFHy0",
  authDomain: "cs260-startup.firebaseapp.com",
  projectId: "cs260-startup",
  storageBucket: "cs260-startup.appspot.com",
  messagingSenderId: "325868282784",
  appId: "1:325868282784:web:109165e46a227d463c3ac5",
  measurementId: "G-PJ6PR8N6Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
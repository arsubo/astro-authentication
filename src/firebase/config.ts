// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmtMg6zKLlSxbq8kcYsPYRZJ0kjUSxhUQ",
  authDomain: "astro-authentication-918d7.firebaseapp.com",
  projectId: "astro-authentication-918d7",
  storageBucket: "astro-authentication-918d7.firebasestorage.app",
  messagingSenderId: "352469870268",
  appId: "1:352469870268:web:21994fc34b4c2e846fd2b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "es";

export const firebase = {
  app,
  auth,
};

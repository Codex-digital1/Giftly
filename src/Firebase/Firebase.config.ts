// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIVCUsttyuULG1Jdvu3y0tzWtH6CNllPQ",
  authDomain: "giftly-a5f0f.firebaseapp.com",
  projectId: "giftly-a5f0f",
  storageBucket: "giftly-a5f0f.appspot.com",
  messagingSenderId: "297511728214",
  appId: "1:297511728214:web:4e748e6a1b50121d5e77f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
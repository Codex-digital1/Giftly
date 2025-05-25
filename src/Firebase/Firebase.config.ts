// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyD6wjnIPPAF8-yOG-L4j1smb-qULAQB_sA",
  // authDomain: "giftly-ba979.firebaseapp.com",
  // projectId: "giftly-ba979",
  // storageBucket: "giftly-ba979.appspot.com",
  // messagingSenderId: "832467487474",
  // appId: "1:832467487474:web:87885a010939ef6d939e6b"

  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

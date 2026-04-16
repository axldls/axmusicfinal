// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8LR8dL89JxZcrrpvw4rmVCGIIeTxl33g",
  authDomain: "axmusic-40086.firebaseapp.com",
  projectId: "axmusic-40086",
  storageBucket: "axmusic-40086.appspot.com",
  messagingSenderId: "288648672539",
  appId: "1:288648672539:web:0ec3dd09499da6a2208fbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
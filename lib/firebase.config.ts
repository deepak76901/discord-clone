// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAR7nolVo5Semq2wWqNMKZMCpEp5zDIq4",
  authDomain: "discord-clone-4755c.firebaseapp.com",
  projectId: "discord-clone-4755c",
  storageBucket: "discord-clone-4755c.appspot.com",
  messagingSenderId: "822729503596",
  appId: "1:822729503596:web:a8431c7562b340bbbd7949"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
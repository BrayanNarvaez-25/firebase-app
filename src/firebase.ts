import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBaM7k_vS_u5zBHWXvb-fQHsBFi77Cpj4",
  authDomain: "curso-firebase-dbc1a.firebaseapp.com",
  projectId: "curso-firebase-dbc1a",
  storageBucket: "curso-firebase-dbc1a.firebasestorage.app",
  messagingSenderId: "916927232030",
  appId: "1:916927232030:web:988036abbbcdd1d551d60f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db};
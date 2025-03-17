// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9XJyDspkltGMVjgJ5wsCcZFz3DSzIZek",
  authDomain: "store-dashboard-ce29c.firebaseapp.com",
  projectId: "store-dashboard-ce29c",
  storageBucket: "store-dashboard-ce29c.firebasestorage.app",
  messagingSenderId: "353415080579",
  appId: "1:353415080579:web:5acf53e02be5aaa85149b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
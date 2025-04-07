import { auth, googleProvider } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";

// Register with Email & Password
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

// Login with Email & Password
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

// Google Sign-In (with fallback to redirect if popup fails)
export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In successful:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Popup Sign-In error:", error.message);
    
    if (error.code === "auth/popup-blocked" || error.code === "auth/popup-closed-by-user") {
      console.log("Trying redirect sign-in instead...");
      await signInWithRedirect(auth, googleProvider);
    }
    
    throw error;
  }
};

// Handle Redirect Result
export const handleGoogleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("Google Redirect Sign-In successful:", result.user);
      return result.user;
    }
  } catch (error) {
    console.error("Redirect Sign-In error:", error.message);
    throw error;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};

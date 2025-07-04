import { FirebaseApp, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyB-gF7RDAFHo9xwwEIsfLkyOgbLiKIy4H4",
  authDomain: "nativeapp-60f6a.firebaseapp.com",
  projectId: "nativeapp-60f6a",
  storageBucket: "nativeapp-60f6a.firebasestorage.app",
  messagingSenderId: "689468030110",
  appId: "1:689468030110:web:4d0313cb30338b9c61cf8f",
  measurementId: "G-ZM38NPBEQZ"
};

// Initialize Firebase
//
let app: FirebaseApp;

try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw new Error("Firebase initialization failed");
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db }

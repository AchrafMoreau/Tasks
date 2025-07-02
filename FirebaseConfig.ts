// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const analytics = getAnalytics(app);

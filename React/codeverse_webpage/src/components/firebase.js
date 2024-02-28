import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdpNnIXuwQGe7LMjR4btQWtgB-_rJGq4I",
  authDomain: "login-register-5fd94.firebaseapp.com",
  projectId: "login-register-5fd94",
  storageBucket: "login-register-5fd94.appspot.com",
  messagingSenderId: "747615529808",
  appId: "1:747615529808:web:a94566381e7436f9cf9a55",
  measurementId: "G-1CXWR8SLT6"};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;

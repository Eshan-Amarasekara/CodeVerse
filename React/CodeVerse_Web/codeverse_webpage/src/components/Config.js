
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD20szPMBv2_n4GdRnIg3czpsscbvQXEGY",
  authDomain: "codeverse-1eda8.firebaseapp.com",
  projectId: "codeverse-1eda8",
  storageBucket: "codeverse-1eda8.appspot.com",
  messagingSenderId: "895173750417",
  appId: "1:895173750417:web:6223fef581bff6543c9930",
  measurementId: "G-7P91ZXEQE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const imageDb = getStorage(app)
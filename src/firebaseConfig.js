// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAhJcB5Kujso_BZ_VCHmwspgu0iNb53SXU",
    authDomain: "support-for-customer.firebaseapp.com",
    databaseURL: "https://support-for-customer-default-rtdb.firebaseio.com",
    projectId: "support-for-customer",
    storageBucket: "support-for-customer.firebasestorage.app",
    messagingSenderId: "980625177287",
    appId: "1:980625177287:web:07a982db19b5dcae82dce2",
    measurementId: "G-07QM730L0V"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "fir-react-app-2eef2.firebaseapp.com",
  projectId: "fir-react-app-2eef2",
  storageBucket: "fir-react-app-2eef2.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

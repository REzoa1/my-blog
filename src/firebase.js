import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCT2vsyw2oK91I2y0gjEtDpSVAJSXdIGkU",
  authDomain: "fir-react-app-2eef2.firebaseapp.com",
  projectId: "fir-react-app-2eef2",
  storageBucket: "fir-react-app-2eef2.appspot.com",
  messagingSenderId: "62729198170",
  appId: "1:62729198170:web:3a6aa514768119a4dd5663"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
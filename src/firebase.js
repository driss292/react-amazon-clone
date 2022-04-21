// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCYKoTWAE8dU35eEDRtu61cy4r-lpr6ZE",
  authDomain: "clone-dk-3483c.firebaseapp.com",
  projectId: "clone-dk-3483c",
  storageBucket: "clone-dk-3483c.appspot.com",
  messagingSenderId: "23570667614",
  appId: "1:23570667614:web:d80e7da5524ed01bf07ccf",
  measurementId: "G-2WW94QHST7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmcM-GH0X9nxqFPtmIPZSlziPv3_2AgiY",
  authDomain: "closet-application-a2008.firebaseapp.com",
  projectId: "closet-application-a2008",
  storageBucket: "closet-application-a2008.appspot.com",
  messagingSenderId: "163159473008",
  appId: "1:163159473008:web:541c081c802a40d398edb5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { auth, db, storage };

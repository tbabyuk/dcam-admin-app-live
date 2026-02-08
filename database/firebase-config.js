import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOKndlEYUYFp9hgC7geS2GphUcWGjWTEk",
    authDomain: "dcam-admin.firebaseapp.com",
    projectId: "dcam-admin",
    storageBucket: "dcam-admin.appspot.com",
    messagingSenderId: "60735851124",
    appId: "1:60735851124:web:c8d196fd3ae05365649f21"
  };


const app = initializeApp(firebaseConfig)

export const adminAuth = getAuth(app)
export const adminDB = getFirestore(app)

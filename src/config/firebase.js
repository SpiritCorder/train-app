import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDtnKn25KYcB69YPpfpnt8YONBZNBXwGd8",
  authDomain: "train-app-2dc6a.firebaseapp.com",
  projectId: "train-app-2dc6a",
  storageBucket: "train-app-2dc6a.appspot.com",
  messagingSenderId: "984182882466",
  appId: "1:984182882466:web:352591ed85712e4f4a17fb"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
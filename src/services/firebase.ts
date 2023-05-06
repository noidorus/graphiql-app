import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export type User = {
  id: string;
  email: string;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      id: user.uid,
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const logout = async () => {
  signOut(auth);
};

export { firebase, db, auth, registerWithEmailAndPassword, logInWithEmailAndPassword, logout };

import { initializeApp, getApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

export type UserData = {
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

const getFirebaseApp = (config = {}) => {
  try {
    return getApp();
  } catch (e) {
    // console.log(e);
    return initializeApp(config);
  }
};

const firebase = getFirebaseApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

const registerWithEmailAndPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
    await addDoc(collection(db, 'users'), {
      id: res.user.uid,
      email,
    });

    return res;
  });
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
  signOut(auth);
};

setPersistence(auth, browserSessionPersistence);

export { firebase, db, auth, registerWithEmailAndPassword, logInWithEmailAndPassword, logout };

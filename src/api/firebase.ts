import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const createAccount = async (email: string, password: string) =>
  await auth.createUserWithEmailAndPassword(email, password);

export const signInWithEmail = async (email: string, password: string) =>
  await auth.signInWithEmailAndPassword(email, password);

export const signOut = async () => {
  await auth.signOut();
};

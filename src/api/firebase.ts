import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export const auth = firebase.auth();

export const createAccount = async (email: string, password: string) =>
  await auth.createUserWithEmailAndPassword(email, password);

export const signInWithEmail = async (email: string, password: string) =>
  await auth.signInWithEmailAndPassword(email, password);

export const signOut = async () => {
  await auth.signOut();
};

export const getCartByDoc = async (uid: string) => {
  return await db.collection("carts").doc(uid);
};

export const getUserCart = async (uid: string) => {
  const cart = await db.collection("carts").doc(uid).get();
  return {
    data: await cart.data(),
    isExists: await cart.exists,
  };
};

export const createNewDocument = async (
  collectionName: string,
  uid: string,
  payload: any
) => {
  await setDoc(doc(db, collectionName, uid), payload);
};

export const updateDocument = async (
  collectionName: string,
  uid: string,
  payload: any
) => {
  await db.collection(collectionName).doc(uid).update(payload);
};

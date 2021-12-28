import { FirebaseErrorCodeType } from "types";

export const firebaseErrorCode: FirebaseErrorCodeType = {
  "auth/invalid-credential": "Invalid Email / Password",
  "auth/invalid-email": "Invalid Email",
  "auth/user-not-found": "User Not Found",
  "auth/wrong-password": "Wrong Password",
  "auth/email-already-in-use": "User already exists",
  "auth/too-many-requests":
    "Too many request, please wait for an hour to try again",
};

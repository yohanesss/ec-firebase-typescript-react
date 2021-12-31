import { createAccount, signInWithEmail } from "api/firebase";
import { useState } from "react";
import { firebaseErrorCode } from "utils/firebaseErrorCode";
import { FirebaseError } from "@firebase/util";
import { useAuth } from "hooks/useAuth";
import { Navigate } from "react-router-dom";

export const AuthSignInRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [peekPassword, togglePeekPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSignUp = async () => {
    try {
      await createAccount(email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(firebaseErrorCode[error.code]);
        console.error(error.message);
      }
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(firebaseErrorCode[error.code]);
        console.error(error.message);
      }
    }
  };

  return !user ? (
    <div className="w-11/12 m-auto">
      <div className="m-auto w-fit mt-8 flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold">
          <label htmlFor="email-input">Email</label>
        </h2>
        <input
          id="email-input"
          className="shadow-lg border border-gray-200 rounded-sm p-2"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2 className="text-2xl font-bold mt-4">
          <label htmlFor="password-input">Password</label>
        </h2>
        <input
          id="password-input"
          className="shadow-lg border border-gray-200 rounded-sm p-2"
          type={peekPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="select-none pt-2">
          <input
            id="peek-password"
            type="checkbox"
            value="peekPassword"
            onChange={(e) => togglePeekPassword(e.target.checked)}
          />
          <label htmlFor="peek-password" className="pl-2">
            Peek Password
          </label>
        </div>
        <div className="flex justify-evenly items-center mt-6">
          <button
            onClick={signIn}
            className="m-2 px-4 py-2 shadow-lg text-white bg-blue-600 rounded-sm"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="m-2 px-4 py-2 shadow-lg text-white bg-gray-400 rounded-sm"
          >
            Sign Up
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  ) : (
    <Navigate replace to="/" />
    // <h2 className="mt-4 text-center">Welcome {user.email}</h2>
  );
};

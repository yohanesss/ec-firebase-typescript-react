import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { auth } from "api/firebase";

export const AuthContext = createContext<firebase.User | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be rendered inside the AuthProvider`);
  }

  return context;
};

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

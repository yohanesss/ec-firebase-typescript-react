import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { auth, db, getCartByDoc, getUserCart } from "api/firebase";

export const AuthContext = createContext<{
  user: firebase.User | null;
  cart: firebase.firestore.DocumentData | null;
}>({ user: null, cart: null });

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
  const [cart, setCart] = useState<firebase.firestore.DocumentData | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("carts")
        .doc(user.uid)
        .onSnapshot(
          (docSnapshot) => {
            setCart({ data: docSnapshot.data() });
          },
          (err) => {
            throw new Error(`Encountered error: ${err}`);
          }
        );
    } else {
      setCart(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: user, cart: cart }}>
      {children}
    </AuthContext.Provider>
  );
};

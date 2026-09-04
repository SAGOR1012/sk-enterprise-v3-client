import { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);

  /*  loading show korar jonne */
  const [loading, setLoading] = useState(true);

  /*create new user  / signUp */
  const createUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };
  /* login / signIn */
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  /* logout / signOut */
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    /* on authStateChange sobsomoy watch korte thakbe j kokhn change hocche */
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // You can also set up a listener for user changes here
    });
    return () => {
      /* watch korte thakbe kono kichu change hoise ki na  */
      unsubscribe();
    };
  }, []);

  // Simulate fetching user data
  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;

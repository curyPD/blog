import React, { useState, useEffect, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { app } from "../firebase";

const auth = getAuth(app);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [curUser, setCurUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurUser(user);
      console.log(user);
    });
  }, []);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function LogOut() {
    signOut(auth);
  }

  function updateUserName(user, name) {
    updateProfile(user, {
      displayName: name,
    });
  }

  function resetPassword(email) {
    sendPasswordResetEmail(auth, email);
  }

  const value = {
    curUser,
    signUp,
    logIn,
    LogOut,
    updateUserName,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

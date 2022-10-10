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

import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [curUser, setCurUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurUser(user);
      console.log(user);
    });
  }, []);

  // useEffect(() => {
  //   navigate("/");
  // }, [curUser]);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    signOut(auth);
  }

  function updateUserName(user, name) {
    return updateProfile(user, {
      displayName: name,
    });
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
    // TODO:
    // When deployed, pass the continue URL parameter to the function. Url probably should lead to Log In page.
  }

  const value = {
    curUser,
    signUp,
    logIn,
    logOut,
    updateUserName,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

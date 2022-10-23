import React, { useState, useEffect, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";

import { useNavigate } from "react-router-dom";
import { useArticles } from "./ArticlesContext";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [curUser, setCurUser] = useState("initialization");
  const { curOpenArticleId } = useArticles();
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurUser(user);
      if (!user) return;
      navigate(`/articles/${curOpenArticleId}`);
    });
  }, [curOpenArticleId]);

  console.log(curOpenArticleId);

  function signInWithGoogle() {
    return signInWithPopup(auth, provider);
  }

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
    // When deployed, pass the continue URL parameter to the function.
    // Url probably should lead to Log In page.
  }

  const value = {
    curUser,
    signUp,
    logIn,
    logOut,
    updateUserName,
    resetPassword,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

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
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "../firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getDatabase(app);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [curUser, setCurUser] = useState("initialization");

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) return setCurUser(user);

      const { uid } = user;
      const userRef = ref(db, `users/${uid}`);
      onValue(
        userRef,
        async (snapshot) => {
          if (snapshot.exists()) return setCurUser(snapshot.val());

          const userData = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            role: {
              subscriber: true,
            },
          };
          await set(userRef, userData);
          return setCurUser(userData);
        },
        { onlyOnce: true }
      );
    });
  }, []);

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

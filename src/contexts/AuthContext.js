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
import { getDatabase, ref, set, get } from "firebase/database";
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
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return setCurUser(user);
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, { role: { subscriber: true } });
        return setCurUser({ ...user, role: { subscriber: true } });
      }
      setCurUser({ ...user, role: snapshot.val().role });
    });
  }, []);

  function signInWithGoogle() {
    return signInWithPopup(auth, provider);
  }

  async function signUp(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      await updateUserName(user, name);
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, { role: { subscriber: true } });
      setCurUser({ ...user, role: { subscriber: true }, displayName: name });
    } catch (err) {
      console.error(err);
    }
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
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

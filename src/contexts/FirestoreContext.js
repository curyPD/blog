import React, { useContext } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { app } from "../firebase";

const db = getFirestore(app);

const FirestoreContext = React.createContext();

export const useFirestore = function () {
  return useContext(FirestoreContext);
};

function FirestoreProvider({ children }) {
  const value = {
    addDocument,
  };

  async function addDocument(title, preface, imageUrl, content) {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        title,
        preface,
        imageUrl,
        content,
      });
      console.log(`Document written with ID: ${docRef.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}

export default FirestoreProvider;

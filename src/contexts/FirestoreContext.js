import React, { useState, useContext } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { app } from "../firebase";

const db = getFirestore(app);

const FirestoreContext = React.createContext();

export const useFirestore = function () {
  return useContext(FirestoreContext);
};

function FirestoreProvider({ children }) {
  const [articles, setArticles] = useState([]);

  const value = {
    addDocument,
    getData,
    articles,
  };

  async function addDocument(title, preface, imageUrl, content) {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        title,
        preface,
        imageUrl,
        content,
        date: Timestamp.fromDate(new Date()),
      });
      console.log(`Document written with ID: ${docRef.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const docs = querySnapshot.docs;
    setArticles(docs);
  }

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}

export default FirestoreProvider;

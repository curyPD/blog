import React, { useState, useContext, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  remove,
} from "firebase/database";
import { app } from "../firebase";

const db = getDatabase(app);

const ArticlesContext = React.createContext();
export function useArticles() {
  return useContext(ArticlesContext);
}

function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [editedArticleId, setEditedArticleId] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    return onChildAdded(ref(db, "articles"), (data) => {
      const { key } = data;
      const val = data.val();
      console.log(key, val);
      setArticles((prevArticles) => {
        return [
          ...prevArticles,
          {
            key,
            ...val,
          },
        ];
      });
    });
  }, []);

  useEffect(() => {
    return onChildChanged(ref(db, "articles"), (data) => {
      const { key } = data;
      const val = data.val();
      console.log(key, val);
      setArticles((prevArticles) => {
        return prevArticles.map((article) =>
          article.key === key ? { key, ...val } : article
        );
      });
      setEditedArticleId("");
    });
  }, []);

  useEffect(() => {
    return onChildRemoved(ref(db, "articles"), (data) => {
      const { key } = data;
      const val = data.val();
      console.log(key, val);
      setArticles((prevArticles) => {
        return prevArticles.filter((article) => article.key !== key);
      });
      if (key === editedArticleId) {
        setEditedArticleId("");
      }
      setPostIdToDelete("");
    });
  }, [editedArticleId]);

  function uploadArticle(data) {
    const newArticleRef = push(ref(db, "articles"));
    return set(newArticleRef, data);
  }

  function updateArticle(data) {
    const articleRef = ref(db, `articles/${editedArticleId}`);
    return set(articleRef, data);
  }

  function deleteArticle() {
    const articleRef = ref(db, `articles/${postIdToDelete}`);
    return remove(articleRef);
  }

  const value = {
    articles,
    uploadArticle,
    editedArticleId,
    setEditedArticleId,
    updateArticle,
    postIdToDelete,
    setPostIdToDelete,
    deleteArticle,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export default ArticlesProvider;

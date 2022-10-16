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
    onChildAdded(ref(db, "articles"), (data) => {
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
    onChildChanged(ref(db, "articles"), (data) => {
      setEditedArticleId("");
      const { key } = data;
      const val = data.val();
      console.log(key, val);
      setArticles((prevArticles) => {
        return prevArticles.map((article) =>
          article.key === key ? { key, ...val } : article
        );
      });
    });
    onChildRemoved(ref(db, "articles"), (data) => {
      setPostIdToDelete("");
      const { key } = data;
      console.log(key);
      setArticles((prevArticles) => {
        return prevArticles.filter((article) => article.key !== key);
      });
    });
  }, []);
  console.log(articles);

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

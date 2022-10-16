import React, { useState, useContext, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  onChildChanged,
} from "firebase/database";
import { app } from "../firebase";

const db = getDatabase(app);

const ArticlesContext = React.createContext();
export function useArticles() {
  return useContext(ArticlesContext);
}

function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [editedArticleId, setEditedArticleId] = useState(null);

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
      setEditedArticleId(null);
      const { key } = data;
      const val = data.val();
      console.log(key, val);
      setArticles((prevArticles) => {
        return prevArticles.map((article) =>
          article.key === key ? { key, ...val } : article
        );
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

  const value = {
    articles,
    uploadArticle,
    editedArticleId,
    setEditedArticleId,
    updateArticle,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export default ArticlesProvider;

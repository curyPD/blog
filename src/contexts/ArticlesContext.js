import React, { useState, useContext, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
import { app } from "../firebase";

const db = getDatabase(app);

const ArticlesContext = React.createContext();
export function useArticles() {
  return useContext(ArticlesContext);
}

function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState("");

  const articleListRef = ref(db, "articles");
  useEffect(() => {
    return onChildAdded(articleListRef, (data) => {
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
  console.log(articles);

  async function uploadArticle(data) {
    const newArticleRef = push(articleListRef);
    await set(newArticleRef, data);
    setMessage("added");
  }

  const value = {
    articles,
    uploadArticle,
    message,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export default ArticlesProvider;

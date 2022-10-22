import React, { useState, useContext, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  update,
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
  const [curOpenArticleId, setCurOpenArticleId] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    return onChildAdded(ref(db, "articles"), (data) => {
      const { key } = data;
      const val = data.val();
      // console.log(key, val);
      setArticles((prevArticles) => {
        return [
          {
            key,
            ...val,
          },
          ...prevArticles,
        ];
      });
    });
  }, []);

  useEffect(() => {
    return onChildChanged(ref(db, "articles"), (data) => {
      const { key } = data;
      const val = data.val();
      // console.log(key, val);
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
      // console.log(key, val);
      setArticles((prevArticles) => {
        return prevArticles.filter((article) => article.key !== key);
      });
      if (key === editedArticleId) {
        setEditedArticleId("");
      }
      setPostIdToDelete("");
    });
  }, [editedArticleId]);

  useEffect(() => {
    setComments([]);
    if (!curOpenArticleId) return;
    return onChildAdded(ref(db, `comments/${curOpenArticleId}`), (data) => {
      const { key } = data;
      const val = data.val();
      // console.log(key, val);
      setComments((prevComments) => {
        return [{ key, ...val }, ...prevComments];
      });
    });
  }, [curOpenArticleId]);

  function uploadArticle(data) {
    const newArticleKey = push(ref(db, "articles")).key;
    const updates = {};
    updates[`articles/${newArticleKey}`] = data;
    updates[`comments/${newArticleKey}`] = {};
    return update(ref(db), updates);
  }

  function updateArticle(data) {
    const articleRef = ref(db, `articles/${editedArticleId}`);
    return set(articleRef, data);
  }

  function deleteArticle() {
    const updates = {};
    updates[`articles/${postIdToDelete}`] = null;
    updates[`comments/${postIdToDelete}`] = null;
    return update(ref(db), updates);
  }

  function addComment(author, profilePicture, uid, comment, date) {
    // console.log(author, profilePicture, comment, date, curOpenArticleId);
    const newCommentRef = push(ref(db, `comments/${curOpenArticleId}`));
    const commentData = {
      content: comment,
      upload: date,
      author,
      uid,
      profilePicture: profilePicture || "",
    };
    return set(newCommentRef, commentData);
  }

  function addLike(uid) {
    // console.log(uid, curOpenArticleId);
    const likeListRef = ref(db, `articles/${curOpenArticleId}/likes`);
    return set(likeListRef, { [uid]: true });
  }

  function dislike(uid) {
    // console.log(uid, curOpenArticleId);
    const likeListRef = ref(db, `articles/${curOpenArticleId}/likes`);
    return set(likeListRef, { [uid]: null });
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
    comments,
    addComment,
    setCurOpenArticleId,
    addLike,
    dislike,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export default ArticlesProvider;

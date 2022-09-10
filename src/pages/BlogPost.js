import React from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../contexts/FirestoreContext";

function BlogPost() {
  const { articleId } = useParams();
  return <h2>Post #{articleId}</h2>;
}

export default BlogPost;

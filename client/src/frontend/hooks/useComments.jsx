/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import api from '../APIs/api';

export default function useComments() {
  // State: comments
  const [comments, setComments] = useState([]);

  // Get a post's all comments with its account info.
  const getComments = async (postId) => {
    const res = await fetch(api.baseURL + `/comments/${postId}`, {
      method: 'GET'
    });
    const output = await res.json();

    if (output.success) {
      setComments(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // Add a new comment.
  const addComment = async (newComment) => {
    const res = await fetch(api.baseURL + '/comments', {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify(newComment)
    });
    const output = await res.json();

    if (output.success) {
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // Effect: fetch comments.
  const { postId } = useParams();
  useEffect(() => {
    getComments(postId);
  }, []);

  return { comments, getComments, addComment };
}

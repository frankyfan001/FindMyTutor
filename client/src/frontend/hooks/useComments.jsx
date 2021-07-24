/* eslint-disable */
import React, {useEffect, useState} from 'react';
import { api } from '../APIs/api';
import {useParams} from "react-router";

export default function useComments() {
  // State: comments
  const [comments, setComments] = useState([]);

  // Get a post's all comments with its account info.
  const getComments = async (postId) => {
    const res = await fetch('https://find-my-tutor-ubc.herokuapp.com/comments/' + postId, {
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
    const res = await fetch('https://find-my-tutor-ubc.herokuapp.com/comments', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newComment)
    });
    const output = await res.json();

    if (output.success) {
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  const deleteComment = async (id) => {
    console.log(`delete post: ${id}`);
    const req = await api.delete('/comments', {
      params: { id },
    });
  };

  const updateComment = async (comment) => {
    console.log(`update comment: ${comment.id}`);
    console.log(comment);
    const newComments = comments.splice(
      comments.findIndex((oldComment) => {
        console.log('finding idx');
        console.log(oldComment.id);
        console.log(comment.id);
        return oldComment.id === comment.id;
      }),
      1,
      comment,
    );
    console.log(newComments);
    setComments(
      newComments,
    );
    const req = await api.put('/comments', JSON.stringify(comment));
    const res = await req.json();
  };

  // Effect: fetch comments.
  const { postId } = useParams();
  useEffect(() => {
    getComments(postId);
  }, []);

  return { comments, getComments, addComment };
}

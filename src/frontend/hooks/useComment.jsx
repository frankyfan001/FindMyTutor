import React, { useState } from 'react';
import { api } from '../APIs/api';

export default function useComments() {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    console.log('get posts');
    const req = await api.get('/comments');
    const res = await req.json();
    setComments(res);
  };
  const addComment = async (newComment) => {
    console.log(`add post: ${newComment.id}`);
    const req = await api.post('/comments', JSON.stringify(newComment));

    const res = await req.json();
    setComments([...comments, newComment]);
  };

  const deleteComment = async (id) => {
    console.log(`delete post: ${id}`);
    const req = await api.delete('/comments', {
      params: { id },
    });
  };

  const updateComment = async (comment) => {
    console.log(`update post: ${comment.id}`);
    const req = await api.put('/comments', JSON.stringify(comment));

    const res = await req.json();
    setComments(
      comments.splice(
        comments.findIndex((oldComment) => oldComment.id === comment.id),
        1,
        comment,
      ),
    );
  };

  return {
    comments,
    setComments,
    addComment,
    updateComment,
    deleteComment,
  };
}

import React, { useState } from 'react';
import { api } from '../APIs/api';
import { mockPost } from '../components/mocks/mockPost';

export default function useComments(init) {
  const [comments, setComments] = useState(init);

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

  return {
    comments,
    setComments,
    addComment,
    updateComment,
    deleteComment,
  };
}

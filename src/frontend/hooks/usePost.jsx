import React, { useState } from 'react';
import { api } from '../APIs/api';
import { mockPost } from '../components/mocks/mockPost';

export default function usePost() {
  const [post, setPost] = useState(mockPost);
  const getPost = async (id) => {
    console.log(`get single post: ${id}`);
    const req = await api.get('/posts', {
      params: { id },
    });

    const data = await req.json();
    return data;
  };

  const updatePost = async (newPost) => {
    console.log(`update post: ${newPost.id}`);
    setPost(
      newPost,
    );
    const req = await api.put('post', JSON.stringify(post));

    const res = await req.json();
  };

  return {
    post, setPost, getPost, updatePost,
  };
}

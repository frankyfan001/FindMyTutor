import React, { useEffect, useState } from 'react';
import { api } from '../APIs/api';
import { mockPosts } from '../components/mocks/mockPosts';

export default function usePosts() {
  const [posts, setPosts] = useState(mockPosts);

  const getPosts = async (filter) => {
    console.log('get posts');
    const req = await api.get('/posts', { params: { filter } });
    const res = await req.json();
    setPosts(res);
  };

  const addPost = async (newPost) => {
    console.log(`add post: ${newPost.id}`);
    setPosts([...posts, newPost]);
    const req = await api.post('/posts', JSON.stringify(newPost));

    const res = await req.json();
  };

  const deletePost = async (id) => {
    console.log(`delete post: ${id}`);
    const req = await api.delete('posts', {
      params: { id },
    });
  };

  // TODO: Update post

  return {
    posts,
    getPosts,
    setPosts,
    addPost,
    deletePost,
  };
}

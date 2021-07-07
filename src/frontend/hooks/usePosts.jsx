/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { api } from '../APIs/api';
import { mockPosts } from '../components/mocks/mockPosts';

export default function usePosts() {
  // State: posts
  const [posts, setPosts] = useState([]);

  // Get all posts with its account info.
  const getPosts = async () => {
    const res = await fetch('http://localhost:5000/posts/', {
      method: 'GET'
    });
    const output = await res.json();

    if (output.success) {
      setPosts(output.result);
    }
    return output;
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

  // Effect: fetch posts.
  useEffect(() => {
    getPosts();
  }, []);

  return { posts, getPosts, setPosts, addPost, deletePost};
}

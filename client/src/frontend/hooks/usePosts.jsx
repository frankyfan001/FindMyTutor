/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { api } from '../APIs/api';

export default function usePosts() {
  // State: posts
  const [posts, setPosts] = useState([]);

  // Get all posts with its account info.
  const getPosts = async () => {
    const res = await fetch('https://find-my-tutor-ubc.herokuapp.com/posts/', {
      method: 'GET'
    });
    const output = await res.json();

    if (output.success) {
      setPosts(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // Add a post.
  const addPost = async (newPost) => {
    const res = await fetch('https://find-my-tutor-ubc.herokuapp.com/posts', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newPost)
    });
    const output = await res.json();

    if (output.success) {
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // TODO: Jerry - filter
  // Get filtered posts.
  const getFilteredPosts = async (filter) => {
    const res = await fetch('https://find-my-tutor-ubc.herokuapp.com/posts/filter', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(filter)
    });
    const output = await res.json();

    if (output.success) {
      setPosts(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // Effect: fetch posts.
  useEffect(() => {
    getPosts();
  }, []);

  return { posts, getPosts, addPost };
}

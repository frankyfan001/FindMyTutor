/* eslint-disable */
import React, {useEffect, useState} from 'react';
import { api } from '../APIs/api';
import {useParams} from "react-router";

export default function usePost() {
  // State: post
  const [post, setPost] = useState(null);

  // Get a post with its account info.
  const getPost = async (postId) => {

    const res = await fetch('http://localhost:5000/posts/' + postId, {
      method: 'GET'
    });
    const output = await res.json();

    if (output.success) {
      setPost(output.result);
    }
    return output;
  };

  const updatePost = async (newPost) => {
    console.log(`update post: ${newPost.id}`);
    setPost(
      newPost,
    );
    const req = await api.put('post', JSON.stringify(post));

    const res = await req.json();
  };

  // Effect: fetch a post.
  const { postId } = useParams();

  useEffect(() => {
    getPost(postId);
  }, []);

  return { post, getPost, updatePost };
}

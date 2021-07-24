/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import api from '../APIs/api';

export default function usePost(address) {
  // State: post
  const [post, setPost] = useState(null);
  // State: map
  const [map, setMap] = useState(null);

  // Get a post with its account info.
  const getPost = async (postId) => {
    const res = await fetch(api.baseURL + `/posts/${postId}`, {
      method: 'GET'
    });
    const output = await res.json();

    if (output.success) {
      setPost(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // Update a post.
  const updatePost = async (postId, updatedInfo) => {
    const res = await fetch(api.baseURL + `/posts/${postId}`, {
      method: 'PUT',
      headers: api.headers,
      body: JSON.stringify(updatedInfo)
    });
    const output = await res.json();

    if (output.success) {
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // TODO: Kevin
  // Get google map.
  const getGoogleMap = async (address) => {
    const googleMap = null;
    setMap(googleMap);
  };

  // Effect: fetch a post and its map info.
  const { postId } = useParams();
  useEffect(() => {
    getPost(postId).then(r => {
      if (post && post.address) {
        getGoogleMap(post.address);
      }
    });
  }, []);

  return { post, map, getPost, updatePost };
}

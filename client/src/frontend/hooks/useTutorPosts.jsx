/* eslint-disable */
import React, {useEffect, useState} from 'react';
import api from '../APIs/api';

export default function useTutorPosts({accountHook}) {
  // State: tutor posts
  const [tutorPosts, setTutorPosts] = useState([]);
  const tutorAccountHook = accountHook;

  // Get all posts of a tutor.
  const getTutorPosts = async (tutorId) => {
    const res = await fetch(api.baseURL + `/posts/?tutorId=${tutorId}`, {
      method: 'GET'
    });
    const output = await res.json();

    if (output.success) {
      setTutorPosts(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // Delete a post.
  const deletePost = async (postId) => {
    const res = await fetch(api.baseURL + `/posts/${postId}`, {
      method: 'DELETE'
    });
    const output = await res.json();

    if (output.success) {
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // Effect: fetch posts.
  useEffect(() => {
    if (tutorAccountHook.account) {
      getTutorPosts(tutorAccountHook.account._id).catch((err) => {
      });
    }
  }, [tutorAccountHook.account]);

  return {tutorPosts, getTutorPosts, deletePost};
}

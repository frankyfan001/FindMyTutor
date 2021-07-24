/* eslint-disable */
import React, { useEffect, useState } from 'react';

export default function useTutorPosts() {
  // State: tutor posts
  const [tutorPosts, setTutorPosts] = useState([]);

  // TODO: CQ
  // Get all posts of a tutor.
  const getTutorPosts = async (tutorId) => {
    const res = await fetch('https://find-my-tutor-ubc.herokuapp.com/posts/?tutorId=' + tutorId, {
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

  // TODO: CQ
  // Delete a post.
  const deletePost = async (postId) => {
    const res = await fetch('https://find-my-tutor-ubc.herokuapp.com/posts/' + postId, {
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
    getTutorPosts();
  }, []);

  return { tutorPosts, getTutorPosts, deletePost };
}

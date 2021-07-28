/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import api from '../APIs/api';

export default function usePost() {
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
  // const getGoogleMap = async () => {
  //   // let address = post.address;
  //   const googleMap = await fetch(
  //     "https://maps.googleapis.com/maps/api/staticmap?center="+address.replace(" ", "+")+"&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C"+address.replace(" ", "+")+"&key=AIzaSyD7poePjVcrrIFmhznTp0BM_ujnqKYeiew", {
  //     method: 'GET'
  //   });
  //   // const googleMap = null;
  //   setMap(googleMap);
  // };

  // Effect: fetch a post and its map info.
  const { postId } = useParams();
  useEffect(() => {
    getPost(postId).then(r => {
      // if (post && post.address) {
      //   getGoogleMap();
      // }
    });
  }, []);

  return { post, map, getPost, updatePost };
}

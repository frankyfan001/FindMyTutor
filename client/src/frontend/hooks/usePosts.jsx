/* eslint-disable */
import React, { useEffect, useState } from "react";
import api from "../APIs/api";

export default function usePosts() {
  // State: posts
  const [posts, setPosts] = useState([]);

  // Get all posts with its account info.
  const getPosts = async () => {
    const res = await fetch(api.baseURL + "/posts", {
      method: "GET",
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
    const res = await fetch(api.baseURL + "/posts", {
      method: "POST",
      headers: api.headers,
      body: JSON.stringify(newPost),
    });
    const output = await res.json();

    if (output.success) {
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  // TODO: Jerry - filter
  const { filter, handleSearch, handleFilterSelect } = useFilter();
  // Get filtered posts.
  const getFilteredPosts = async (filter) => {
    console.log(`filter: `);
    console.log(filter);
    if (!filter.filterKey || !Object.keys(filter).includes("filterKey")) {
      getPosts();
    } else {
      const res = await fetch(api.baseURL + "/posts/filter", {
        method: "POST",
        headers: api.headers,
        body: JSON.stringify(filter),
      });
      const output = await res.json();

      if (output.success) {
        console.log("filtered post result");
        console.log(output.result);
        setPosts(output.result);
        return output.result;
      } else {
        throw new Error(output.error);
      }
    }
  };

  // Effect: fetch posts.
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    console.log("filter value");
    console.log(filter.filterValue);
    if (filter.filterKey && filter.filterValue) {
      console.log("get filtered posts");
      console.log(filter);
      getFilteredPosts(filter);
    } else {
      getPosts();
    }
  }, [filter]);

  return { posts, getPosts, addPost, handleSearch, handleFilterSelect };
}

function useFilter() {
  const [filter, setFilter] = useState({
    filterKey: null,
    filterValue: null,
  });

  const handleSearch = (searchValue) => {
    if (searchValue) {
      setFilter({
        ...filter,
        filterValue: searchValue.trim(),
      });
    } else {
      setFilter({
        ...filter,
        filterValue: null,
      })
    }
  };

  const handleFilterSelect = (event, nodeValue) => {
    console.log("filter selected: ");
    console.log(event.target.outerText);
    console.log(nodeValue);
    let text = event.target.outerText;
    // text[0] = text[0].toLowerCase();
    event.preventDefault();
    if (nodeValue > 0 && text) {
      setFilter({
        ...filter,
        filterKey: text.toLowerCase(),
      });
    }
  };

  return { filter, setFilter, handleSearch, handleFilterSelect };
}
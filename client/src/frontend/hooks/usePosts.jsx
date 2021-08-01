/* eslint-disable */
import React, { useEffect, useState } from "react";
import api from "../APIs/api";
import { useSearch } from "../components/Search";

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
  const { filter, handleSearch, handleFilterSelect, value } = useFilter();
  // Get filtered posts.
  const getFilteredPosts = async (filter) => {
    if (!filter.filterKey || !Object.keys(filter).includes("filterKey")) {
      getPosts();
    } else {
      console.log()
      if (filter.filterKey === "thumbup" && Number.isNaN(parseInt(filter.filterValue, 10))) {
        setPosts([]);
        return [];
      }
      const res = await fetch(api.baseURL + "/posts/filter", {
        method: "POST",
        headers: api.headers,
        body: JSON.stringify(filter),
      });
      const output = await res.json();

      if (output.success) {
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
    if (filter.filterKey && filter.filterValue) {
      getFilteredPosts(filter);
    } else {
      getPosts();
    }
  }, [filter]);

  return { posts, getPosts, addPost, handleSearch, handleFilterSelect, value };
}

function useFilter() {
  const [filter, setFilter] = useState({
    filterKey: null,
    filterValue: null,
  });
  const { value, handleSearchInputChange } = useSearch();

  const handleSearch = (event) => {
    console.log("handling search");
    const searchValue = event.target.value;
    console.log(searchValue);
    handleSearchInputChange(searchValue);
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
    if (nodeValue > 3 && text) {
      if (text.toLowerCase() !== filter.filterKey) {
        handleSearchInputChange("");
        setFilter({
          ...filter,
          filterKey: text.toLowerCase(),
          filterValue: null,
        });
      } else {
        setFilter({
          ...filter,
          filterKey: text.toLowerCase(),
        });
      }
    }
  };

  return { filter, setFilter, handleSearch, handleFilterSelect, value };
}
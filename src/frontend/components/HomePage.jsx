/* eslint-disable */
import {
  Button,
  Grid, makeStyles, Paper,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { mockPosts } from './mocks/mockPosts';

import FilterTreeView from './FilterTree';
import usePosts from '../hooks/usePosts';
import CardLayout from './CardLayout';
import { SearchInput } from './Search';
import Banner from "./Banner";

const useStyles = makeStyles(() => ({
  root: {
    width: '80%',
    margin: 'auto',
  },
  button: {
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
  },
}));

const usePostsCards = () => {
  const { posts, getPosts } = usePosts();
  const [filter, setFilter] = useState('');
  // const [filteredPosts, setFilteredPosts] = useState(posts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  // Click filter tree item
  const handleFilterClick = (e) => {
    e.preventDefault();
    const item = e.target.innerText.toLowerCase().trim();
    setFilter(item);
  };

  // filter posts based on filter tree selection
  const handleSearch = (newValue) => {
    const valueProcessed = newValue.trim().toLowerCase();
    const newCards = mockPosts.filter((card) => {
      console.log(filter);
      if (filter) {
        return card[filter].trim().toLowerCase().includes(valueProcessed);
      }
      return Object.values(card).some((val) => val.trim().toLowerCase().includes(valueProcessed));
    });
    setFilteredPosts(newCards);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  return {
    posts, filter, filteredPosts, handleClick: handleFilterClick, handleSearch,
  };
};

export default function HomePage({accountHook}) {
  const classes = useStyles();
  const postsHook = usePostsCards();

  return (
    <div>
      <Banner />
      <br />
      <Grid container spacing={3} direction="column" align="center" className={classes.root}>

        {/*Search Bar*/}
        <Grid item xs={12} md={12}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <Paper variant="outlined">
              <FilterTreeView onNodeSelect={postsHook.handleClick} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <SearchInput handleSearch={postsHook.handleSearch} />
            </Grid>
          </Grid>
        </Grid>

        {/*New Post Button*/}
        <Grid item xs={12} md={12} align="right">
          <Link to={accountHook.isLogin() && accountHook.isTutor() ? '/newPost' : '/login'} style={{ textDecoration: 'none', color: 'black' }}>
            <Button variant="contained" color="primary" className={classes.button} startIcon={<AddIcon />}>
              New Post
            </Button>
          </Link>
        </Grid>

        {/*Card List*/}
        <br />
        {postsHook.filteredPosts.map((post, idx) => (
          <Link to={`viewPost/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Grid item xs={12} md={12} key={idx.toString()}>
              <CardLayout post={post} idx={idx} />
            </Grid>
          </Link>
        ))}

      </Grid>
    </div>
  );
};

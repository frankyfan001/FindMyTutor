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
import { CardDemo } from './CardLayout';
import { SearchInput } from './Search';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    maxHeight: '100%',
    minWidth: '100%',
  },
  button: {
    // background: 'blue',
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

export const CardsApp = ({ accountHook }) => {
  const classes = useStyles();
  const postsHook = usePostsCards();

  return (
    <>
      <Grid container direction="row" spacing={5}>
        <Grid item>
          <Paper varient="outlined" style={{ minWidth: '200px' }}>
            <FilterTreeView onNodeSelect={postsHook.handleClick} />
          </Paper>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="stretch" justify="flex-start" className={classes.root} spacing={3} noWrap>
            <Grid item>
              <SearchInput handleSearch={postsHook.handleSearch} />
            </Grid>
            <Grid item align="right">
              <Link to={accountHook.isLogin() && accountHook.isTutor() ? '/newPost' : '/login'} style={{ textDecoration: 'none', color: 'black' }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddIcon />}
                >
                  New Post
                </Button>
              </Link>
            </Grid>
            {postsHook.filteredPosts.map((post, idx) => (
              <Link to={`viewPost/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <Grid item key={idx.toString()}>
                  <CardDemo post={post} idx={idx} />
                </Grid>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>

  );
};

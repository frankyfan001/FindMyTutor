import {
  Grid, Link, makeStyles, Paper,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { mockPosts } from './mocks/mockPosts';

import FilterTreeView from './FilterTree';
import usePosts from '../hooks/usePost';
import { CardDemo } from './CardLayout';
import { SearchInput } from './Search';
import useAccount from '../hooks/useAccount';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    maxHeight: '100%',
    minWidth: '100%',
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

export const CardsApp = ({ accountHooks }) => {
  const classes = useStyles();
  const postsHook = usePostsCards();

  return (
    <>
      <Grid container direction="row" spacing={3}>
        <Grid item>
          <Paper varient="outlined" style={{ minWidth: '200px' }}>
            <FilterTreeView onNodeSelect={postsHook.handleClick} />
          </Paper>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="stretch" justify="flex-start" className={classes.root}>
            <Grid item>
              <SearchInput handleSearch={postsHook.handleSearch} />
            </Grid>
            {postsHook.filteredPosts.map((post, idx) => (
              <Link to={`viewPost/${post.id}`}>
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

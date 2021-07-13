/* eslint-disable */
import {
  Button,
  Grid, makeStyles, Paper,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { mockPosts } from './mocks/mockPosts';

import FilterTreeView from './FilterTree';
import usePosts from '../hooks/usePosts';
import PostLayout from './PostLayout';
import { SearchInput } from './Search';
import Banner from "./Banner";
import AlertMessage from "./AlertMessage";
import {useHistory} from "react-router";
import useAlert from "../hooks/useAlert";

const useStyles = makeStyles(() => ({
  root: {
    width: '80%',
    margin: 'auto',
  },
  button: {
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
  },
  alertMessageDiv: {
    maxWidth: '390px',
  },
}));
  
export default function HomePage({accountHook, postsHook}) {
  const classes = useStyles();

  const alertHook = useAlert();

  // filter posts based on filter tree selection

  const history = useHistory();

  const handleNewPostButton = () => {
    if (accountHook.isLogin() && accountHook.isTutor()) {
      history.push("/newPost");
    } else {
      alertHook.switchToFailure("Please sign in as a tutor to add posts.");
      setTimeout(function () {
        history.push("/login?type=tutor");
      }, 3000)
    }
  };

  return (
    <div>
      <Banner />
      <Grid container spacing={1} direction="column" align="center" className={classes.root}>

        {/*Search Bar*/}
        <br />
        <Grid item xs={12} md={12}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <Paper variant="outlined">
              <FilterTreeView onNodeSelect={postsHook.handleClick} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Paper variant="outlined">
              <SearchInput handleSearch={postsHook.handleSearch} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/*New Post Button*/}
        <br />
        <Grid item xs={12} md={12} align="right">
          <Button variant="contained" color="primary" className={classes.button} startIcon={<AddIcon />}
                  onClick={handleNewPostButton}>
            NEW POST
          </Button>
        </Grid>

        {/*Show the alert message when user is not a login student.*/}
        <Grid item xs={12} md={12} align="right">
          <div className={classes.alertMessageDiv}>
            <AlertMessage alertHook={alertHook} />
          </div>
        </Grid>

        {/*Post List*/}
        <br />
        {postsHook.posts.map((post, idx) =>
          <Link key={post._id} to={`viewPost/${post._id}`} style={{ textDecoration: 'none' }}>
            <Grid item xs={12} md={12}>
              <PostLayout post={post} idx={idx} />
            </Grid>
          </Link>
        )}

      </Grid>
    </div>
  );
};

const usePostsCards = () => {
  const filters = ['tutor', 'school', 'thumbup', 'course'];
  const { posts } = usePosts();
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
      if (filter && filters.includes(filter)) {
        return card[filter].trim().toLowerCase().includes(valueProcessed);
      }
      console.log(Object.values(card));
      return Object.values(card).some((val) => {
        console.log(val);
        return val.toString().trim().toLowerCase().includes(valueProcessed);
      });
    });
    setFilteredPosts(newCards);
  };

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  return {
    posts, filter, filteredPosts, handleClick: handleFilterClick, handleSearch,
  };
};
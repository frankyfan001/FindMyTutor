/* eslint-disable */
import {
  Button,
  Grid, makeStyles, Paper,
} from '@material-ui/core';
import React, {useEffect} from 'react';
import AddIcon from '@material-ui/icons/Add';
import FilterTreeView from './FilterTree';
import PostList from './PostList';
import {SearchInput} from './Search';
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

  // Effect: fetch posts.
  useEffect(() => {
    postsHook.getPosts();
  }, []);

  const alertHook = useAlert();

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
      <Banner/>

      <Grid container spacing={1} direction="column" align="center" className={classes.root}>

        {/*Search Bar*/}
        <br/>
        <Grid item xs={12} md={12}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <Paper variant="outlined">
                <FilterTreeView onNodeSelect={postsHook.handleFilterSelect}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Paper variant="outlined">
                <SearchInput value={postsHook.value} handleSearch={postsHook.handleSearch}/>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/*New Post Button*/}
        <br/>
        <Grid item xs={12} md={12} align="right">
          <Button variant="contained" color="primary" className={classes.button} startIcon={<AddIcon/>}
                  onClick={handleNewPostButton}>
            NEW POST
          </Button>
        </Grid>

        {/*Show the alert message when user is not a login student.*/}
        <Grid item xs={12} md={12} align="right">
          <div className={classes.alertMessageDiv}>
            <AlertMessage alertHook={alertHook}/>
          </div>
        </Grid>

        {/*Post List*/}
        <PostList postsHook={postsHook}/>
      </Grid>
    </div>
  );
};

/* eslint-disable */
import {
  Grid, makeStyles,
} from '@material-ui/core';
import React from 'react';
import {Link} from "react-router-dom";
import PostLayout from "./PostLayout";

const useStyles = makeStyles(() => ({

}));

export default function PostList({ postsHook }) {
  const classes = useStyles();

  return (
    <>
      <br />
      {postsHook.posts.map((post, idx) =>
        <Link key={post._id} to={`viewPost/${post._id}`} style={{ textDecoration: 'none' }}>
          <Grid item xs={12} md={12}>
            <PostLayout post={post} idx={idx} />
          </Grid>
        </Link>
      )}
    </>
  );
}

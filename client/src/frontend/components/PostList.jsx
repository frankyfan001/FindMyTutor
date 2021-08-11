/* eslint-disable */
import {
  Grid,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import {Link} from "react-router-dom";
import PostLayout from "./PostLayout";
import usePages from "../hooks/usePages";

export default function PostList({postsHook}) {
  const {page, handleChange} = usePages();
  return (
    <>
      <br/>
      {
        postsHook.posts.slice((page - 1) * 10, page * 10).map((post, idx) =>
          <Link key={post._id} to={`viewPost/${post._id}`} style={{textDecoration: 'none'}}>
            <Grid item xs={12} md={12}>
              <PostLayout post={post} idx={idx}/>
            </Grid>
          </Link>
        )}
      <Pagination page={page} count={Math.ceil((postsHook.posts.length) / 10)} showFirstButton showLastButton
                  onChange={handleChange}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
      />
    </>
  );
}

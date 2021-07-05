/* eslint-disable */
import {
  Grid, IconButton, Typography, Avatar, makeStyles,
} from '@material-ui/core';
import React from 'react';
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Box from "@material-ui/core/Box";

const useCardStyles = makeStyles(() => ({
  root: {
    width: '98.3%',
    background: '#f6ddd1',
  },
  root1: {
    width: '98.3%',
    background: '#fcf4ee',
  },
  usernameButton: {
    textTransform: 'none',
    minWidth: '8vh',
    fontWeight: 'bold',
  },
  dateButton: {
    textTransform: 'none',
    minWidth: '8vh',
  },
  schoolButton: {
    textTransform: 'none',
    minWidth: '8vh',
    color: 'white',
    background: '#f1af8d',
    boxShadow: 'none',
  },
  courseButton: {
    textTransform: 'none',
    minWidth: '8vh',
    color: 'white',
    background: '#a5c1e2',
    boxShadow: 'none',
  },
  description: {
    textTransform: 'none',
  },
  wageButton: {
    textTransform: 'none',
  },
  thumbUpButton: {
    textTransform: 'none',
  },
}));

export default function PostLayout({ post, idx }) {
  const classes = useCardStyles();

  return (
    <>
      <div>
        <Grid container spacing={2} className={idx % 2 === 0 ? classes.root : classes.root1}>

          {/*Avatar*/}
          <Grid item xs={12} md={1}>
            <IconButton>
              <Avatar alt={post.account_ref.username[0].toUpperCase()} src={post.account_ref.avatar} />
            </IconButton>
          </Grid>

          {/*Name & Date*/}
          <Grid item xs={12} md={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button size="small">
                  <Typography className={classes.usernameButton}>
                    { post.account_ref.username }
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button size="small" className={classes.dateButton}>
                  { post.createdAt.substring(0,10) }
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/*School & Course*/}
          <Grid item xs={12} md={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button variant="contained" size="small" className={classes.schoolButton}>
                  {post.school}
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant="contained" size="small" className={classes.courseButton}>
                  {post.course}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/*Description*/}
          <Grid item xs={12} md={6} align="left">
              <Typography variant="button" align="left" color="textPrimary" className={classes.description}>
                  {post.description}
              </Typography>
          </Grid>

          {/*Wage & Likes*/}
          <Grid item xs={12} md={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button size="small" className={classes.wageButton}>
                  ${post.wage}
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button size="small" className={classes.thumbUpButton} startIcon={<ThumbUpIcon />}>
                  {post.thumbUp}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <br />
    </>
  );
}

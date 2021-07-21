/* eslint-disable */
import React, { useState } from 'react';
import {
  Avatar,
  Button, ButtonGroup,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import useTutorPosts from "../hooks/useTutorPosts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: 'auto',
  },
}));

export default function AccountPage({ accountHook }) {
  const classes = useStyles();

  const tutorPostsHook = useTutorPosts();

  return (
    <>
      {/* TODO: CQ */}
    </>
  );
};

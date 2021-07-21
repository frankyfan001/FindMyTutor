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
import usePosts from "../hooks/usePosts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: 'auto',
  },
}));

export default function AccountPage({ accountHook }) {
  const classes = useStyles();

  const postsHook = usePosts();

  return (
    <>
      TODO:
    </>
  );
};

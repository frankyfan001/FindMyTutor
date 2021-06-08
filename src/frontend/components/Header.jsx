import React from 'react';
import {
  AppBar, Button, IconButton, Link, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 0,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
  title: {
    color: 'white',
    flexGrow: 1,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  loginButton: {
    borderRadius: 20,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  registerButton: {
    borderRadius: 20,
    textTransform: 'none',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton color="inherit" edge="start" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography component={Link} href="/" underline="none" variant="h5" aria-label="title" className={classes.title}>
            Find My Tutor
          </Typography>
          <Button href="/login" underline="none" size="small" color="inherit" aria-label="login" className={classes.loginButton}>
            Sign in
          </Button>
          <Button href="/register" underline="none" variant="outlined" size="small" color="inherit" aria-label="register" className={classes.registerButton}>
            Sign up
          </Button>
          <IconButton href="/account" color="inherit" aria-label="account">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

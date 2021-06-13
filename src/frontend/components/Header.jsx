import React from 'react';
import {
  AppBar, Button, IconButton, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 0,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
  title: {
    color: 'white',
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
    color: 'white',
  },
  registerButton: {
    borderRadius: 20,
    textTransform: 'none',
    color: 'white',
    borderColor: 'white',
  },
  accountButton: {
    color: 'white',
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
          <Link to="/" style={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography variant="h5" aria-label="title" className={classes.title}>
              Find My Tutor
            </Typography>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button size="small" aria-label="title" className={classes.loginButton}>
              Sign in
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="small" aria-label="register" className={classes.registerButton}>
              Sign up
            </Button>
          </Link>
          <Link to="/account">
            <IconButton aria-label="account" className={classes.accountButton}>
              <AccountCircle />
            </IconButton>
          </Link>
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

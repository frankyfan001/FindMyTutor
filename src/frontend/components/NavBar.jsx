/* eslint-disable */
import React from 'react';
import {
  AppBar, Button, IconButton, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";

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
  logoutButton: {
    borderRadius: 20,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    color: 'white',
  },
}));

export default function NavBar({title, accountHook}) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton component={RouterLink} to="/" color="inherit" edge="start" aria-label="menu">
            <HomeIcon />
          </IconButton>
          <RouterLink to="/" style={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography variant="h5" aria-label="title" className={classes.title}>
              {title}
            </Typography>
          </RouterLink>

          {
            accountHook.isLogin() ?
              <>
                <RouterLink to="/account">
                  <IconButton aria-label="account" className={classes.accountButton}>
                    {
                      accountHook.account.avatar ?
                        <Avatar alt="" src={accountHook.account.avatar} />
                      :
                        <AccountCircle />
                    }
                  </IconButton>
                </RouterLink>
                <RouterLink to="/" style={{ textDecoration: 'none' }}>
                  <Button size="small" aria-label="logout" className={classes.logoutButton}
                          onClick={() => {accountHook.logout()}}>
                    Logout
                  </Button>
                </RouterLink>
              </>
            :
              <>
                <RouterLink to="/login" style={{ textDecoration: 'none' }}>
                  <Button size="small" aria-label="login" className={classes.loginButton}>
                    Sign in
                  </Button>
                </RouterLink>
                <RouterLink to="/register" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="small" aria-label="register" className={classes.registerButton}>
                    Sign up
                  </Button>
                </RouterLink>
              </>
          }

        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <br />
      {/*<br />*/}
    </div>
  );
}

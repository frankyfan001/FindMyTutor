/* eslint-disable */
import React from 'react';
import {
  AppBar, Button, IconButton, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import {Link as RouterLink} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DuoIcon from "@material-ui/icons/Duo";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useLocation} from 'react-router-dom';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 0,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
  title: {
    color: 'white',
    margin: 'auto auto auto 1%',
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
  accountTypeAndUsernameDiv: {
    width: '90px',
  },
  accountType: {
    fontWeight: 'bold'
  },
  onlineTutoringButtonGE700: {
    color: '#8ce68c',
    transform: 'scale(3)',
    position: 'fixed',
    bottom: '5%',
    right: '3%',
    '&:hover': {
      color: '#59e759',
      transform: 'scale(4)',
    },
  },
  onlineTutoringButtonLT700: {
    color: '#8ce68c',
    transform: 'scale(1.4)',
    position: 'fixed',
    bottom: '3%',
    right: '2%',
    '&:hover': {
      color: '#59e759',
      transform: 'scale(2)',
    },
  },
  exitButtonButtonGE700: {
    color: '#ec7475',
    transform: 'scale(3)',
    position: 'fixed',
    bottom: '5%',
    right: '3%',
    '&:hover': {
      color: '#f60a0b',
      transform: 'scale(4)',
    },
  },
  exitButtonLT700: {
    color: '#ec7475',
    transform: 'scale(1.4)',
    position: 'fixed',
    bottom: '3%',
    right: '2%',
    '&:hover': {
      color: '#f60a0b',
      transform: 'scale(2)',
    },
  },
}));

export default function NavBar({title, accountHook}) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:700px)');
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton component={RouterLink} to="/" color="inherit" edge="start" aria-label="menu">
            <HomeIcon/>
          </IconButton>
          <RouterLink to="/" style={{textDecoration: 'none', flexGrow: 1}}>
            <Typography align="left" variant="h5" aria-label="title" className={classes.title}>
              {title}
            </Typography>
          </RouterLink>

          {
            accountHook.isLogin() ?
              <>
                {/*Account Type & Username*/}
                <Grid container spacing={0} className={classes.accountTypeAndUsernameDiv}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="body2" className={classes.accountType}>
                      {accountHook.account.type.charAt(0).toUpperCase() + accountHook.account.type.slice(1)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="body2">
                      {accountHook.account.username}
                    </Typography>
                  </Grid>
                </Grid>

                {/*Account Avatar*/}
                <IconButton onClick={handleClick} aria-label="account">
                  {
                    accountHook.account.avatar ?
                      <Avatar alt={accountHook.account.username[0].toUpperCase()} src={accountHook.account.avatar}/>
                      :
                      <AccountCircle/>
                  }
                </IconButton>

                {/*Dropdown Menu for Account & Logout*/}
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem component={RouterLink} to="/account" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountBoxIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="My Account"/>
                  </StyledMenuItem>
                  <StyledMenuItem component={RouterLink} to="/" onClick={() => {
                    handleClose();
                    accountHook.logout()
                  }}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                  </StyledMenuItem>
                </StyledMenu>
              </>
              :
              <>
                <RouterLink to="/login?type=tutor" style={{textDecoration: 'none'}}>
                  <Button size="small" aria-label="login" className={classes.loginButton}>
                    Sign in
                  </Button>
                </RouterLink>
                <RouterLink to="/register?type=tutor" style={{textDecoration: 'none'}}>
                  <Button variant="outlined" size="small" aria-label="register" className={classes.registerButton}>
                    Sign up
                  </Button>
                </RouterLink>
              </>
          }

        </Toolbar>
      </AppBar>
      <br/>
      <br/>
      <br/>
      <br/>

      {/*Online Tutoring Button*/}
      {location.pathname === "/onlineTutoring" ?
        <Link href="/">
          <ExitToAppIcon className={matches ? classes.exitButtonButtonGE700 : classes.exitButtonLT700}/>
        </Link> :
        <Link href="/onlineTutoring">
          <DuoIcon className={matches ? classes.onlineTutoringButtonGE700 : classes.onlineTutoringButtonLT700}/>
        </Link>
      }

    </div>
  );
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      background: '#FF8E53',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

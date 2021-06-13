import React from 'react';
import {
  Box, makeStyles, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 0,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    paddingLeft: 60,
  },
  about: {
    color: 'white',
    textDecoration: 'none',
  },
  contact: {
    color: 'white',
    textDecoration: 'none',
  },
  copyright: {
    color: 'black',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <br />
      <footer className={classes.root}>
        <br />
        <Box display="flex" flexDirection="row">
          <Link to="/about" aria-label="about" className={classes.about}>
            About
          </Link>
        </Box>
        <br />
        <Box display="flex" flexDirection="row">
          <Link to="/contact" aria-label="contact" className={classes.contact}>
            Contact
          </Link>
        </Box>
        <br />
        <Typography variant="subtitle1" align="left" aria-label="copyright" className={classes.copyright}>
          Find My Tutor © 2021
        </Typography>
        <br />
      </footer>
    </div>
  );
}

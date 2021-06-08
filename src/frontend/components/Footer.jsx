import React from 'react';
import {
  Box, Link, makeStyles, Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 0,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    paddingLeft: 60,
  },
  about: {
    color: 'white',
  },
  contact: {
    color: 'white',
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
          <Link href="/about" variant="subtitle1" aria-label="about" className={classes.about}>
            About
          </Link>
        </Box>
        <Box display="flex" flexDirection="row">
          <Link href="/contact" variant="subtitle1" aria-label="contact" className={classes.contact}>
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

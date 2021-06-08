import React from 'react';
import { Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 0,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    paddingLeft: 60,
  },
  about: {
    display: 'block',
    color: 'white',
  },
  contact: {
    display: 'block',
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
        <Link href="/about" variant="subtitle1" align="left" aria-label="about" className={classes.about}>
          About
        </Link>
        <Link href="/contact" variant="subtitle1" align="left" aria-label="contact" className={classes.contact}>
          Contact
        </Link>
        <br />
        <Typography variant="subtitle1" align="left" aria-label="copyright" className={classes.copyright}>
          Find My Tutor © 2021
        </Typography>
        <br />
      </footer>
    </div>
  );
}

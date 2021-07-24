/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Banners from "react-banners";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  backgroundTexture: {
    margin: 'auto',
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    transform: 'scale(1)',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    backgroundImage:
      'url(https://png.pngtree.com/thumb_back/fh260/background/20190813/pngtree-horizontal-vector-halloween-banner-background-with-grunge-border-image_297712.jpg)',
    background: 'lightblue',
  },
  primaryAction: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function Banner(props) {
  const classes = useStyles();

  return (
    <section className={classes.backgroundTexture}>
      <Container maxWidth="md">
        <Box py={2} textAlign="center">
          <Typography variant="h3" component="h2" gutterBottom={true}>Find My Tutor</Typography>
          <Typography variant="h5" color="textSecondary" paragraph={true}>
            A completely free platform for students to find reliable tutors.
          </Typography>
          <Box mt={4}>
            <RouterLink to="/register?type=tutor" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="secondary" className={classes.primaryAction}>SIGN UP</Button>
            </RouterLink>
            <RouterLink to="/about" style={{ textDecoration: 'none' }}>
              <Button color="secondary">ABOUT US</Button>
            </RouterLink>
          </Box>
        </Box>
      </Container>
    </section>
  );
}

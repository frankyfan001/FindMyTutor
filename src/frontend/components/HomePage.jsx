/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { Link as RouterLink } from 'react-router-dom';
import {TutorBanner} from "./Banner";
import {CardsApp} from "./CardsApp";
import Banner1 from "./Banner1";

const useStyles = makeStyles((theme) => ({

}));

export default function HomePage(accountHook) {
  const classes = useStyles();

  return (
    <>
      <Banner1 />
      <br />
      <Grid container alignItems="center" justify="center">
        <Grid item align="center">
          <CardsApp accountHook={accountHook} />
        </Grid>
      </Grid>
    </>
  );
}

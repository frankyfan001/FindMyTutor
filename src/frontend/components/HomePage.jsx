/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {CardsApp} from "./CardsApp";
import Banner1 from "./Banner1";

const useStyles = makeStyles((theme) => ({

}));

export default function HomePage({accountHook}) {
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

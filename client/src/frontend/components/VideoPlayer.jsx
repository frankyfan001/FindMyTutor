/* eslint-disable */
// derived from tutorial: https://www.youtube.com/watch?v=oxFr7we3LC8&t=1582s
import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { SocketContext } from '../hooks/SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    borderRadius: '0.5rem',
    width: '100%',
  },
  gridContainer: {
    justifyContent: 'center',
  },
  paper: {
    width: '40%',
    minWidth: '40%',
    borderRadius: '0.5rem',
    padding: '10px',
    border: '2px solid black',
    margin: '10px',

    [theme.breakpoints.down('xs')]: {
      width: '74%',
      minWidth: '74%',
    },
  },
}));

const VideoPlayer = () => {
  const {name, accept, myVid, otherVid, end, stream, call} = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={12}>
            <Typography variant="h5">{name}</Typography>
            <video playsInline muted ref={myVid} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {accept && !end && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={12}>
            <Typography variant="h5">{call.recvCall ? call.name : "Callee"}</Typography>
            <video playsInline ref={otherVid} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;

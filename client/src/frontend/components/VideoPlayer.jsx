// derived from tutorial: https://www.youtube.com/watch?v=oxFr7we3LC8&t=1582s
import React, {useContext} from 'react';
import {Grid, Typography, Paper, makeStyles} from '@material-ui/core';
import {SocketContext} from '../SocketContext';


const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      margin: '20px',
    },
  }));

  const VideoPlayer = () => {
    const {name, accept, myVid, otherVid, end, stream, call} = useContext(SocketContext);
    const classes = useStyles();
  
    return (
      <Grid container className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">{name}</Typography>
              <video playsInline muted ref={myVid} autoPlay className={classes.video} />
            </Grid>
          </Paper>
        )}
        {accept && !end && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">{call.name}</Typography>
              <video playsInline ref={otherVid} autoPlay className={classes.video} />
            </Grid>
          </Paper>
        )}
      </Grid>
    );
  };

export default VideoPlayer;
/* eslint-disable */
import { makeStyles, AppBar, Typography} from '@material-ui/core';
import React from 'react';
import VideoPlayer from './VideoPlayer';
import Controls from './Controls';
import Notifs from './Notifs';
import {ContextProvider} from '../SocketContext';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
}));

export default function OnlineTutoringPage() {
  const classes = useStyles();

  return (
    <ContextProvider>
      <div className={classes.wrapper}>
        <br />
          <Typography variant="h3" align="center">Online Tutoring</Typography>
        <br />
        <VideoPlayer />
        <Controls>
          <Notifs />
        </Controls>
      </div>
    </ContextProvider>
  );
};

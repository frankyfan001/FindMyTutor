/* eslint-disable */
import { makeStyles, AppBar, Typography} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Controls from './Controls';
import Notifs from './Notifs';
import {ContextProvider} from '../SocketContext';


const useStyles = makeStyles(() => ({
  root: {

  },
}));

export default function OnlineTutoringPage() {
  const classes = useStyles();

  return (
    <ContextProvider>
    <div>
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h4" align="center">Online Tutoring</Typography>
    </AppBar>
    <VideoPlayer />
    <Controls>
      <Notifs />
    </Controls>
    </div>
    </ContextProvider>

  );
};

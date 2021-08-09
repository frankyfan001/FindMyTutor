/* eslint-disable */
// derived from tutorial: https://www.youtube.com/watch?v=oxFr7we3LC8&t=1582s
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../hooks/SocketContext';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  answer: {
    marginTop: 20,
    background: '#59e759',
    '&:hover': {
      background: '#59e759',
    },
  },
}));

const Notifications = () => {
  const classes = useStyles();

  const { answerCall, call, accept } = useContext(SocketContext);

  return (
    <>
      {call.recvCall && !accept && (
        <div>
          <h2>{call.name} is calling...</h2>
          <Button variant="contained" color="primary" onClick={answerCall} className={classes.answer}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;

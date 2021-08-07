// derived from tutorial: https://www.youtube.com/watch?v=oxFr7we3LC8&t=1582s

import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const { answerCall, call, accept } = useContext(SocketContext);

  return (
    <>
      {call.recvCall && !accept && (
        <div>
          <h2>{call.name} is calling</h2>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;

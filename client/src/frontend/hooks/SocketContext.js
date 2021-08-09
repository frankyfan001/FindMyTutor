/* eslint-disable */
// derived from tutorial: https://www.youtube.com/watch?v=oxFr7we3LC8&t=1582s
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import api from '../APIs/api';

const SocketContext = createContext();
const socket = io(api.baseURL);

const ContextProvider = ({children}) => {

  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [stream, setStream] = useState(null);
  const [accept, setAccept] = useState(false);
  const [end, setEnd] = useState(false);
  const [name, setName] = useState('');

  const myVid = useRef();
  const otherVid = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then(function (curStream) {
        setStream(curStream);
        myVid.current.srcObject = curStream;
      });
    socket.on('me', (id) => setMe(id));
    socket.on('makeCall', ({caller, name: callerName, signal}) => {
      setCall({recvCall: true, caller, name: callerName, signal});
    });
  }, []);

  const makeCall = function (id) {
    const peer = new Peer({initiator: true, trickle: false, stream});
    peer.on('signal', (data) => {
      socket.emit('makeCall', {callee: id, signalData: data, caller: me, name });
    });
    peer.on('stream', (curStream) => {
      otherVid.current.srcObject = curStream;
    });
    socket.on('callAccepted', (signal) => {
      setAccept(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = function () {
    setAccept(true);
    const peer = new Peer({initiator: false, trickle: false, stream});
    peer.on('signal', (data) => {
      socket.emit('answerCall', {signal: data, callee: call.caller});
    });
    peer.on('stream', (curStream) => {
      otherVid.current.srcObject = curStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const endCall = function () {
    setEnd(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      accept,
      myVid,
      otherVid,
      stream,
      name,
      setName,
      end,
      me,
      makeCall,
      endCall,
      answerCall,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

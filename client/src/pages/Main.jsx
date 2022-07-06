import { useEffect } from 'react';

import socket from 'socket.io-client'

export default function Main() {

  useEffect(() => {

    const socketUrl = 'http://localhost:8000';
    const socketClient = socket.connect(socketUrl, {
      transports: ['websocket'],
    });

    socketClient.on('connect', () => {
      const socketId = socketClient.id;
      console.log(`Socket connected with id ${socketId}`)
    });
  
    socketClient.on('disconnect', () => {
      console.log('socket disconnected');
    });

    socketClient.emit('fetchLogs', JSON.stringify({
      containerId: '18db682494bf',
    }));

    socketClient.on('sendLogs', payload => {
      console.log(payload);
      socketClient.emit('fetchLogs', JSON.stringify({
        containerId: '18db682494bf',
      }));
    })

  });


  return (
    <>Main</>
  )
}

import React, { useContext } from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <Grid 
      container 
      sx={{
        justifyContent: 'center',
        '@media (max-width: 600px)': {
          flexDirection: 'column',
        },
      }}
    >
      {stream && (
        <Paper 
          sx={{
            padding: '10px',
            border: '2px solid black',
            margin: '10px',
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || 'Name'}
            </Typography>
            <Box
              sx={{
                width: '550px',
                '@media (max-width: 600px)': {
                  width: '300px',
                },
              }}
            >
              <video 
                playsInline 
                muted 
                ref={myVideo} 
                autoPlay 
                style={{ width: '100%' }}
              />
            </Box>
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper 
          sx={{
            padding: '10px',
            border: '2px solid black',
            margin: '10px',
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || 'Name'}
            </Typography>
            <Box
              sx={{
                width: '550px',
                '@media (max-width: 600px)': {
                  width: '300px',
                },
              }}
            >
              <video 
                playsInline 
                ref={userVideo} 
                autoPlay 
                style={{ width: '100%' }}
              />
            </Box>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
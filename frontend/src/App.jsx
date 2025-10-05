import React from "react";
import { Typography, AppBar, Box } from '@mui/material';
import VideoPlayer from "./components/videoplayer";
import Notification from "./components/notification";
import Options from "./components/options";

const App = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        }}>
            <AppBar 
                position="static" 
                color="inherit"
                sx={{
                    borderRadius: '15px',
                    margin: '30px 100px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '600px',
                    border: '2px solid black',
                    '@media (max-width: 600px)': {
                        width: '90%',
                        margin: '30px 20px',
                    },
                }}
            >
                <Typography variant="h2" align="center">
                    Video Chat
                </Typography>
            </AppBar>
            <VideoPlayer />
            <Options>
                <Notification />
            </Options>
        </Box>
    );
}

export default App;
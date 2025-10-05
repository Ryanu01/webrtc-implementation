import React, {createContext, useState, useRef, useEffect} from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:8080');

const ContextProvider = ({children}) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((currentStream) => {
            setStream(currentStream);

           if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
        }
        });

        socket.on('me', (id) => setMe(id));
        socket.on('calluser', ({from, name: callerName, signal}) => {
            setCall({isReceivedcall: true, from, name: callerName, signal})
        });
    }, [])

    const answercall = () => {
        setCallAccepted(true);
        
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', {signal: data, to: call.from})
        });

        peer.on('stream', (currentStream) => {
            if (userVideo.current) {
            userVideo.current.srcObject = currentStream;
        }
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const calluser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', {userToCall: id, signalData: data, from: me, name})
        });
        
        peer.on('stream', (currentStream) => {
            if (userVideo.current) {
            userVideo.current.srcObject = currentStream;
        }
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);
            
            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leavecall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    }
    
    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            calluser,
            leavecall,
            answercall,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext};
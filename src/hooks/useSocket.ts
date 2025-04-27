import { useEffect } from 'react';
import { socket } from '../Utils/socket';
import { User } from '../Types/User';

const useSocket = (profile: User) => {

    useEffect(() => {
        // Early return if profile._id is not available
        if (!profile?._id) return;

        // Function to connect to socket and emit setup
        const connectSocket = () => {
            console.log("Connecting Socket!!");
            socket.on('connect', () => {
                console.log("Socket Server Connected");
                socket.emit('setup', { _id: profile._id });
            });
        };

        // Function to handle socket connected event
        const handleConnected = () => {
            console.log("User Socket Connected");
        };

        // Function to handle socket disconnect event
        const handleDisconnect = () => {
            console.log('User Socket Disconnected');
        };

        // Function to handle socket connection errors
        const handleConnectError = (error: Error) => {
            console.error('User Socket Connection failed:', error);
            console.log(error.message, error.name);
        };

        // Connect the socket
        connectSocket();

        // Setting up event listeners
        socket.on('connected', handleConnected);
        socket.on('disconnect', handleDisconnect);
        socket.on('connect_error', handleConnectError);

        // Cleanup the socket connection on component unmount or profile._id change
        return () => {
            console.log('Cleaning up socket connections...');
            socket.off('connect', connectSocket);
            socket.off('connected', handleConnected);
            socket.off('disconnect', handleDisconnect);
            socket.off('connect_error', handleConnectError);
            socket.disconnect();
        };
    }, [profile?._id]); // Re-run only when profile._id changes
};

export default useSocket;
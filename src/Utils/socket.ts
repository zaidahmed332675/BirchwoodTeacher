import { io } from 'socket.io-client';
import { APP_URL } from '../Service/axios';

const SocketURL = APP_URL.replace('https://', 'wss://').replace('http://', 'ws://');
export const socket = io(SocketURL,
    {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'],
    }
);
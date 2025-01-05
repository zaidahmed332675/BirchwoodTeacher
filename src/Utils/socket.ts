import { io } from 'socket.io-client';

export const socket = io("https://darkmodelabs.com:8201");
// {
//     reconnection: true,
//     reconnectionAttempts: Infinity,
//     reconnectionDelay: 1000,
//     transports: ['websocket', 'polling'],
// }
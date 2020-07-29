import initSocket from 'socket.io';
import { Server } from 'http';

let io: any;

export default {
    init: (httpServer: Server) => {
        io = initSocket(httpServer);
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
};

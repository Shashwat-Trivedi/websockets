import { WebSocketServer,WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// Connection event
wss.on('connection', (socket , request) => {

    const ip = request.socket.remoteAddress;

    socket.on('message', (rawdata) => {
        const messaage = rawdata.toString();
        console.log({messaage});

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Server Broadcast : ${messaage}`);
            }
        });
    });

    socket.send('Welcome to the WebSocket server!');

    socket.on('error', (error) => {
        console.error(`Error from client ${ip}:`, error.message);
    });

    socket.on('close', () => {
        console.log(`Client ${ip} disconnected`);
    });
});
 
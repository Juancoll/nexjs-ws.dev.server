import * as path from 'path';
import * as Express from 'express';
import * as Http from 'http';
import * as io from 'socket.io';
import * as cors from 'cors';
import { WSServer, SocketIOServer } from './@nexjs/wsserver';

import { BaseContract } from './contracts/base.contract';
import { CredentialContract } from './contracts/credential.contract';
import { User, Token } from './models';


const app = Express();
const http = Http.createServer(app);
const ioServer = io(http);
const wss = new WSServer<User, Token>();

app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
}))

wss.register(new BaseContract());
wss.register(new CredentialContract());
wss.init(new SocketIOServer(ioServer));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

ioServer.on('connection', (socket: io.Socket) => {
    console.log(`[socket.io] add    client: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`[socket.io] remove client: ${socket.id}` + socket.id);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});


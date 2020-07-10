import * as Express from 'express';
import * as Http from 'http';
import * as io from 'socket.io';
import { WSServer, SocketIOServer } from '@nexjs/wsserver';

import { MyContract } from './my.contract';
import { AuthStrategy } from './auth.strategy';
import * as tools from 'tools'
import { User, Token } from 'models';


const app = Express();
const http = Http.createServer(app);
const ioServer = io(http);
const wss = new WSServer<User, Token>(new AuthStrategy());

wss.register(new MyContract());
wss.init(new SocketIOServer(ioServer));
wss.auth.isLoginRequired = true;
wss.auth.loginRequiredTimeout = 3000;
tools.registerDebugEvent(wss);
tools.registerAuthDebugEvents(wss);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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


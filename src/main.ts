import * as path from 'path';
import * as Express from 'express';
import * as Http from 'http';
import * as io from 'socket.io';
import * as cors from 'cors';
import { WSServer, SocketIOServer } from './@nexjs/wsserver';

import { BaseContract } from './contracts/base.contract';
import { CredentialContract } from './contracts/credential.contract';
import { User, Token } from './models';
import { AuthStrategy } from './auth/auth.strategy';
import { AuthContract } from './contracts/auth.contract';
import *  as tools from './tools';


const app = Express();
app.use(Express.static(path.resolve(__dirname + '/../public')));
const http = Http.createServer(app);
const ioServer = io(http);

app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
}))

const authStrategy = new AuthStrategy();
authStrategy.onAdd.sub(() => console.log('[authStrategy] onAdd'));
authStrategy.onRemove.sub(() => console.log('[authStrategy] onRemove'));

const wss = new WSServer<User, Token>(new AuthStrategy());

wss.register(new BaseContract());
wss.register(new CredentialContract());
wss.register(new AuthContract());
wss.init(new SocketIOServer(ioServer));

tools.registerDebugEvent(wss);
tools.registerAuthDebugEvents(wss);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

ioServer.on('connection', (socket: io.Socket) => {
    console.log(`[socket.io] add    client: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`[socket.io] remove client: ${socket.id}`);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});


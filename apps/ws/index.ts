import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";

const wss = new WebSocketServer({ port: 8080 });

export interface AuthRequest extends Request {
    userId?: string;
}

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if(!url) {
        ws.close();
        return;
    }
    const token = new URLSearchParams(url.split('?')[1]).get('token');
    console.log(token)
    if(!JWT_SECRET) {
        return;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded) {
        ws.close();
        return;
    }
    ws.on('message', function message(data) {
        ws.send('pong')
    })
});

export { WebSocketServer };

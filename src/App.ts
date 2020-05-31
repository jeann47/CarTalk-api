import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import './database';
import Socket from './app/middlewares/SocketIo';
import routes from './routes';

const app = express();
const io = new Socket(app);

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction): void => {
    req.io = io.io;
    req.connectedUsers = io.connectedUsers;
    return next();
});
app.use(routes);

export default io.server;

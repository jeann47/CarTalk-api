declare namespace Express {
    // eslint-disable-next-line no-undef
    import Server = SocketIO.Server;

    export interface Request {
        user: {
            id: string;
        };
        io: Server;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        connectedUsers: { [key: string]: any };
    }
}

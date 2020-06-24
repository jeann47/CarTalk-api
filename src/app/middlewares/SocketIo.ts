import { Express } from 'express';
import io, { Server } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { ObjectLiteral } from 'typeorm';

interface Coords {
    speed?: number;
    heading?: number;
    accuracy?: number;
    altitude?: number;
    longitude: number;
    latitude: number;
    longitudeDelta?: number;
    latitudeDelta?: number;
}

class Io {
    server: HttpServer;

    connectedUsers: ObjectLiteral;

    io: Server;

    constructor(app: Express) {
        this.server = createServer(app);
        this.io = io(this.server);
        this.connectedUsers = {};
        this.socket();
    }

    socket(): void {
        this.io.on('connection', socket => {
            const { user_id } = socket.handshake.query;
            this.connectedUsers[user_id] = { id: socket.id };
            socket.on('disconnect', () => {
                delete this.connectedUsers[user_id];
            });
            socket.on('moved', ({ coordinate, route }) => {
                this.connectedUsers[user_id] = {
                    ...this.connectedUsers[user_id],
                    coordinate,
                    route,
                };
            });

            socket.on('getContact', ({ target, for: name }) => {
                socket
                    .to(this.connectedUsers[target].id)
                    .emit('allowContact', name, user_id);
            });
            socket.on('confirmNumber', ({ phone, for: target }) => {
                socket
                    .to(this.connectedUsers[target].id)
                    .emit('contactAllowed', phone, user_id);
            });

            socket.on('pos', async ({ range }) => {
                try {
                    const near: string[] = [];
                    const distance = {} as ObjectLiteral;
                    const to = {} as ObjectLiteral;
                    // eslint-disable-next-line array-callback-return
                    Object.entries(this.connectedUsers).map(user => {
                        if (user[0] !== user_id && user[1].coordinate) {
                            const dist = this.CoordsToM(
                                this.connectedUsers[user_id].coordinate,
                                user[1].coordinate,
                            );
                            if (dist <= range) {
                                near.push(user[0]);
                                distance[user[0]] = user[1].coordinate;
                                to[user[0]] = user[1].route;
                            }
                        }
                    });
                    socket.emit('positions', { near, distance, routes: to });
                } catch (error) {
                    socket.emit('failed', error);
                }
            });
        });
    }

    CoordsToM(position1: Coords, position2: Coords): string {
        const deg2rad = (deg: number): number => {
            return deg * (Math.PI / 180);
        };
        const R = 6371;
        const dLat = deg2rad(position2.latitude - position1.latitude);
        const dLng = deg2rad(position2.longitude - position1.longitude);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(position1.latitude)) *
                Math.cos(deg2rad(position1.latitude)) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c * 1000).toFixed();
    }
}

export default Io;

import { Request, Response, NextFunction } from 'express';
import { verify, sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function checkAuth(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');
    try {
        const { secret, expiresIn } = authConfig.jwt;
        const decoded = verify(token, secret);

        const { sub } = decoded as TokenPayload;

        const newToken = sign({}, secret, {
            subject: sub,
            expiresIn,
        });

        req.user = {
            id: sub,
            newToken,
        };

        return next();
    } catch {
        throw new Error('invalid JWT token');
    }
}

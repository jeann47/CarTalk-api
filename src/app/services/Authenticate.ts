import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/Users';

interface Request {
    phone: string;
    password: string;
    code?: string;
}

interface Response {
    user: User;
    token: string;
}

class Authenticate {
    public async run({ phone, password, code }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { phone } });

        if (!user) {
            throw new Error('Incorrect phone/password');
        }

        if (!code) {
            const passwordMatched = await compare(password, user.password);

            if (!passwordMatched) {
                throw new Error('Incorrect phone/password');
            }
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn, // look into refresh token
        });

        return {
            user,
            token,
        };
    }
}

export default Authenticate;

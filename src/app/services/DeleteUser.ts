import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/Users';

interface Request {
    id: string;
    password: string;
}

class DeleteUser {
    public async run(auth: Request): Promise<boolean> {
        const usersRepository = getRepository(User);
        const { id, password } = auth;
        const user = await usersRepository.findOne(id);
        if (!user) {
            throw new Error('User not found!');
        }

        if (!(await compare(password, user.password))) {
            throw new Error('Incorrect password!');
        }

        try {
            await usersRepository.delete(id);
            return true;
        } catch {
            throw new Error('delete failed!');
        }
    }
}

export default DeleteUser;

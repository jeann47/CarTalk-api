import { getRepository } from 'typeorm';
import User from '../models/Users';
import ParsePassword from './ParsePassword';

interface Password {
    oldPassword: string;
    confirmPassword: string;
    newPassword: string;
}

interface Request {
    id: string;
    name?: string;
    phone?: string;
    password?: Password;
}

interface Response {
    name?: string;
    phone?: string;
    password?: string;
}

class UpdateUser {
    public async run(newData: Request): Promise<User | null> {
        const usersRepository = getRepository(User);
        const { id } = newData;

        const user = await usersRepository.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }

        if (
            newData.phone !== user.phone &&
            (await usersRepository.findOne({ where: { phone: newData.phone } }))
        ) {
            throw new Error('There is another user using this phone number!');
        }

        let updatedUser = newData as Response;

        if (newData.password) {
            const { password } = newData;
            const parsePassword = new ParsePassword();
            const parsedPassword = await parsePassword.run({ user, password });
            delete updatedUser.password;
            updatedUser = { ...updatedUser, password: parsedPassword };
        }

        try {
            await usersRepository.update(id, updatedUser);
            const updated = await usersRepository.findOne(id);
            return updated || null;
        } catch {
            throw new Error('update failed!');
        }
    }
}

export default UpdateUser;

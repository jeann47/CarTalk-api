import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';

interface Request {
    name: string;
    phone: string;
    password: string;
}

class CreateUser {
    public async run({ name, password, phone }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            phone,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUser;

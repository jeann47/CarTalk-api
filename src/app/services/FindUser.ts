import { getRepository } from 'typeorm';
import User from '../models/Users';

interface Request {
    name?: string;
    phone?: string;
}

class FindUser {
    public async run(request: Request): Promise<User | null> {
        const UserRepository = getRepository(User);
        const user = await UserRepository.findOne({
            where: request,
            select: ['id', 'name', 'phone'],
        });

        return user || null;
    }
}

export default FindUser;

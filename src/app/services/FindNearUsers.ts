import { getRepository } from 'typeorm';
import User from '../models/Users';

class FindNearUsers {
    public async run(near: string[]): Promise<User[] | null> {
        const UserRepository = getRepository(User);
        const user = await UserRepository.findByIds(near, {
            select: ['id', 'name'],
        });
        return user || null;
    }
}

export default FindNearUsers;

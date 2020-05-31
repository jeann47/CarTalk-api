import { getRepository } from 'typeorm';
import User from '../models/Users';

class FindUserById {
    public async run(id: string): Promise<User | null> {
        const UserRepository = getRepository(User);
        const user = await UserRepository.findOne(id);
        return user || null;
    }
}

export default FindUserById;

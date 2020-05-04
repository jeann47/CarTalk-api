import { EntityRepository, Repository } from 'typeorm';
import User from '../models/Users';

@EntityRepository(User)
class UserController extends Repository<User> {}

export default UserController;

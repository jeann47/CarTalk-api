import { compare, hash } from 'bcryptjs';
import User from '../models/Users';

interface Password {
    oldPassword: string;
    confirmPassword: string;
    newPassword: string;
}

interface Request {
    user: User;
    password: Password;
}

class ParsePassword {
    public async run({ user, password }: Request): Promise<string> {
        const { oldPassword, confirmPassword, newPassword } = password;
        if (
            newPassword !== confirmPassword ||
            !(await compare(oldPassword, user.password))
        ) {
            throw new Error('old Password does not match');
        }
        if (newPassword.length < 8) {
            throw new Error('Password must have length greater then 8');
        } else {
            const parsedPassword = await hash(newPassword, 8);
            return parsedPassword;
        }
    }
}

export default ParsePassword;

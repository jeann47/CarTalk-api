import twilio from '../../config/twilio';
import User from '../models/Users';
import FindUser from './FindUser';
import Authenticate from './Authenticate';
import 'dotenv/config';

interface Response {
    token: string;
    user: User;
}

interface Request {
    phone: string;
    code: string;
}

class CreateUser {
    public async run({ phone, code }: Request): Promise<Response | null> {
        const verify = await twilio.verify
            .services(process.env.SERVICES_TOKEN as string)
            .verificationChecks.create({
                to: phone,
                code,
            });
        if (verify.status === 'approved') {
            const findUser = new FindUser();
            const user = await findUser.run({ phone });
            if (user) {
                const auth = new Authenticate();
                const session = await auth.run({
                    phone,
                    code,
                    password: user.password,
                });

                return session;
            }
            return null;
        }
        throw new Error(verify.status);
    }
}

export default CreateUser;

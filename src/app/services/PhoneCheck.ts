import twilio from '../../config/twilio';
import User from '../models/Users';
import FindUser from './FindUser';
import Authenticate from './Authenticate';

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
            .services('VA6435ed1e21aaa9b78a9f32e035c18481')
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

                return session || null;
            }
        }
        return null;
    }
}

export default CreateUser;

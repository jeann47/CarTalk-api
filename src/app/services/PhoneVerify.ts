import twilio from '../../config/twilio';

interface Request {
    phone: string;
}

class CreateUser {
    public async run({ phone }: Request): Promise<Request> {
        const verify = await twilio.verify
            .services('VA6435ed1e21aaa9b78a9f32e035c18481')
            .verifications.create({ to: phone, channel: 'sms' });
        return { phone: verify.to };
    }
}

export default CreateUser;

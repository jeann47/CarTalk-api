import twilio from '../../config/twilio';

interface Request {
    phone: string;
}

class CreateUser {
    public async run({ phone }: Request): Promise<Request> {
        const verify = await twilio.verify
            .services(process.env.SERVICES_TOKEN as string)
            .verifications.create({ to: phone, channel: 'sms' });
        return { phone: verify.to };
    }
}

export default CreateUser;

import twilio from 'twilio';
import 'dotenv/config';

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export default client;

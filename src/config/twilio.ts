import twilio from 'twilio';

const accountSid = 'AC624ff9ff2c1456341d60719e873e4438';
const authToken = '19f4f0f5eb999801e197e025f296ab3b';

const client = twilio(accountSid, authToken);

export default client;

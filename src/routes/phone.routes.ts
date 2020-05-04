import { Router } from 'express';

import PhoneVerify from '../app/services/PhoneVerify';
import PhoneCheck from '../app/services/PhoneCheck';

const phoneRouter = Router();

phoneRouter.post('/send', async (req, res) => {
    try {
        const { phone } = req.body;

        const phoneVerify = new PhoneVerify();

        const sentPhone = await phoneVerify.run({
            phone,
        });

        return res.json({ phone: sentPhone.phone });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

phoneRouter.post('/check', async (req, res) => {
    try {
        const { phone, code } = req.body;

        const phoneCheck = new PhoneCheck();

        const session = await phoneCheck.run({
            phone,
            code,
        });

        delete session?.user.password;

        return res.json(session);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default phoneRouter;

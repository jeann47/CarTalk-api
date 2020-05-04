import { Router } from 'express';
import Authenticate from '../app/services/Authenticate';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    try {
        const { phone, password } = req.body;

        const auth = new Authenticate();

        const { user, token } = await auth.run({
            phone,
            password,
        });

        delete user.password;

        return res.json({ user, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default sessionsRouter;

import { Router } from 'express';
import CreateUser from '../app/services/CreateUser';
import FindUser from '../app/services/FindUser';

import checkAuth from '../app/middlewares/checkAuth';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        const createUser = new CreateUser();

        const user = await createUser.run({
            name,
            phone,
            password,
        });

        delete user.password;

        return res.json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
usersRouter.get('/', async (req, res) => {
    try {
        const findUser = new FindUser();

        const user = await findUser.run(req.body);

        return res.json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// usersRouter.use(checkAuth);

export default usersRouter;

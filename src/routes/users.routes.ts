import { Router } from 'express';
import CreateUser from '../app/services/CreateUser';
import FindUser from '../app/services/FindUser';
import FindUserById from '../app/services/FindUserById';
import FindNearUsers from '../app/services/FindNearUsers';
import UpdateUser from '../app/services/UpdateUser';
import DeleteUser from '../app/services/DeleteUser';

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

usersRouter.use(checkAuth);

usersRouter.put('/', async (req, res) => {
    try {
        const updateUser = new UpdateUser();

        const {
            name,
            phone,
            oldPassword,
            password: newPassword,
            confirmPassword,
        } = req.body.data;

        const newData = {
            name,
            phone,
            password: {
                oldPassword,
                confirmPassword,
                newPassword,
            },
            id: req.user.id,
        };

        if (oldPassword.length === 0) {
            delete newData.password;
        }
        const user = await updateUser.run(newData);

        return res.json({ user, newToken: req.user.newToken });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

usersRouter.delete('/:password', async (req, res) => {
    try {
        const deleteUser = new DeleteUser();

        const { password } = req.params;
        const { id } = req.user;

        const deleted = await deleteUser.run({ id, password });
        return res.json(deleted);
    } catch ({ message }) {
        return res.status(400).json({ error: message });
    }
});

usersRouter.get('/this', async (req, res) => {
    try {
        const findUserById = new FindUserById();

        const user = await findUserById.run(req.user.id);
        delete user?.password;

        return res.json({ user, newToken: req.user.newToken });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
usersRouter.get('/near', async (req, res) => {
    try {
        const findNearUsers = new FindNearUsers();
        const { near } = req.query;

        const user = await findNearUsers.run(near as string[]);

        return res.json({ user, newToken: req.user.newToken });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default usersRouter;

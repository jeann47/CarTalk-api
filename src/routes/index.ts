import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import phoneRouter from './phone.routes';

import '../database';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/phone', phoneRouter);
routes.get('/', (req, res) => res.json({ root: true }));

export default routes;

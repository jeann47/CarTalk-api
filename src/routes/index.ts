import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ root: true }));

export default routes;

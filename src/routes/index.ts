import { Router } from 'express';

import usersRouter from './users.route';
import classesRouter from './classes.route';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/classes', classesRouter);

export default routes;
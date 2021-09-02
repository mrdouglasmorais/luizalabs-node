import { Router } from 'express';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import AppointmentsController from './app/controller/AppointmentsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

// invocando middlewares
routes.use(authMiddleware);

routes.get('/qualquercoisa', UserController.index);
routes.put('/user', UserController.update);

routes.post('/appointments', AppointmentsController.store)

export default routes;
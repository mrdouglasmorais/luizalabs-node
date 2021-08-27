import { Router } from 'express';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

export default routes;
import { Router } from 'express';
import MyFirstController from './app/controller/MyFirstController';

const routes = new Router();

routes.post('/', MyFirstController.store);
routes.get('/', MyFirstController.index);

export default routes;
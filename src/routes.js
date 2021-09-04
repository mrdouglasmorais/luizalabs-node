import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import AppointmentsController from './app/controller/AppointmentsController';
import FileControllers from './app/controller/FileController';
// Upload de arquivos

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig)

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);
// 
// invocando middlewares
routes.use(authMiddleware);

routes.get('/qualquercoisa', UserController.index);
routes.put('/user', UserController.update);

routes.post('/appointments', AppointmentsController.store);

routes.post('/files', upload.single('file'), FileControllers.store);

export default routes;
import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import AppointmentsController from './app/controller/AppointmentsController';
import FileControllers from './app/controller/FileController';
import NotificationController from './app/controller/NotificationController';
// Upload de arquivos

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig)

routes.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

// invocando middlewares
routes.use(authMiddleware);

routes.get('/qualquercoisa', UserController.index);
routes.put('/user', UserController.update);

routes.post('/appointments', AppointmentsController.store);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileControllers.store);


export default routes;
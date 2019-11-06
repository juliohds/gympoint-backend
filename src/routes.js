import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import StudentController from './app/controllers/StudentController';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/users/:id', UserController.getById);
routes.post('/users', UserController.store);
routes.post('/login', SessionController.login);

routes.use(authMiddlewares);
routes.get('/users', UserController.getAll);
routes.put('/users/:id', UserController.update);

routes.put('/students/:id', StudentController.update);
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.getAll);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

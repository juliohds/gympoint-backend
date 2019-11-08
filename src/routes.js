import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import PlansController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/users/:id', UserController.getById);
routes.post('/users', UserController.store);
routes.post('/login', SessionController.login);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post('/students/:id/help-orders', HelpOrderController.store);

// auth
routes.use(authMiddlewares);
routes.get('/help-orders', HelpOrderController.index);
routes.post('/answer-help-orders/:id', HelpOrderController.answer);

routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);

routes.put('/students/:id', StudentController.update);
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);

routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);
routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);

routes.put('/registration/:id', RegistrationController.update);
routes.delete('/registration/:id', RegistrationController.delete);
routes.post('/registration', RegistrationController.store);
routes.get('/registration', RegistrationController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

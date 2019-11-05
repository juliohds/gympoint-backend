import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';

// import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/users', UserController.getAll);
routes.get('/users/:id', UserController.getById);
routes.post('/users', UserController.store);
// routes.post('/login', SessionController.login);

// routes.use(authMiddlewares);
routes.put('/users/:id', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

import { Router, Response, Request } from 'express';
import LoginController from '../controllers/LoginController';
import verify from '../middleware/verifyToken';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', (req:Request, res:Response) => loginController.validateLogin(req, res));
loginRouter.get('/role', verify, (req:Request, res:Response) => loginController
  .getRole(req, res));

export default loginRouter;

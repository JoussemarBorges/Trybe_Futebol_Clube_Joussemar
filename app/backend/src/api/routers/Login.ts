import { Router, Response, Request } from 'express';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', (req:Request, res:Response) => loginController.validateLogin(req, res));

export default loginRouter;

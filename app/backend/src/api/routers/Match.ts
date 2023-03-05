import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
// import verify from '../middleware/verifyToken';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

export default matchRouter;
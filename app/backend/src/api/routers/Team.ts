import { Router, Response, Request } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', (req:Request, res:Response) => teamsController.getAllTeams(req, res));

export default teamsRouter;

import { Request, Response } from 'express';
import TeamService from '../services/TeamServices';

class TeamsController {
  constructor(private teamService = new TeamService()) {}

  async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const result = await this.teamService.gettAllTeams();
    return res.status(200).json(result);
  }

  async getById(req:Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.teamService.getById(Number(id));
    return res.status(200).json(result);
  }
}

export default TeamsController;

import { Request, Response } from 'express';
import TeamService from '../services/TeamServices';

class TeamsController {
  constructor(private teamService = new TeamService()) {}

  async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const result = await this.teamService.gettAllTeams();
    return res.status(200).json(result);
  }
}

export default TeamsController;

import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatcheController {
  constructor(private matchService = new MatchService()) {}

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const progress: boolean = inProgress === 'true';
      const result = await this.matchService.getAllMatches(progress);
      return res.status(200).json(result);
    }
    const result = await this.matchService.getAllMatches();
    return res.status(200).json(result);
  }
}

export default MatcheController;

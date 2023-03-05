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

  async finishMatche(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.matchService.finishMatche(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async editMatche(req: Request, res: Response): Promise<Response> {
    const { params: { id }, body } = req;
    const result = await this.matchService.editMatche(Number(id), body);

    return res.status(200).json({ message: 'Placar Alterado com sucesso', result });
  }
}

export default MatcheController;

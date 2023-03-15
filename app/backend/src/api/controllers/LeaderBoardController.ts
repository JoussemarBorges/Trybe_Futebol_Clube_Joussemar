import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}
  async getTablePerformance(req: Request, res: Response): Promise<Response> {
    const path: 'home' | 'away' = req.path.substring(1) as 'home' | 'away';
    const leaderboard = await this.leaderBoardService.getLeaderBoard(path);

    return res.status(200).json({ matches: leaderboard });
  }
}

export default LeaderBoardController;
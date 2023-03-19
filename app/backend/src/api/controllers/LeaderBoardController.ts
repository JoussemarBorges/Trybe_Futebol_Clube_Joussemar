import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  async getLeaderAwayBoard(_req: Request, res: Response): Promise<Response> {
    // const path: 'home' | 'away' = req.path.substring(1) as string as 'home' | 'away';

    const leaderboard = await this.leaderBoardService.getLeaderBoard('away');

    return res.status(200).json(leaderboard);
  }

  async getLeaderHomeBoard(_req: Request, res: Response): Promise<Response> {
    // const path: 'home' | 'away' = req.path.substring(1) as string as 'home' | 'away';

    const leaderboard = await this.leaderBoardService.getLeaderBoard('home');

    return res.status(200).json(leaderboard);
  }

  async getOverallLeaderboard(_req: Request, res: Response): Promise<Response> {
    const overallLeaderBoard = await this.leaderBoardService.getOverallLeaderboard();

    return res.status(200).json(overallLeaderBoard);
  }
}

export default LeaderBoardController;

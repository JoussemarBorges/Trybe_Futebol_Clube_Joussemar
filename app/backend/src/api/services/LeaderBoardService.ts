import { ModelStatic } from 'sequelize';
import Matche from '../../database/models/MatchersModel';
import Team from '../../database/models/TeamsModel';
import { leaderboardTeam } from '../interfaces/ILeaderBoardTeam';
import {
  leaderBoard,
  overallLeaderboard,
  orderLeaderBoard,
} from '../Utils/QuerysToLeaderBoard';

class LeaderBoardService {
  protected modelMatche: ModelStatic<Matche> = Matche;
  protected modelTeam: ModelStatic<Team> = Team;

  async getLeaderBoard(localMatche: 'home' | 'away') {
    const allTeams = await this.modelTeam.findAll();

    const createLeadeBoard = await leaderBoard(allTeams, localMatche);

    return orderLeaderBoard(createLeadeBoard);
  }

  async getOverallLeaderboard(): Promise<leaderboardTeam[]> {
    const homeLeaderboard = await this.getLeaderBoard('home');
    const awayLeaderboard = await this.getLeaderBoard('away');
    const allTeams = await this.modelTeam.findAll();

    const overallLeaderBoard = allTeams.reduce((acc, currTeam) => {
      const homeTeam = homeLeaderboard
        .find((team) => team.name === currTeam.teamName) as leaderboardTeam;
      const awayTeam = awayLeaderboard
        .find((team) => team.name === currTeam.teamName) as leaderboardTeam;

      const sumHomeAndAwayLeaderboar = overallLeaderboard(awayTeam, homeTeam);

      acc.push(sumHomeAndAwayLeaderboar);

      return acc;
    }, [] as leaderboardTeam[]);

    return orderLeaderBoard(overallLeaderBoard);
  }
}

export default LeaderBoardService;

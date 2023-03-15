import { ModelStatic } from 'sequelize';
import Matche from '../../database/models/MatchersModel';
import Team from '../../database/models/TeamsModel';
import {
  getTotalMatches,
  getTotalDraws,
  getTotalWins,
  getTotalLosses,
  getTotalGoalsFavor,
  getTotalGoalsOwn,
  getGoalsBalance,
  getTotalPoints,
  getEfficiency,
} from '../Utils/QuerysToLeaderBoard';
// import calculatePoints from '../Utils/CalculatePoins';

class LeaderBoardService {
  protected modelMatche: ModelStatic<Matche> = Matche;
  protected modelTeam: ModelStatic<Team> = Team;

  async getFinishedMatches(): Promise<Matche[]> {
    const matches = await this.modelMatche.findAll({
      where: { inProgress: false },
      include: [{ model: Team, as: 'homeTeam' }, { model: Team, as: 'awayTeam' }],
    });
    return matches;
  }

  leaderBoard = async (teams: Team[], path: 'home' | 'away') => {
    const leaderBoard = await Promise.all(teams.map(async (team) => ({
      name: team.teamName,
      totalPoints: await getTotalPoints(team.id, path),
      totalGames: await getTotalMatches(team.id, path),
      totalVictories: await getTotalWins(team.id, path),
      totalDraws: await getTotalDraws(team.id, path),
      totalLosses: await getTotalLosses(team.id, path),
      goalsFavor: await getTotalGoalsFavor(team.id, path),
      goalsOwn: await getTotalGoalsOwn(team.id, path),
      goalsBalance: await getGoalsBalance(team.id, path),
      efficiency: await getEfficiency(team.id, path),
    })));

    return leaderBoard;
  };

  async getLeaderBoard(path: 'home' | 'away') {
    // const allMatches = await this.getFinishedMatches();

    const allTeams = await this.modelTeam.findAll();

    const leaderBoard = await this.leaderBoard(allTeams, path);

    return leaderBoard.sort((a, b) => +(b.totalPoints - a.totalPoints)
    || +(b.totalVictories - a.totalVictories)
    || +(b.goalsBalance - a.goalsBalance)
    || +(b.goalsFavor - a.goalsFavor)
    || +(a.goalsOwn - b.goalsOwn));
  }
}

export default LeaderBoardService;

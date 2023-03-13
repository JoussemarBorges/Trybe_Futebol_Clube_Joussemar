import { ModelStatic } from 'sequelize';
import Matche from '../../database/models/MatchersModel';
import Team from '../../database/models/TeamsModel';
import { getTotalMatches, getTotalDraws } from '../Utils/CalculatePoins';
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

  leaderBoard = async (matches: Matche[], teams: Team[], path: 'home' | 'away') => {
    const leaderBoard = await Promise.all(teams.map(async (team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: await getTotalMatches(team.id, path),
      totalVictories: 0,
      totalDraws: getTotalDraws(team.id, path),
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    })));
    console.log(path);

    return leaderBoard;
  };

  async getLeaderBoard(path: 'home' | 'away') {
    const allMatches = await this.getFinishedMatches();

    const allTeams = await this.modelTeam.findAll();

    const leaderBoard = this.leaderBoard(allMatches, allTeams, path);

    return leaderBoard;
  }
}

export default LeaderBoardService;

import { Op, Sequelize } from 'sequelize';
import Matche from '../../database/models/MatchersModel';
import { leaderboardTeam } from '../interfaces/ILeaderBoardTeam';
import Team from '../../database/models/TeamsModel';
// import MapError from '../errors/mapError';

async function getTotalMatches(teamId: number, path: 'home' | 'away') {
  const whereCondition = { [`${path}TeamId`]: teamId, inProgress: false };

  const { count } = await Matche.findAndCountAll({
    where: whereCondition,
  });

  return count;
}

async function getTotalWins(teamId: number, path:'home' | 'away') {
  const inverseSide = path === 'home' ? 'away' : 'home';

  const whereCondition = {
    [`${path}TeamId`]: teamId,
    [`${path}_Team_Goals`]: { [Op.gt]: Sequelize.col(`${inverseSide}_Team_Goals`) },
    inProgress: false,
  };

  const totalWins = await Matche.count({
    where: whereCondition,
  });

  return totalWins;
}

async function getTotalDraws(teamId: number, path:'home' | 'away') {
  const inverseSide = path === 'home' ? 'away' : 'home';
  const whereCondition = {
    [`${path}TeamId`]: teamId,
    [`${path}_Team_Goals`]: { [Op.eq]: Sequelize.col(`${inverseSide}_Team_Goals`) },

    inProgress: false,
  };

  const totalDraws = await Matche.count({
    where: whereCondition,
  });

  return totalDraws;
}

async function getTotalLosses(teamId: number, path:'home' | 'away') {
  const inverseSide = path === 'home' ? 'away' : 'home';

  const whereCondition = {
    [`${path}TeamId`]: teamId,
    [`${path}_Team_Goals`]: { [Op.lt]: Sequelize.col(`${inverseSide}_Team_Goals`) },
    inProgress: false,
  };

  const totalWins = await Matche.count({
    where: whereCondition,
  });

  return totalWins;
}

async function getTotalGoalsFavor(teamId: number, path:'home' | 'away') {
  // const inversePath = path === 'home' ? 'away' : 'home';

  const goalsFavor = await Matche.sum(`${path}_Team_Goals`, {
    where: { [`${path}TeamId`]: teamId, inProgress: false },
  });
  //   Matche.sum(`${inversePath}_Team_Goals`, {
  //     where: { [`${inversePath}TeamId`]: teamId, nProgress: false },
  //   }),
  // ]);

  return goalsFavor;
}

async function getTotalGoalsOwn(teamId: number, path:'home' | 'away') {
  const inversePath = path === 'home' ? 'away' : 'home';
  const goalsOwn = Matche.sum(`${inversePath}_Team_Goals`, {
    where: { [`${path}TeamId`]: teamId, inProgress: false },
  });

  return goalsOwn;
}

async function getGoalsBalance(teamId: number, path:'home' | 'away') {
  const goalsFavor = await getTotalGoalsFavor(teamId, path);
  const goalsOwn = await getTotalGoalsOwn(teamId, path);

  const goalsBalance = goalsFavor - goalsOwn;

  return goalsBalance;
}

async function getTotalPoints(teamId: number, path:'home' | 'away') {
  const totalWins = await getTotalWins(teamId, path);
  const totalDraws = await getTotalDraws(teamId, path);

  const totalPoints = totalWins * 3 + totalDraws;

  return totalPoints;
}

async function getEfficiency(teamId: number, path:'home' | 'away') {
  const totalPonits = await getTotalPoints(teamId, path);
  const totalMatches = await getTotalMatches(teamId, path);

  const efficiency = (totalPonits / (totalMatches * 3)) * 100;

  return efficiency.toFixed(2);
}

async function getFinishedMatches(): Promise<Matche[]> {
  const matches = await Matche.findAll({
    where: { inProgress: false },
    include: [{ model: Team, as: 'homeTeam' }, { model: Team, as: 'awayTeam' }],
  });
  return matches;
}

async function leaderBoard(teams: Team[], path: 'home' | 'away') {
  const leaderBoardHomeOrAway = await Promise.all(teams.map(async (team) => ({
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

  return leaderBoardHomeOrAway;
}

function overallLeaderboard(home: leaderboardTeam, away: leaderboardTeam): leaderboardTeam {
  const totalPoints = home.totalPoints + away.totalPoints;
  const totalGames = home.totalGames + away.totalGames;
  const objectLeaderBoard = {
    name: home.name,
    totalPoints,
    totalGames,
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    goalsBalance:
      (home.goalsFavor + away.goalsFavor) - (home.goalsOwn + away.goalsOwn),
    efficiency: (((totalPoints) / (totalGames * 3)) * 100).toFixed(2),
  };

  return objectLeaderBoard;
}

function orderLeaderBoard(leaderBoardTeam: leaderboardTeam[]): leaderboardTeam[] {
  const sortLeaderBoard = leaderBoardTeam.sort((a, b) => +(b.totalPoints - a.totalPoints)
  || +(b.totalVictories - a.totalVictories)
  || +(b.goalsBalance - a.goalsBalance)
  || +(b.goalsFavor - a.goalsFavor)
  || +(a.goalsOwn - b.goalsOwn));

  return sortLeaderBoard;
}
export {
  getTotalMatches,
  getTotalDraws,
  getTotalWins,
  getTotalLosses,
  getTotalGoalsFavor,
  getTotalGoalsOwn,
  getGoalsBalance,
  getTotalPoints,
  getEfficiency,
  getFinishedMatches,
  orderLeaderBoard,
  overallLeaderboard,
  leaderBoard,
};

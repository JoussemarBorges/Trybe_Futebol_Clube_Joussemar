import { Op, Sequelize } from 'sequelize';
import Matche from '../../database/models/MatchersModel';
// import MapError from '../errors/mapError';

async function getTotalMatches(teamId: number, path: 'home' | 'away') {
  const whereCondition = {
    [`${path}TeamId`]: teamId,
    inProgress: false,
  };

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
};

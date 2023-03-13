import { Sequelize } from 'sequelize';
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

// async function getTotalWins(teamId: number, path:'home' | 'away') {
//   const inverseSide = path === 'home' ? 'away' : 'home';

//   const whereCondition = {
//     [`${path}TeamId`]: teamId,
//     [`${path}TeamGoals`]: { [Op.gt]: Sequelize.col(`${inverseSide}TeamGoals`) },
//     inProgress: false,
//   };

//   if (whereCondition === undefined) throw new MapError('mensage deu ruim', '404');
//   const totalWins = await Matche.count({
//     where: whereCondition,
//   });

//   return totalWins;
// }

async function getTotalDraws(teamId: number, path:'home' | 'away') {
  const inverseSide = path === 'home' ? 'away' : 'home';
  const whereCondition = {
    [`${path}TeamId`]: teamId,
    [`${path}TeamGoals`]: Sequelize.col(`${inverseSide}TeamGoals`),

    inProgress: false,
  };
  const totalDraws = await Matche.count({
    where: whereCondition,
  });

  return totalDraws;
}

// async function getTotalLosses(teamId: number, path:'home' | 'away') {

//   const totalLosses = getTota - totalWins - totalDraws;
// }

// function calculatePoints(match: Matche, teamId: number, path): number {
//    // const isHomeTeam = match.homeTeamId === teamId;
//   // const isAwayTeam = match.awayTeamId === teamId;

//   // if (isHomeTeam && match.homeTeamGoals > match.awayTeamGoals) {
//   //   return 3;
//   // } if (isAwayTeam && match.awayTeamGoals > match.homeTeamGoals) {
//   //   return 3;
//   // } if (match.homeTeamGoals === match.awayTeamGoals) {
//   //   return 1;
//   // }
//   // return 0;
// }

// function totalVictories()

export { getTotalMatches, getTotalDraws };

import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';
import Matche from '../../database/models/MatchersModel';
import { IbodyEditMatche } from '../interfaces/IBodyMatcheEdit';
import { IBodyMatcheCreate } from '../interfaces/IBodyMatcheCreate';
import MapError from '../errors/mapError';

class MatchService {
  model: ModelStatic<Matche> = Matche;
  // matche = new Matche();

  async getAllMatches(inProgress?: boolean | undefined): Promise<Matche[]> {
    if (inProgress === undefined) {
      const result = await this.model.findAll({
        include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ],
      });
      return result;
    }
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });
    return result;
  }

  async finishMatche(id: number): Promise<number[] | undefined> {
    const result = await this.model.update({ inProgress: false }, { where: { id } });

    return result;
  }

  async editMatche(id: number, body: IbodyEditMatche): Promise<number[]> {
    const result = await this.model
      .update(
        {
          homeTeamGoals: body.homeTeamGoals,
          awayTeamGoals: body.awayTeamGoals,
        },
        { where: { id } },
      );
    return result;
  }

  async createMatch(inputMatch: IBodyMatcheCreate): Promise<Matche> {
    const homeTeam = await Team.findByPk(inputMatch.homeTeamId);
    const awayTeam = await Team.findByPk(inputMatch.awayTeamId);

    if (!homeTeam || !awayTeam) throw new MapError('There is no team with such id!', '404');

    if (inputMatch.homeTeamId === inputMatch.awayTeamId) {
      throw new MapError('It is not possible to create a match with two equal teams', '422');
    }

    const newMatch = await this.model.create({
      ...inputMatch,
    });

    return newMatch.dataValues;
  }
}

export default MatchService;

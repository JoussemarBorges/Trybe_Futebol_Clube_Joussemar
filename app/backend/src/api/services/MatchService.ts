import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';
import Matche from '../../database/models/MatchersModel';

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
}

export default MatchService;

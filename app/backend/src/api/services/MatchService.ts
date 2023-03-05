import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';
import Matche from '../../database/models/MatchersModel';

class MatchService {
  model: ModelStatic<Matche> = Matche;
  // matche = new Matche();

  async getAllMatches(): Promise<Matche[]> {
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return result;
  }
}

export default MatchService;

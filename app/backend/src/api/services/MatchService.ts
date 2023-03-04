import { ModelStatic } from 'sequelize';
// import Teams from '../../database/models';
import Matche from '../../database/models/MatchersModel';

class MatchService {
  model: ModelStatic<Matche> = Matche;

  async getAllMatches(): Promise<Matche[]> {
    const result = await this.model.findAll();

    return result;
  }
}

export default MatchService;

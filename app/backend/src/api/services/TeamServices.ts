import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamsModel';

class TeamService {
  model: ModelStatic<Teams> = Teams;

  async gettAllTeams(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }
}

export default TeamService;

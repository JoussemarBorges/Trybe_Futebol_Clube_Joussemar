import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamsModel';

class TeamService {
  model: ModelStatic<Teams> = Teams;

  async gettAllTeams(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }

  async getById(id: number): Promise<Teams | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}

export default TeamService;

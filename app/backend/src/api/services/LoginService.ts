import { ModelStatic } from 'sequelize';
import User from '../../database/models/UsersModel';
import JWT from '../Utils/token/JWT';
import loginShcema from '../Utils/Validations/LoginSchema';
// import mapError from '../errors/mapError';

class LoginService {
  model: ModelStatic<User> = User;
  jwt = new JWT();

  async validateLogin(email: string, password: string): Promise<object> {
    const result = await this.model.findOne({ where: { email } });

    const { error } = loginShcema.validate({ email, password });

    if (error) {
      return { message: error.message };
    }

    const payload = {
      id: result?.id,
      email: result?.email,
      username: result?.username,
      role: result?.role,
    };

    const token = { token: this.jwt.tokenGenerate(payload) };

    return token;
  }
}

export default LoginService;

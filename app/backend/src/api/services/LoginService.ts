import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../../database/models/UsersModel';
import JWT from '../Utils/token/JWT';
import loginShcema from '../Utils/Validations/LoginSchema';
import MapError from '../errors/mapError';

class LoginService {
  model: ModelStatic<User> = User;
  jwt = new JWT();

  async validateLogin(email: string, password: string): Promise<object> {
    const { error } = loginShcema.validate({ email, password });

    const result = await this.model.findOne({ where: { email } });

    if (error || !result) throw new MapError('Invalid email or password', '401');

    const comparePassword = bcrypt.compareSync(password, result.password);
    if (!comparePassword) throw new MapError('Invalid email or password', '401');

    const payload = {
      id: result.id,
      email: result.email,
      username: result.username,
      role: result.role,
    };

    const token = this.jwt.tokenGenerate(payload);
    return { token };
  }

  getRole(authorization: string) {
    const { data: { role } } = this.jwt.tokenVerify(authorization);

    return { role };
  }
}

export default LoginService;

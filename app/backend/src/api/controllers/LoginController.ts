import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import MapError from '../errors/mapError';

class LoginController {
  constructor(private loginService = new LoginService()) {}

  async validateLogin(req: Request, res: Response): Promise<object> {
    const { body: { email, password } } = req;
    if (!email || !password) {
      throw new MapError('All fields must be filled', '400');
    }

    const result = await this.loginService.validateLogin(email, password);

    return res.status(200).json(result);
  }
}

export default LoginController;

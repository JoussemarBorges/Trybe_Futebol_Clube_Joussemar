import * as jwt from 'jsonwebtoken';

class JWT {
  private _secret: string;
  private _config: object;

  constructor() {
    this._config = { algorithm: 'HS256', expiresIn: '7d' };
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
  }

  public tokenGenerate = (payload: object | null) => jwt
    .sign({ payload }, this._secret, this._config);
}

export default JWT;

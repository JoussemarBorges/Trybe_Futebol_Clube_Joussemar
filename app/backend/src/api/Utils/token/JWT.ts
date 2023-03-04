import * as jwt from 'jsonwebtoken';
import MapError from '../../errors/mapError';

class JWT {
  private _secret: string;
  private _config: object;

  constructor() {
    this._config = { algorithm: 'HS256', expiresIn: '7d' };
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
  }

  public tokenGenerate = (payload: object | null) => jwt
    .sign({ data: payload }, this._secret, this._config);

  public tokenVerify = (token: string) => {
    try {
      return jwt.verify(token, this._secret) as jwt.JwtPayload;
    } catch (error) {
      throw new MapError('Token must be a valid token', '401');
    }
  };
}

export default JWT;

import { NextFunction, Response, Request } from 'express';
import MapError from '../errors/mapError';
import JWT from '../Utils/token/JWT';

const verify = (req: Request, _res: Response, next: NextFunction) => {
  const jwt = new JWT();
  const { authorization } = req.headers;
  if (!authorization) throw new MapError('Token not found', '401');

  const verifyToken = jwt.tokenVerify(authorization);

  if (verifyToken === null) throw new MapError('Token must be a valid token', '401');

  next();
};

export default verify;

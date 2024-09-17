import jwtDecode, { JwtPayload as Jwt } from 'jwt-decode';

export interface JwtPayload extends Jwt {
  role: string;
}
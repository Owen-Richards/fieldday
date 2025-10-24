import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '../../../packages/shared/types';

interface TokenPayload {
  sub: string; // user id
  email?: string;
  phone?: string;
  roles: UserRole[];
  actAs?: 'player' | 'parent' | 'organizer';
  jti?: string; // token id for rotation tracking
}

interface RefreshTokenPayload extends TokenPayload {
  family?: string; // rotation family id
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
    issuer: 'fieldday',
    audience: 'fieldday-api',
  });
}

export function signRefreshToken(payload: RefreshTokenPayload): string {
  const tokenId = uuidv4();
  const family = payload.family || uuidv4();

  return jwt.sign({ ...payload, jti: tokenId, family }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
    issuer: 'fieldday',
    audience: 'fieldday-refresh',
  });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET, {
    issuer: 'fieldday',
    audience: 'fieldday-api',
  }) as TokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, JWT_REFRESH_SECRET, {
    issuer: 'fieldday',
    audience: 'fieldday-refresh',
  }) as RefreshTokenPayload;
}

export function rotateRefreshToken(oldPayload: RefreshTokenPayload): {
  accessToken: string;
  refreshToken: string;
} {
  const { iat, exp, jti, ...payload } = oldPayload;

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({
    ...payload,
    family: payload.family, // maintain family for rotation tracking
  });

  return { accessToken, refreshToken };
}

export function decodeToken(token: string): any {
  return jwt.decode(token);
}

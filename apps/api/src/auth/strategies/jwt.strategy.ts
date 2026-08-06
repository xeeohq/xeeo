import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: configService.getOrThrow<string>('app.jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
  console.log(payload);

  return {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
  };
}
}

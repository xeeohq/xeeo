import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: configService.getOrThrow<string>('app.jwt.secret'),
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
    role: string;
  }) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
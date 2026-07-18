import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: 'XEEO API',
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT ?? '3001', 10),

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '15m',
  },
}));
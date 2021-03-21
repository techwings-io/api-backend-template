import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { AuthzController } from './authz.controller';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule,
  ],
  controllers: [AuthzController],
  providers: [JwtStrategy, JwtService],
  exports: [PassportModule],
})
export class AuthModule {}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/todos-api/models/schemas/user.schema';
import { AuthServiceService } from 'src/todos-api/services/auth-service/auth-service.service';
import { JwtStrategy } from './auth-middlewares/strategies/jwt.strategy';
import { LocalStrategy } from './auth-middlewares/strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
            ConfigModule.forRoot(),
            PassportModule,
            JwtModule.register({
              secret: process.env.JWT_SECRET,
              signOptions: { expiresIn: '2m'}
            })
],
  providers: [AuthServiceService, LocalStrategy, JwtStrategy],
  exports: [AuthServiceService]
})
export class AuthModule {}

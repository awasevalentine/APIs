/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './todos-api/controllers/auth/auth.module';
import { TodosModule } from './todos-api/controllers/todos/todos.module';

@Module({
  imports: [

    /**Section for General Configuration */
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m'}
    }),
    /**End of General configuration section */

    /**Section for Todos app */
      AuthModule,
      TodosModule
    /**End of Todos app */
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

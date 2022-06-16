/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/models/dtos/user.dto';
import { AuthServiceService } from 'src/services/auth-service/auth-service.service';
import { LocalAuthGuard } from './auth-middlewares/guards/local.guard';

@Controller('api/auth')
export class AuthController {

    constructor(private _authService: AuthServiceService){}


    @Post('register')
    createUser(@Body() userData: UserDto, @Res() response: Response){
        this._authService.createUser(userData).then(
            (res)=>{
                response.send(res)
            }
        )
    }


    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req, @Res() response: Response): Promise<any>{
        return this._authService.signIn(req.user).then(
            (res)=>{
                response.send(res)
            }
        )
    }
}

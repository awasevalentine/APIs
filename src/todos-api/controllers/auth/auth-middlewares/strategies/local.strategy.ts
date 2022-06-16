/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { UserDocument } from "src/models/dtos/user.dto";
import { UserResponseData } from "src/models/interface/user.interface";
import { AuthServiceService } from "src/services/auth-service/auth-service.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private _authService: AuthServiceService){
        super({
            usernameField: 'email'
        })
    }


    async validate(email: string, password: string): Promise<UserDocument>{
        const foundUser = this._authService.validateUser(email, password);

        if(!foundUser){
            throw new UnauthorizedException('Invalid Credentials Entered')
        }
        else{
            return foundUser
        }
    }
}
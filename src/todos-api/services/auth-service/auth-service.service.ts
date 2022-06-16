/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserDto } from 'src/models/dtos/user.dto';

import * as bcrypt from 'bcrypt';
import { UserTokenDataResponse } from 'src/models/interface/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceService {

    constructor(@InjectModel('User') private userRepo: Model<UserDto>,
                private jwtService: JwtService
    ){}


    //Method for creating user
    async createUser(userData: UserDto): Promise<string> {
        const {name, email, password } = userData
        try {
            const foundUser = await this.userRepo.findOne({email: email}).exec()

            if(foundUser){
                throw new HttpException('User with the provided email already exist.', HttpStatus.CONFLICT)
            } else{
                const hashedPassword = await bcrypt.hash(password, 10)
                const newSchema = this.userRepo.create({
                    name, email, password: hashedPassword
                })

                if(newSchema){
                    return "User successfully created! "
                }

            }
        } catch (error) {
                return error
        }

    }

    //Encrypting the response data to be sent back to user using jwt

    async signIn(userData: UserDocument): Promise<any>{
        try {
            if(userData['status'] === 404){
                throw new HttpException(userData['response'], userData['status'])
            }
            const { name, email, _id } = userData
            const payload = { name, email, userId: _id }
    
            return {
                accessToken: this.jwtService.sign(payload)
            }
        } catch (error) {
            return error
        }

    }


    async validateUser(email: string, password: string): Promise<UserDocument>{
        try {
            const foundUser = await this.userRepo.findOne({email: email})

            if(!foundUser){
                throw new HttpException("No Found  User with th provided email", HttpStatus.NOT_FOUND) 
            }

            const validDetails = await bcrypt.compare(password, foundUser.password)

            if(validDetails){
                return foundUser
            }
        } catch (error) {
            return error
        }

    }
}

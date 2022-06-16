/* eslint-disable prettier/prettier */
import { Document } from "mongoose";


export class UserDto extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class UserDocument extends Document {
  readonly email: string;
  readonly password: string;
  readonly name: string
}
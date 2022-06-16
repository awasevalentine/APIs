/* eslint-disable prettier/prettier */


export interface UserResponseData {

    readonly name: string;
    readonly email: string;
    readonly _id: string
}

export interface UserTokenDataResponse {
    readonly name: string;
    readonly email: string;
    readonly userId: string;
}
import { APIResponse } from "../global.type";

export interface IUser {
  _id: string;
  name: string;
  lastName?: string;
  email: string;
  isAdmin: boolean;
}

export interface ISignUpResponse extends APIResponse {
  jwt: {
    token: string;
  };
  user: IUser;
}

export interface ILoginResponse extends APIResponse, ISignUpResponse {};

export interface IUserResponse extends IUser, APIResponse {};

export interface IErrorResponse {
  error: {
    message: string;
  }
}
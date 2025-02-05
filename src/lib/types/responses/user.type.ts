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

export interface IUserData extends IUser, APIResponse {};
export interface IUserResponse {
  data: IUserData;
};

export interface IErrorResponse {
  error: {
    message: string;
  }
}
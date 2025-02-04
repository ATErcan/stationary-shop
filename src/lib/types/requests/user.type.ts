export interface ISignUpRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUpdateProfileRequest {
  name: string;
  lastName: string;
}
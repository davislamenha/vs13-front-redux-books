export interface RegisterUserResponse {
  id: number;
  token: string;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

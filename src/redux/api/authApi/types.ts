export interface RegisterUserResponse {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUserResponse {
  token: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginFormInputs {
  userName: string;
  password: string;
}

export interface RegisterFormInputs {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface UserCredentials {
  id: string;
  fullName: string;
  userName: string;
  role: 'user' | 'moderator';
}

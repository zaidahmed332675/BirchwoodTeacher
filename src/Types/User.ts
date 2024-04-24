export interface User {
  _id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | null;
  phone: number | null;
  email: string;
  image: string;
  isAdmin: boolean;
  isMember: boolean;
  status: string;
  tokens: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  user: User;
  token: string;
}

export interface EmailVerificationPayload {
  email: string;
}

export interface EmailVerificationResponse {
  message: string;
  encodedEmail: string;
}

export interface OtpVerificationPayload {
  email: string;
  code: string;
}

export interface OtpVerificationResponse {
  message: string;
  encodedEmail: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirmPassword: string;
}

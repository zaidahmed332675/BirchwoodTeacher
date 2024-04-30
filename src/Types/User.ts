export interface User {
  _id: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  image: string;
  bio: string;
  checkIn: boolean;
  checkOut: boolean;
  status: string;
  education: any[];
  employment: any[];
  newAttendance: {
    status: string;
  };
  tokens: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
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

export interface UserCheckIn {
  newAttendance: any;
}

export interface UserCheckInPayload {
  checkIn: string;
}

export interface UserCheckInResponse {
  [index: string]: any;
}

export interface UserAttendance {
  [index: string]: any;
  attendance: Record<string, any>[];
  stats: {
    PRESENT: number;
    ABSENT: number;
    LEAVE: number;
    HOLIDAY: number;
  };
}

export interface UserAttendanceResponse extends UserAttendance {
  [index: string]: any;
}

export interface LeavePayload {
  leaveType: string;
  leaveReason: string;
  leaveFrom: string;
  leaveTo: string;
}

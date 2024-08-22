import { ClassRoom } from "./Class";

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
  classroom: ClassRoom;
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

export interface UpdateUserProfilePayload {
  city?: string;
  state?: string;
  address?: string;
  image?: string;
}

export interface UserCheckInOutResponse {
  teacher: Omit<User, 'newAttendance'>,
  checkIn: string | null,
  checkOut: string | null,
  leaveReason: string,
  sickDescription: string,
  status: string,
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

export interface Holiday {
  _id: string;
  name: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeavePayload {
  leaveType: string;
  leaveReason: string;
  leaveFrom: string;
  leaveTo: string;
}

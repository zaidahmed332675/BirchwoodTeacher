import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../../services/api';
import { allApiPaths, ApiPaths } from '../../services/apiPaths';
import {
  ChangePasswordPayload,
  EmailVerificationPayload,
  EmailVerificationResponse,
  Holiday,
  LoginUserPayload,
  LoginUserResponse,
  OtpVerificationPayload,
  OtpVerificationResponse,
  UpdateUserProfilePayload,
  User,
  UserAttendance,
  UserAttendanceResponse,
  UserCheckInOutResponse
} from '../../types/User';
import { setLoading } from '../slices/common.slice';
import {
  resetUserState,
  setHolidays,
  setUser,
  setUserAttendance,
  setUserState,
} from '../slices/user.slice';
import { asyncShowError, asyncShowSuccess } from './common.action';

export const asyncLogin = createAsyncThunk(
  'login',
  async (data: LoginUserPayload, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<LoginUserResponse, LoginUserPayload>({
      method: 'POST',
      path: allApiPaths.getPath('login'),
      body: data,
      axiosSecure: false,
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setUserState({
          user: res?.data?.user!,
          token: res?.data?.token!,
          attendance: {} as UserAttendance,
        })
      );
    }
    dispatch(setLoading(false));

    return res;
  }
);

export const asyncEmailVerification = createAsyncThunk(
  'emailVerification',
  async (data: EmailVerificationPayload, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<
      EmailVerificationResponse,
      EmailVerificationPayload
    >({
      method: 'POST',
      path: allApiPaths.getPath('emailVerification'),
      body: data,
      axiosSecure: false,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncOtpVerification = createAsyncThunk(
  'otpVerification',
  async (data: OtpVerificationPayload, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<OtpVerificationResponse, OtpVerificationPayload>({
      method: 'POST',
      path: allApiPaths.getPath('codeVerification'),
      body: data,
      axiosSecure: false,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncResetPassword = createAsyncThunk(
  'resetPassword',
  async (data: OtpVerificationPayload, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{}, OtpVerificationPayload>({
      method: 'POST',
      path: allApiPaths.getPath('resetPassword'),
      body: data,
      axiosSecure: false,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncChangePassword = createAsyncThunk(
  'changePassword',
  async (data: ChangePasswordPayload, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{}, ChangePasswordPayload>({
      method: 'POST',
      path: allApiPaths.getPath('changePassword'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetUserProfile = createAsyncThunk(
  'profile/get',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const res = await callApi<User>({
      path: allApiPaths.getPath('profile'),
    });
    // console.log('Async User Profile Res >>', res);
    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser(res.data!));
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUpdateProfile = createAsyncThunk(
  'updateProfile',
  async (data: UpdateUserProfilePayload, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<User, UpdateUserProfilePayload>({
      method: 'POST',
      path: allApiPaths.getPath('updateProfile'),
      isFormData: true,
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      if (res.data) {
        dispatch(setUser(res.data));
      }
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUpdateEducation = createAsyncThunk(
  'updateEducation',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{}, User>({
      method: 'POST',
      path: allApiPaths.getPath('updateEducation'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser({ education: res.data }));
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUpdateExperience = createAsyncThunk(
  'updateExperience',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{}, User>({
      method: 'POST',
      path: allApiPaths.getPath('updateExperience'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser({ employment: res.data }));
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncCheckInUser = createAsyncThunk(
  'checkIn',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{ newAttendance: UserCheckInOutResponse }, { checkIn: string }>({
      method: 'POST',
      path: allApiPaths.getPath('checkIn'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser({ newAttendance: res.data?.newAttendance }));
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncCheckOutUser = createAsyncThunk(
  'checkOut',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{ newAttendance: UserCheckInOutResponse }, { checkOut: string }>({
      method: 'POST',
      path: allApiPaths.getPath('checkOut'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser({ newAttendance: res.data?.newAttendance }));
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUserLeave = createAsyncThunk(
  'userLeave',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{}, User>({
      method: 'POST',
      path: allApiPaths.getPath('leave'),
      body: data,
    });

    // console.log(res, 'leave response')

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser({ newAttendance: { status: 'LEAVE' } }));
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUserMonthlyAttendance = createAsyncThunk(
  'monthlyAttendance',
  async ({ month, year }: any, { dispatch }) => {
    const res = await callApi<UserAttendanceResponse>({
      path: (allApiPaths.getPath('monthlyAttendance') +
        `?month=${month}&year=${year}`) as ApiPaths,
    });

    console.log(res, 'checking attendance response')

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUserAttendance(res.data ?? ({} as UserAttendanceResponse)));
    }
    return res;
  }
);

export const asyncGetAllHolidays = createAsyncThunk(
  'getAllHolidays',
  async (_, { dispatch }) => {
    const res = await callApi<{ holidays: Holiday[] }>({
      path: allApiPaths.getPath('getAllHolidays')
    });

    console.log(res, 'checking holiday response')

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setHolidays(res.data?.holidays!));
    }
    return res;
  }
);

export const asyncSignOut = createAsyncThunk(
  'signOut',
  async (_, { dispatch }) => {
    dispatch(resetUserState());
  }
);

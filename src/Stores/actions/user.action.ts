import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../../Service/api';
import { allApiPaths, ApiPaths } from '../../Service/apiPaths';
import {
  ChangePasswordPayload,
  EmailVerificationPayload,
  EmailVerificationResponse,
  Holiday,
  LoginUserPayload,
  LoginUserResponse,
  OtpVerificationPayload,
  OtpVerificationResponse,
  User,
  UserAttendance,
  UserAttendanceResponse,
  UserCheckInOutLeave,
  UserCheckInOutResponse,
  UserEducation,
  UserExperience
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
import { ClassRoom } from '../../Types/Class';

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
      if (res.data?.token) {
        let { todaysAttendance, user, token } = res.data ?? {}
        dispatch(
          setUserState({
            user: { ...user, todayAttendance: todaysAttendance },
            holidays: {},
            attendance: {} as UserAttendance,
            token,
          })
        );
      }
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

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      if (res.data?._id) {
        let { classroom, ...teacher } = res.data ?? {}
        dispatch(setUser({ ...teacher }));
      }
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUpdateProfile = createAsyncThunk(
  'updateProfile',
  async (data: FormData, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<User, FormData>({
      method: 'POST',
      path: allApiPaths.getPath('updateProfile'),
      isFormData: true,
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      if (res.data) {
        dispatch(setUser({ ...res.data, ...(res.data?.classroom && { classroom: { _id: res.data?.classroom as unknown as string } as ClassRoom }) }));
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

    const res = await callApi<User, UserEducation>({
      method: 'POST',
      path: allApiPaths.getPath('updateProfile'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser({ ...res.data, ...(res.data?.classroom && { classroom: { _id: res.data?.classroom as unknown as string } as ClassRoom }) }));
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

    const res = await callApi<User, UserExperience>({
      method: 'POST',
      path: allApiPaths.getPath('updateProfile'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser({ ...res.data, ...(res.data?.classroom && { classroom: { _id: res.data?.classroom as unknown as string } as ClassRoom }) }));
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
      if (res.data?.newAttendance) {
        let { teacher: { classroom, ...teacher }, ...todayAttendance } = res.data?.newAttendance ?? {}
        dispatch(setUser({ todayAttendance, ...teacher }));
        dispatch(asyncShowSuccess(res.message));
      }
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
      dispatch(setUser({ todayAttendance: res.data?.newAttendance }));
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

    const res = await callApi<{ todayAttendance: UserCheckInOutLeave }, User>({
      method: 'POST',
      path: allApiPaths.getPath('markLeave'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUser({ todayAttendance: res.data?.todayAttendance }));
      dispatch(asyncShowSuccess(res.message));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUserMonthlyAttendance = createAsyncThunk(
  'monthlyAttendance',
  async ({ month, year }: any, { dispatch }) => {

    // dispatch(setLoading(true));

    const res = await callApi<UserAttendanceResponse>({
      path: (allApiPaths.getPath('monthlyAttendance') +
        `?month=${month}&year=${year}`) as ApiPaths,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setUserAttendance({ ...res.data!, month, year }));
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetAllHolidays = createAsyncThunk(
  'getAllHolidays',
  async (_, { dispatch }) => {

    // dispatch(setLoading(true));

    const res = await callApi<{ holidays: Holiday[] }>({
      path: allApiPaths.getPath('getAllHolidays')
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setHolidays(res.data?.holidays!));
    }

    // dispatch(setLoading(false));
    return res;
  }
);

export const asyncSignOut = createAsyncThunk(
  'signOut',
  async (_, { dispatch }) => {
    dispatch(resetUserState());
  }
);

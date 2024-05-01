import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../../services/api';
import { allApiPaths, ApiPaths } from '../../services/apiPaths';
import {
  ChangePasswordPayload,
  EmailVerificationPayload,
  EmailVerificationResponse,
  LoginUserPayload,
  LoginUserResponse,
  OtpVerificationPayload,
  OtpVerificationResponse,
  User,
  UserAttendance,
  UserAttendanceResponse,
  UserCheckInPayload,
  UserCheckInResponse,
} from '../../types/User';
import { setLoading } from '../slices/common.slice';
import {
  resetUserState,
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
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
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
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
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
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
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
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
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
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
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
    console.log('Async User Profile Res >>', res);
    if (!res.status) {
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUser(res.data!));
    }

    dispatch(setLoading(false));
    return res;
  }
);

// export const asyncUpdateProfile = createAsyncThunk(
//   'updateProfile',
//   async (data: any, { dispatch }) => {
//     dispatch(setLoading(true));

//     const res = await callApi<{}, User>({
//       method: 'POST',
//       path: allApiPaths.getPath('updateProfile'),
//       isFormData: true,
//       body: data,
//     });

//     if (!res?.status) {
//       dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
//     } else {
//       dispatch(setUser(res.data));
//       dispatch(asyncShowSuccess(res.message ?? 'Success'));
//     }
//     dispatch(setLoading(false));
//     return res;
//   }
// );

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
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUser({ education: res.data }));
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
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
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUser({ employment: res.data }));
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncCheckInUser = createAsyncThunk(
  'checkIn',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<UserCheckInResponse, UserCheckInPayload>({
      method: 'POST',
      path: allApiPaths.getPath('checkIn'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUser({ newAttendance: res?.data?.newAttendance }));
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
    }
    dispatch(setLoading(false));
    return res;
  }
);

// export const asyncCheckOutUser = createAsyncThunk(
//   'checkOut',
//   async (data: any, { dispatch }) => {
//     dispatch(setLoading(true));

//     const res = await callApi<{}, User>({
//       method: 'POST',
//       path: allApiPaths.getPath('checkOut'),
//       body: data,
//     });

//     if (!res?.status) {
//       dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
//     } else {
//       dispatch(setUser(res.data));
//       dispatch(asyncShowSuccess(res.message ?? 'Success'));
//     }
//     dispatch(setLoading(false));
//     return res;
//   }
// );

export const asyncUserLeave = createAsyncThunk(
  'userLeave',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{}, User>({
      method: 'POST',
      path: allApiPaths.getPath('leave'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUser({ newAttendance: { status: 'LEAVE' } }));
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUserMonthlyAttendance = createAsyncThunk(
  'monthlyAttendance',
  async ({ month, year }: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<UserAttendanceResponse>({
      path: (allApiPaths.getPath('monthlyAttendance') +
        `?month=${month}&year=${year}`) as ApiPaths,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUserAttendance(res.data ?? ({} as UserAttendanceResponse)));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncSignOut = createAsyncThunk(
  'signOut',
  async (_, { dispatch }) => {
    dispatch(resetUserState());
  }
);

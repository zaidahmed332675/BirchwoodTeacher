import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../../services/api';
import { allApiPaths } from '../../services/apiPaths';
import {
  EmailVerificationResponse,
  LoginUserResponse,
  OtpVerificationResponse,
  User,
  EmailVerificationPayload,
  LoginUserPayload,
  OtpVerificationPayload,
  ChangePasswordPayload,
} from '../../types/User';
import { setLoading } from '../slices/common.slice';
import { resetUserState, setUser, setUserState } from '../slices/user.slice';
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
      dispatch(setUserState({ user: res.data?.user, token: res.data?.token }));
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

    if (!res?.encodedEmail) {
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

export const asyncUpdateProfile = createAsyncThunk(
  'updateProfile',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{}, User>({
      method: 'POST',
      path: allApiPaths.getPath('updateProfile'),
      isFormData: true,
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUser(res.data));
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

    const res = await callApi<{}, User>({
      method: 'POST',
      path: allApiPaths.getPath('checkIn'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUser(res.data));
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncCheckOutUser = createAsyncThunk(
  'checkOut',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{}, User>({
      method: 'POST',
      path: allApiPaths.getPath('checkOut'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message ?? 'Something Went Wrong!'));
    } else {
      dispatch(setUser(res.data));
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUserLeave = createAsyncThunk(
  'checkOut',
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
      dispatch(setUser(res.data));
      dispatch(asyncShowSuccess(res.message ?? 'Success'));
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

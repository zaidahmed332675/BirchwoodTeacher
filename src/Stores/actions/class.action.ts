import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChildAttendance, ChildCheckInOutPayload, ChildCheckInOutResponse, ClassResponse, ClassRoom, CreateChatPayload, CreateChatResponse, CreateChatRoomMessagePayload, CreateChatRoomMessageResponse, MessagesResponse } from '../../Types/Class';
import { callApi } from '../../services/api';
import { allApiPaths, ApiPaths } from '../../services/apiPaths';
import { setAttendances, setChatRoomMessage, setChatRoomMessages, setChild, setChildren, setClassRoom } from '../slices/class.slice';
import { setLoading } from '../slices/common.slice';
import { asyncShowError, asyncShowSuccess } from './common.action';
import { RootState } from '..';

export const asyncGetClassRoomById = createAsyncThunk(
  'getClassRoomById',
  async (_, { dispatch, getState }) => {
    dispatch(setLoading(true));

    const classRoomId: string = (getState() as RootState).user.user?.classroom?._id

    const res = await callApi<{ classroom: ClassRoom }>({
      path: allApiPaths.getPath('getClassRoomById', {
        classRoomId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setClassRoom(res.data?.classroom!)
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetChildrenByClassId = createAsyncThunk(
  'getChildrenByClassId',
  async (_, { dispatch, getState }) => {
    dispatch(setLoading(true));

    const classRoomId: string = (getState() as RootState).user.user?.classroom?._id

    const res = await callApi<ClassResponse>({
      path: allApiPaths.getPath('getChildrenByClassId', {
        classRoomId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setChildren(res.data!)
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncCheckInChildByTeacher = createAsyncThunk(
  'checkInChildByTeacher',
  async (data: any, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{ newAttendance: ChildCheckInOutResponse }, ChildCheckInOutPayload>({
      method: 'POST',
      path: allApiPaths.getPath('checkInChildByTeacher'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      if (res.data?.newAttendance?.children) {
        dispatch(setChild({ _id: res.data.newAttendance.children, todayAttendance: res.data.newAttendance }));
      }
      dispatch(asyncShowSuccess(res.message));
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncChildMonthlyAttendance = createAsyncThunk(
  'childMonthlyAttendance',
  async ({ childId, month, year }: any, { dispatch }) => {
    const res = await callApi<ChildAttendance>({
      path: (allApiPaths.getPath('childMonthlyAttendance', { childId }) +
        `?month=${month}&year=${year}`) as ApiPaths,
    });

    // console.log(res.data)

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setAttendances({ _id: childId, ...res.data! }));
    }
    return res;
  }
);

export const asyncCreateChat = createAsyncThunk(
  'createChat',
  async (data: CreateChatPayload, { dispatch }) => {
    const res = await callApi<CreateChatResponse, CreateChatPayload>({
      method: 'POST',
      path: allApiPaths.getPath('createChat'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      // When trying to create again it does not have chat property with message 'Already Exists'
      if (res.data?._id) {
        dispatch(setChild({ _id: data.children, chatRoomId: res.data._id }));
      }
      if (res.data?.chat?._id) {
        dispatch(setChild({ _id: data.children, chatRoomId: res.data.chat._id }));
      }
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncCreateChatRoomMessage = createAsyncThunk(
  'createChatRoomMessage',
  async (data: CreateChatRoomMessagePayload, { dispatch }) => {
    const res = await callApi<CreateChatRoomMessageResponse, CreateChatRoomMessagePayload>({
      method: 'POST',
      path: allApiPaths.getPath('createChatRoomMessage'),
      body: data,
    });

    console.log(data, 'checking data')

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      if (res.data?.message?._id) {
        dispatch(setChatRoomMessage({ chatRoomId: res.data.message.chat, message: res.data.message }));
      }
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetMessagesByChatRoomId = createAsyncThunk(
  'getMessagesByChatRoomId',
  async ({ chatRoomId }: { chatRoomId: string }, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<MessagesResponse>({
      path: allApiPaths.getPath('getMessagesByChatRoomId', {
        chatRoomId
      }),
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      if (res.data?.docs?.length) {
        dispatch(setChatRoomMessages({ chatRoomId, ...res.data }));
      }
      dispatch(asyncShowSuccess(res.message));
    }

    dispatch(setLoading(false));
    return res;
  }
);
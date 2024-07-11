import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChildAttendance, ChildCheckInOutPayload, ChildCheckInOutResponse, ClassResponse, ClassRoom, CreateChatPayload, CreateChatResponse, CreateChatRoomMessagePayload, CreateChatRoomMessageResponse, MessagesResponse } from '../../Types/Class';
import { callApi } from '../../services/api';
import { allApiPaths, ApiPaths } from '../../services/apiPaths';
import { setAttendances, setChatRoom, setChatRoomMessage, setChild, setChildren, setClassRoom } from '../slices/class.slice';
import { setLoading } from '../slices/common.slice';
import { asyncShowError, asyncShowSuccess } from './common.action';

export const asyncGetClassRoomById = createAsyncThunk(
  'getClassRoomById',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{ classroom: ClassRoom }>({
      path: allApiPaths.getPath('getClassRoomById', {
        classRoomId: "6630e5f01364cb7fd294281c"
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
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<ClassResponse>({
      path: allApiPaths.getPath('getChildrenByClassId', {
        classRoomId: "6630e5f01364cb7fd294281c"
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
        dispatch(setChild({ _id: res.data.newAttendance.children, newAttendance: res.data.newAttendance }));
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

    console.log(res.data)

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
  async ({ childId, data }: { childId: string, data: CreateChatPayload }, { dispatch }) => {
    const res = await callApi<CreateChatResponse, CreateChatPayload>({
      method: 'POST',
      path: allApiPaths.getPath('createChat'),
      body: data,
    });

    if (!res?.status) {
      dispatch(asyncShowError(res.message));
    } else {
      if (res.data?._id) {
        dispatch(setChild({ _id: childId, chatRoomId: res.data._id }));
      }
      if (res.data?.chat?._id) {
        dispatch(setChild({ _id: childId, chatRoomId: res.data.chat._id }));
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
      path: allApiPaths.getPath('createChat'),
      body: data,
    });

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
        dispatch(setChatRoom({ chatRoomId, ...res.data }));
      }
      dispatch(asyncShowSuccess(res.message));
    }

    dispatch(setLoading(false));
    return res;
  }
);
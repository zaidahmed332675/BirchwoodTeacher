import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateTimeTableRecordPayload, CreatTimeTableResonse, TimeTable } from '../../Types/TimeTable';
import { callApi } from '../../services/api';
import { allApiPaths } from '../../services/apiPaths';
import { setLoading } from '../slices/common.slice';
import { removeTimeTableRecord, setTimeTable, setTimeTableRecord } from '../slices/timeTable.slice';
import { asyncShowError, asyncShowSuccess } from './common.action';

export const asyncGetAllClassTimeTable = createAsyncThunk(
  'getAllClassTimeTable',
  async ({ classId }: { classId: string }, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<TimeTable>({
      path: allApiPaths.getPath('getAllClassTimeTable', {
        classId
      }),
    });

    console.log(res, 'respons is here')
    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setTimeTable(res.data!)
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncCreateTimeTableRecord = createAsyncThunk(
  'createTimeTable',
  async (data: CreateTimeTableRecordPayload, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<CreatTimeTableResonse, CreateTimeTableRecordPayload>({
      method: "POST",
      path: allApiPaths.getPath('createTimeTable'),
      body: data
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setTimeTableRecord(res.data?.newTimetable!))
      dispatch(asyncShowSuccess(res.message))
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUpdateTimeTableRecord = createAsyncThunk(
  'updateTimeTableRecord',
  async (data: CreateTimeTableRecordPayload, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<CreatTimeTableResonse, CreateTimeTableRecordPayload>({
      method: "POST",
      path: allApiPaths.getPath('updateTimeTableRecord'),
      body: data
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setTimeTableRecord(res.data?.newTimetable!))
      dispatch(asyncShowSuccess(res.message))
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncDeleteTimeTableRecord = createAsyncThunk(
  'deleteTimeTableRecord',
  async ({ timeTableRecordId, day }: { timeTableRecordId: string, day: string }, { dispatch }) => {
    dispatch(setLoading(true));
    const res = await callApi({
      path: allApiPaths.getPath('deleteTimeTableRecord', {
        timeTableRecordId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(removeTimeTableRecord({ _id: timeTableRecordId, day }))
      dispatch(asyncShowSuccess(res.message))
    }

    dispatch(setLoading(false));
    return res;
  }
);
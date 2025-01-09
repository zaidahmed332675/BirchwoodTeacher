import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { Holiday, User, UserAttendance } from '../../types/User';
import { RootState } from '../index';

interface UserSliceState {
  user: User;
  attendance: Record<string, UserAttendance>;
  holidays: Record<string, Holiday>;
  token: string | null;
}

const initialState: UserSliceState = {
  user: {} as User,
  attendance: {} as UserAttendance,
  holidays: {},
  token: null,
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserState: (_, { payload }: PayloadAction<UserSliceState>) => payload,
    setUser: (
      state,
      { payload }: PayloadAction<Partial<User>>
    ) => {
      state.user = { ...state.user, ...payload };
    },
    setUserAttendance: (state, { payload }: PayloadAction<UserAttendance & { month: string, year: string }>) => {
      const { year, month, attendance, stats } = payload
      const date = `${year}-${month}`
      state.attendance[date] = { attendance, stats };
    },
    setHolidays: (state, { payload }: PayloadAction<Holiday[]>) => {
      state.holidays = {}
      payload.forEach(holiday => {
        const date = format(holiday.date, 'yyyy-MM');
        if (!state.holidays?.[date]) {
          state.holidays[date] = {} as Holiday
        }
        state.holidays[date] = {
          ...state.holidays[date],
          ...holiday
        };
      });
    },
    resetUserState: _ => initialState,
  },
});

export const { setUserState, setUser, setUserAttendance, setHolidays, resetUserState } =
  UserSlice.actions;

export default UserSlice.reducer;

export const selectUserToken = createDraftSafeSelector(
  [(state: RootState) => state.user],
  state => state.token
);

export const selectUserProfile = createDraftSafeSelector(
  [(state: RootState) => state.user],
  state => state.user
);

export const selectUserAttendance = (monthWithYear: string) =>
  createDraftSafeSelector(
    [(state: RootState) => state.user.attendance],
    attendance => attendance?.[monthWithYear]
  );

export const selectHolidaysMonthWise = (monthWithYear: string) =>
  createDraftSafeSelector(
    [(state: RootState) => state.user.holidays],
    holidays => Object.values(holidays?.[monthWithYear] || {}) as Holiday[]
  );

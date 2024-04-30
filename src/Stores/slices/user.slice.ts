import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { User, UserAttendance, UserCheckIn } from '../../types/User';
import { RootState } from '../index';

interface UserSliceState {
  user: User;
  attendance: UserAttendance;
  token: string | null;
}

const initialState: UserSliceState = {
  user: {} as User,
  attendance: {} as UserAttendance,
  token: null,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserState: (_, { payload }: PayloadAction<UserSliceState>) => payload,
    setUser: (
      state,
      { payload }: PayloadAction<Partial<User | UserCheckIn>>
    ) => {
      state.user = { ...state.user, ...payload };
    },
    setUserAttendance: (state, { payload }: PayloadAction<UserAttendance>) => {
      state.attendance = payload;
    },
    resetUserState: _ => initialState,
  },
});

export const { setUserState, setUser, setUserAttendance, resetUserState } =
  userSlice.actions;

export default userSlice.reducer;

export const selectUserToken = createDraftSafeSelector(
  [(state: RootState) => state.user],
  state => state.token
);

export const selectUserProfile = createDraftSafeSelector(
  [(state: RootState) => state.user],
  state => state.user
);

export const selectUserAttendance = createDraftSafeSelector(
  [(state: RootState) => state.user],
  state => state.attendance
);

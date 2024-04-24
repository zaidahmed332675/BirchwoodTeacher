import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../index';

interface UserSliceState {
  user: Partial<User>;
  token: string | null;
}

const initialState: UserSliceState = {
  user: {},
  token: null,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserState: (
      state,
      { payload }: PayloadAction<Partial<UserSliceState>>
    ) => ({ ...state, ...payload }),
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    resetUserState: _ => ({ ...initialState }),
  },
});

export const { setUserState, setUser, resetUserState } = userSlice.actions;

export default userSlice.reducer;

export const selectUserState = createDraftSafeSelector(
  [(state: RootState) => state.user],
  state => state
);

export const selectUserProfile = createDraftSafeSelector(
  [selectUserState],
  state => state.user
);

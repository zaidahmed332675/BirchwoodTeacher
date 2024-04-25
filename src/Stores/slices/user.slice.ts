import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../index';

interface UserSliceState {
  user: User;
  token: string | null;
}

const initialState: UserSliceState = {
  user: {} as User,
  token: null,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserState: (_, { payload }: PayloadAction<UserSliceState>) => payload,
    setUser: (state, { payload }: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...payload };
    },
    resetUserState: _ => ({ ...initialState }),
  },
});

export const { setUserState, setUser, resetUserState } = userSlice.actions;

export default userSlice.reducer;

export const selectUserToken = createDraftSafeSelector(
  [(state: RootState) => state.user],
  state => state.token
);

export const selectUserProfile = createDraftSafeSelector(
  [(state: RootState) => state.user],
  state => state.user
);

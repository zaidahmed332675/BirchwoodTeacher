import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState = {
  error: null,
  success: null,
  loading: false,
  data: null,
};

export const commonSlice = createSlice({
  name: 'Common',
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setSuccess: (state, { payload }) => {
      state.success = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setError, setLoading, setSuccess } = commonSlice.actions;
export default commonSlice.reducer;

export const selectAppLoader = createDraftSafeSelector(
  [(state: RootState) => state.common],
  state => state.loading
);

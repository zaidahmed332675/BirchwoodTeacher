import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { PaginationProps } from '../../Types/Common';
import { Activity, GetActivities, GetAllClassPosts, Post } from '../../Types/Post';

interface PostSliceState {
  activities: Record<string, Activity>;
  posts: Record<string, Post>;
  pagination: PaginationProps,
}

const initialState: PostSliceState = {
  activities: {},
  posts: {},
  pagination: {
    totalDocs: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  },
};

const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<GetAllClassPosts>) => {
      const { docs, ...pagination } = payload;
      state.posts = docs.reduce((acc, curr) => {
        acc["post_" + curr._id] = curr;
        return acc;
      }, {} as Record<string, Post>);
      state.pagination = pagination;
    },
    setPost: (state, { payload }: PayloadAction<Partial<Post>>) => {
      state.posts["post_" + payload._id] = { ...state.posts["post_" + payload._id], ...payload };
    },
    setActivities: (state, { payload }: PayloadAction<GetActivities>) => {
      const { docs, ...pagination } = payload;
      state.activities = docs.reduce((acc, curr) => {
        acc["activity_" + curr._id] = curr;
        return acc;
      }, {} as Record<string, Activity>);
      state.pagination = pagination;
    },
    setActivity: (state, { payload }: PayloadAction<Partial<Activity>>) => {
      state.activities["activity_" + payload._id] = { ...state.activities["activity_" + payload._id], ...payload };
    },
    removeActivity: (state, { payload }: PayloadAction<Partial<Activity>>) => {
      delete state.activities["activity_" + payload._id]
    },
    resetPostState: _ => initialState,
  },
});

export const { setPosts, setActivities, setActivity, removeActivity, resetPostState } =
  PostSlice.actions;

export default PostSlice.reducer;

export const selectPosts = createDraftSafeSelector(
  [(state: RootState) => state.post],
  state => Object.values(state.posts ?? {}) as Post[]
);

export const selectActivities = createDraftSafeSelector(
  [(state: RootState) => state.post],
  state => Object.values(state.activities ?? {}) as Activity[]
);

// export const selectChildById = (childId: string) =>
//   createDraftSafeSelector(
//     [(state: RootState) => state.class.children],
//     children => children["child_" + childId] as Child
//   );

// export const selectChatRoomMessages = (chatRoomId: string) =>
//   createDraftSafeSelector(
//     [(state: RootState) => state.class.chatRooms],
//     chatRooms => Object.values(chatRooms?.["chatRoom_" + chatRoomId]?.messages || {})
//   );
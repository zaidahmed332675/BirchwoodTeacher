import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { PaginationProps } from '../../Types/Common';
import { Activity, Comment, GetActivities, GetAllClassPosts, Post } from '../../Types/Post';

interface PostSliceState {
  activities: Record<string, Activity>;
  posts: Record<string, Post>;
  // comments: Record<string, {}>
  postsComments: Record<string, {
    comments: Record<string, Comment>,
    commentsPagination: any
  }>;
  pagination: PaginationProps,
}

const initialState: PostSliceState = {
  activities: {},
  posts: {},
  postsComments: {},
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
      state.posts = {
        ["post_" + payload._id]: { ...state.posts["post_" + payload._id], ...payload },
        ...state.posts
      }
    },
    removePost: (state, { payload }: PayloadAction<{ _id: string }>) => {
      delete state.posts["post_" + payload._id];
    },
    setComments: (state, { payload }: PayloadAction<{ docs: Comment[] } & { postId: string }>) => {
      const { docs, postId } = payload;
      state.postsComments["post_" + postId] = state.postsComments["post_" + postId] || { comments: {}, commentPagination: {} };
      docs.forEach((comment) => {
        state.postsComments["post_" + postId].comments[`comment_${comment._id}`] = comment;
      });
    },
    setComment: (state, { payload }: PayloadAction<{ postId: string, comment: Comment }>) => {
      const { postId, comment } = payload;
      state.postsComments["post_" + postId].comments[`comment_${comment._id}`] = comment;
    },
    setLike: (state, { payload }: PayloadAction<{ _id: string, userId: string }>) => {
      state.posts["post_" + payload._id].likes.push(payload.userId)
    },
    setLove: (state, { payload }: PayloadAction<{ _id: string, userId: string }>) => {
      state.posts["post_" + payload._id].loves.push(payload.userId)
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

export const { setPosts, setPost, removePost, setLike, setLove, setComments, setComment, setActivities, setActivity, removeActivity, resetPostState } =
  PostSlice.actions;

export default PostSlice.reducer;

export const selectPosts = createDraftSafeSelector(
  [(state: RootState) => state.post],
  state => Object.values(state.posts ?? {}) as Post[]
);

export const selectPostById = (postId: string) =>
  createDraftSafeSelector(
    [(state: RootState) => state.post],
    state => state.posts[`post_${postId}`]
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

export const selectPostComments = (postId: string) =>
  createDraftSafeSelector(
    [(state: RootState) => state.post.postsComments],
    postsComments => Object.values(postsComments?.["post_" + postId]?.comments || {})
  );
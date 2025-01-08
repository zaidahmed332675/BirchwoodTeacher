import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { PaginationProps } from '../../Types/Common';
import { Activity, Comment, GetActivities, GetAllClassPosts, GetAllPostComments, Post } from '../../Types/Post';

interface PostSliceState {
  activities: Record<string, Activity>;
  activitiesPagination: PaginationProps;

  posts: Record<string, Post>;
  pagination: PaginationProps,

  comments: Record<string, Comment>;
  commentsPagination: PaginationProps;
}

const pagination = {
  totalDocs: 0,
  limit: 0,
  page: 0,
  totalPages: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null
}

const initialState: PostSliceState = {
  activities: {},
  activitiesPagination: { ...pagination },

  posts: {},
  pagination: { ...pagination },

  comments: {},
  commentsPagination: { ...pagination }
};

const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<GetAllClassPosts & { isFresh: boolean }>) => {
      const { docs, isFresh, ...pagination } = payload;
      state.posts = {
        ...(isFresh ? {} : state.posts),
        ...docs.reduce((acc, curr) => {
          acc["post_" + curr._id] = curr;
          return acc;
        }, {} as Record<string, Post>)
      };
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
    setComments: (state, { payload }: PayloadAction<GetAllPostComments & { isFresh: boolean }>) => {
      const { docs, isFresh, ...pagination } = payload;
      state.comments = {
        ...(isFresh ? {} : state.comments),
        ...docs.reduce((acc, curr) => {
          acc["comment_" + curr._id] = curr;
          return acc;
        }, {} as Record<string, Comment>)
      };
      state.commentsPagination = pagination;
    },
    setComment: (state, { payload }: PayloadAction<Comment>) => {
      state.comments = {
        ["comment_" + payload._id]: { ...state.comments["comment_" + payload._id], ...payload },
        ...state.comments
      }
    },
    setLikeDislike: (state, { payload }: PayloadAction<{ _id: string, userId: string }>) => {
      const postKey = "post_" + payload._id;
      const post = state.posts[postKey];

      if (post) {
        const likeIndex = post.likes.indexOf(payload.userId);
        if (likeIndex === -1) {
          // User has not liked the post, so add the userId
          post.likes.push(payload.userId);
        } else {
          // User has already liked the post, so remove the userId
          post.likes.splice(likeIndex, 1);
        }
      }
    },
    setLoveUnlove: (state, { payload }: PayloadAction<{ _id: string, userId: string }>) => {
      const postKey = "post_" + payload._id;
      const post = state.posts[postKey];

      if (post) {
        const likeIndex = post.loves.indexOf(payload.userId);
        if (likeIndex === -1) {
          // User has not liked the post, so add the userId
          post.loves.push(payload.userId);
        } else {
          // User has already liked the post, so remove the userId
          post.loves.splice(likeIndex, 1);
        }
      }
    },
    setActivities: (state, { payload }: PayloadAction<GetActivities & { isFresh: boolean }>) => {
      const { docs, isFresh, ...pagination } = payload;
      state.activities = {
        ...(isFresh ? {} : state.activities),
        ...docs.reduce((acc, curr) => {
          acc["activity_" + curr._id] = curr;
          return acc;
        }, {} as Record<string, Activity>)
      };
      state.activitiesPagination = pagination;
    },
    setActivity: (state, { payload }: PayloadAction<Partial<Activity>>) => {
      state.activities["activity_" + payload._id] = { ...state.activities["activity_" + payload._id], ...payload };
    },
    removeActivity: (state, { payload }: PayloadAction<Partial<Activity>>) => {
      delete state.activities["activity_" + payload._id]
    },
    resetCommentsAndPaginationState: (state) => {
      state.comments = {};
      state.commentsPagination = {} as PaginationProps;
    },
    resetPostState: _ => initialState,
  },
});

export const { setPosts, setPost, removePost, setLikeDislike, setLoveUnlove, setComments, setComment, setActivities, setActivity, removeActivity, resetCommentsAndPaginationState, resetPostState } =
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

export const selectPostComments = createDraftSafeSelector(
  [(state: RootState) => state.post],
  state => Object.values(state.comments || {}) as Comment[]
);
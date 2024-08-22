import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, GetActivities, GetAllClassPosts, GetAllPostComments, Post } from '../../Types/Post';
import { callApi } from '../../services/api';
import { allApiPaths } from '../../services/apiPaths';
import { setLoading } from '../slices/common.slice';
import { removePost, setActivities, setComment, setComments, setLike, setLove, setPost, setPosts } from '../slices/post.slice';
import { asyncShowError, asyncShowSuccess } from './common.action';
import { RootState } from '..';

export const asyncGetAllActivities = createAsyncThunk(
  'getAllActivities',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<GetActivities>({
      path: allApiPaths.getPath('getActivities'),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setActivities(res.data!)
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetAllPosts = createAsyncThunk(
  'getAllPosts',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<GetAllClassPosts>({
      path: allApiPaths.getPath('getAllPosts'),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setPosts(res.data!)
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetAllClassPosts = createAsyncThunk(
  'getAllClassPosts',
  async (_, { dispatch, getState }) => {
    dispatch(setLoading(true));

    const classRoomId: string = (getState() as RootState).user.user?.classroom?._id

    const res = await callApi<GetAllClassPosts>({
      path: allApiPaths.getPath('getAllClassPosts', {
        classRoomId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setPosts(res.data!)
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetAllChildPosts = createAsyncThunk(
  'getAllChildPosts',
  async ({ childId }: { childId: string }, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<GetAllClassPosts>({
      path: allApiPaths.getPath('getAllChildPosts', {
        childId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setPosts(res.data!)
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncCreatePost = createAsyncThunk(
  'createPost',
  async (data: FormData, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{ newPost: Post }, FormData>({
      method: "POST",
      path: allApiPaths.getPath('createPost'),
      isFormData: true,
      body: data
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setPost(res.data?.newPost!))
      dispatch(asyncShowSuccess(res.message))
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncUpdatePost = createAsyncThunk(
  'createPost',
  async ({ postId, data }: { postId: string, data: FormData }, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<Post, FormData>({
      method: "POST",
      path: allApiPaths.getPath('updatePost', { postId }),
      isFormData: true,
      body: data
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setPost(res.data!))
      dispatch(asyncShowSuccess(res.message))
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncDeletePost = createAsyncThunk(
  'deletePost',
  async ({ postId }: { postId: string }, { dispatch }) => {
    dispatch(setLoading(true));
    const res = await callApi({
      path: allApiPaths.getPath('deletePost', {
        postId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(removePost({ _id: postId }))
      dispatch(asyncShowSuccess(res.message))
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncLikePost = createAsyncThunk(
  'likePost',
  async ({ postId }: { postId: string }, { getState, dispatch }) => {
    const userId = (getState() as RootState).user.user?._id
    const res = await callApi({
      path: allApiPaths.getPath('likePost', {
        postId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setLike({ _id: postId, userId }))
      dispatch(asyncShowSuccess(res.message))
    }
    return res;
  }
);

export const asyncLovePost = createAsyncThunk(
  'lovePost',
  async ({ postId }: { postId: string }, { getState, dispatch }) => {
    const userId = (getState() as RootState).user.user?._id
    const res = await callApi({
      path: allApiPaths.getPath('lovePost', {
        postId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setLove({ _id: postId, userId }))
      dispatch(asyncShowSuccess(res.message))
    }
    return res;
  }
);

export const asyncGetCommentsByPostId = createAsyncThunk(
  'getCommentsByPostId',
  async ({ postId }: { postId: string }, { dispatch }) => {
    const res = await callApi<GetAllPostComments>({
      path: allApiPaths.getPath('getAllPostComments', {
        postId
      }),
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setComments({ postId, ...res.data! })
      );
    }

    return res;
  }
);

export const asyncCreatePostComment = createAsyncThunk(
  'createPostComment',
  async (data: { postId: string, comment: { content: string } }, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{ newComment: Comment }, { content: string }>({
      method: "POST",
      path: allApiPaths.getPath('createPostComment', {
        postId: data.postId
      }),
      body: { ...data.comment }
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setComment({
        postId: data.postId,
        comment: res.data?.newComment!
      }))
      dispatch(asyncShowSuccess(res.message));
    }

    dispatch(setLoading(false));
    return res;
  }
);

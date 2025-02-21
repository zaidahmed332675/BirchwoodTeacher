import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Comment, GetActivities, GetAllClassPosts, GetAllPostComments, Post } from '../../Types/Post';
import { callApi } from '../../Service/api';
import { allApiPaths, ApiPaths } from '../../Service/apiPaths';
import { setLoading } from '../slices/common.slice';
import { removePost, setActivities, setComment, setComments, setLikeDislike, setLoveUnlove, setPost, setPosts } from '../slices/post.slice';
import { asyncShowError, asyncShowSuccess } from './common.action';

export const asyncGetAllActivities = createAsyncThunk(
  'getAllActivities',
  async ({ isFresh }: { isFresh: boolean }, { dispatch, getState }) => {

    let { page, totalPages } = { ...(getState() as RootState).post?.activitiesPagination }
    page = isFresh ? 0 : page

    if (page >= totalPages && totalPages) {
      return {
        status: true,
        message: 'You\'ve reached the end of the list'
      }
    }

    if (!page) {
      dispatch(setLoading(true));
    }

    const res = await callApi<GetActivities>({
      path: (allApiPaths.getPath('getActivities') +
        `?limit=${10}&page=${(page ?? 0) + 1}`) as ApiPaths,
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setActivities({ ...res.data!, isFresh })
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetAllPosts = createAsyncThunk(
  'getAllPosts',
  async ({ isFresh }: { isFresh: boolean }, { getState, dispatch }) => {
    let { page, totalPages } = { ...(getState() as RootState).post?.pagination }
    page = isFresh ? 0 : page

    if (page >= totalPages && totalPages) {
      return {
        status: true,
        message: 'You\'ve reached the end of the list'
      }
    }

    if (!page) {
      dispatch(setLoading(true));
    }

    const res = await callApi<GetAllClassPosts>({
      path: (allApiPaths.getPath('getAllPosts') +
        `?limit=${10}&page=${(page ?? 0) + 1}`) as ApiPaths,
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setPosts({ ...res.data!, isFresh })
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetAllClassPosts = createAsyncThunk(
  'getAllClassPosts',
  async ({ isFresh }: { isFresh: boolean }, { dispatch, getState }) => {

    const classRoomId = (getState() as RootState).user.user?.classroom?._id

    let { page, totalPages } = { ...(getState() as RootState).post?.pagination }
    page = isFresh ? 0 : page

    if (page >= totalPages && totalPages) {
      return {
        status: true,
        message: 'You\'ve reached the end of the list'
      }
    }

    if (!page) {
      dispatch(setLoading(true));
    }

    const res = await callApi<GetAllClassPosts>({
      path: (allApiPaths.getPath('getAllClassPosts', { classRoomId }) +
        `?limit=${10}&page=${(page ?? 0) + 1}`) as ApiPaths,
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setPosts({ ...res.data!, isFresh })
      );
    }

    dispatch(setLoading(false));
    return res;
  }
);

export const asyncGetAllChildPosts = createAsyncThunk(
  'getAllChildPosts',
  async ({ childId, isFresh }: { childId: string, isFresh: boolean }, { dispatch, getState }) => {

    let { page, totalPages } = { ...(getState() as RootState).post?.pagination }
    page = isFresh ? 0 : page

    if (page >= totalPages && totalPages) {
      return {
        status: true,
        message: 'You\'ve reached the end of the list'
      }
    }

    if (!page) {
      dispatch(setLoading(true));
    }

    const res = await callApi<GetAllClassPosts>({
      path: (allApiPaths.getPath('getAllChildPosts', { childId }) +
        `?limit=${10}&page=${(page ?? 0) + 1}`) as ApiPaths,
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setPosts({ ...res.data!, isFresh })
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
      dispatch(setLikeDislike({ _id: postId, userId }))
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
      dispatch(setLoveUnlove({ _id: postId, userId }))
    }
    return res;
  }
);

export const asyncGetCommentsByPostId = createAsyncThunk(
  'getCommentsByPostId',
  async ({ postId, isFresh }: { postId: string, isFresh: boolean }, { dispatch, getState }) => {

    let { page, totalPages } = { ...(getState() as RootState).post?.commentsPagination }
    page = isFresh ? 0 : page

    if (page >= totalPages && totalPages) {
      return {
        status: true,
        message: 'You\'ve reached the end of the list'
      }
    }

    // if (!page) {
    //   dispatch(setLoading(true));
    // }

    const res = await callApi<GetAllPostComments>({
      path: (allApiPaths.getPath('getAllPostComments', { postId }) +
        `?limit=${10}&page=${(page ?? 0) + 1}`) as ApiPaths,
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(
        setComments({ ...res.data!, isFresh })
      );
    }

    // dispatch(setLoading(false));
    return res;
  }
);

export const asyncCreatePostComment = createAsyncThunk(
  'createPostComment',
  async (data: { postId: string, comment: { content: string } }, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<{ newComment: Comment }, { content: string, authorType: string }>({
      method: "POST",
      path: allApiPaths.getPath('createPostComment', {
        postId: data.postId
      }),
      body: { ...data.comment, authorType: 'teacher' }
    });

    if (!res.status) {
      dispatch(asyncShowError(res.message));
    } else {
      dispatch(setComment(res.data?.newComment!))
    }

    dispatch(setLoading(false));
    return res;
  }
);

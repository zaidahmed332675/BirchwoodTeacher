import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, GetActivities, GetAllClassPosts, GetAllPostComments, Post } from '../../Types/Post';
import { callApi } from '../../services/api';
import { allApiPaths } from '../../services/apiPaths';
import { setLoading } from '../slices/common.slice';
import { removePost, setActivities, setComment, setComments, setLike, setLove, setPost, setPosts } from '../slices/post.slice';
import { asyncShowError, asyncShowSuccess } from './common.action';

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

export const asyncGetAllClassPosts = createAsyncThunk(
  'getAllClassPosts',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const res = await callApi<GetAllClassPosts>({
      path: allApiPaths.getPath('getAllClassPosts', {
        classRoomId: '6630e5f01364cb7fd294281c'
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
  async (data: FormData | undefined, { dispatch }) => {
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
    const userId = getState().user.user?._id
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
    const userId = getState().user.user?._id
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

// export const asyncCheckInChildByTeacher = createAsyncThunk(
//   'checkInChildByTeacher',
//   async (data: any, { dispatch }) => {
//     dispatch(setLoading(true));

//     const res = await callApi<{ newAttendance: ChildCheckInOutResponse }, ChildCheckInOutPayload>({
//       method: 'POST',
//       path: allApiPaths.getPath('checkInChildByTeacher'),
//       body: data,
//     });

//     if (!res?.status) {
//       dispatch(asyncShowError(res.message));
//     } else {
//       if (res.data?.newAttendance?.children) {
//         dispatch(setChild({ _id: res.data.newAttendance.children, newAttendance: res.data.newAttendance }));
//       }
//       dispatch(asyncShowSuccess(res.message));
//     }

//     dispatch(setLoading(false));
//     return res;
//   }
// );

// export const asyncCreateChat = createAsyncThunk(
//   'createChat',
//   async ({ childId, data }: { childId: string, data: CreateChatPayload }, { dispatch }) => {
//     const res = await callApi<CreateChatResponse, CreateChatPayload>({
//       method: 'POST',
//       path: allApiPaths.getPath('createChat'),
//       body: data,
//     });

//     if (!res?.status) {
//       dispatch(asyncShowError(res.message));
//     } else {
//       if (res.data?._id) {
//         dispatch(setChild({ _id: childId, chatRoomId: res.data._id }));
//       }
//       if (res.data?.chat?._id) {
//         dispatch(setChild({ _id: childId, chatRoomId: res.data.chat._id }));
//       }
//     }

//     dispatch(setLoading(false));
//     return res;
//   }
// );

// export const asyncCreateChatRoomMessage = createAsyncThunk(
//   'createChatRoomMessage',
//   async (data: CreateChatRoomMessagePayload, { dispatch }) => {
//     const res = await callApi<CreateChatRoomMessageResponse, CreateChatRoomMessagePayload>({
//       method: 'POST',
//       path: allApiPaths.getPath('createChat'),
//       body: data,
//     });

//     if (!res?.status) {
//       dispatch(asyncShowError(res.message));
//     } else {
//       if (res.data?.message?._id) {
//         dispatch(setChatRoomMessage({ chatRoomId: res.data.message.chat, message: res.data.message }));
//       }
//     }

//     dispatch(setLoading(false));
//     return res;
//   }
// );

// export const asyncGetMessagesByChatRoomId = createAsyncThunk(
//   'getMessagesByChatRoomId',
//   async ({ chatRoomId }: { chatRoomId: string }, { dispatch }) => {
//     dispatch(setLoading(true));

//     const res = await callApi<MessagesResponse>({
//       path: allApiPaths.getPath('getMessagesByChatRoomId', {
//         chatRoomId
//       }),
//     });

//     console.log(res, 'cheko response of messages')

//     if (!res?.status) {
//       dispatch(asyncShowError(res.message));
//     } else {
//       if (res.data?.docs?.length) {
//         dispatch(setChatRoom({ chatRoomId, ...res.data }));
//       }
//       dispatch(asyncShowSuccess(res.message));
//     }

//     dispatch(setLoading(false));
//     return res;
//   }
// );
export enum AuthApiPaths {
  login = 'teacher/auth/signin',
}

export enum ResetPasswordApiPaths {
  emailVerification = 'auth/emailVerificationCode',
  codeVerification = 'auth/verifyRecoverCode',
  resetPassword = 'auth/resetPassword',
}

export enum ProfileApiPaths {
  profile = 'teacher/profile/getProfile',
  updateProfile = 'teacher/profile/updateProfile',
  changePassword = 'profile/changePassword',
  checkIn = 'teacher/attendance/markCheckIn',
  checkOut = 'teacher/attendance/markCheckOut',
  leave = 'teacher/attendance/markLeave',
  monthlyAttendance = 'teacher/attendance/getAttendanceByMonth',
  getAllHolidays = 'holiday/getAllHolidays',
  updateEducation = 'teacher/profile/updateEducation',
  updateExperience = 'teacher/profile/updateExperience',
}

export enum ClassApiPaths {
  getChildrenByClassId = 'admin/children/getChildrenByClassroom/:classRoomId',
  checkInChildByTeacher = '/children/attendance/markCheckIn',
  createChat = '/chat/createChat',
  getMessagesByChatRoomId = '/message/getChatMessages/:chatRoomId',
  createChatRoomMessage = '/message/createMessage',
}

export enum PostApiPaths {
  getActivities = '/activity/getAllActivities',
  createPost = '/post/addPost',
  getAllClassPosts = '/post/getAllClassPosts/:classRoomId',
  getAllChildPosts = '/post/getAllChildPosts/:childId',
  likePost = '/post/likePost/:postId',
  lovePost = '/post/lovePost/:postId',
  createPostComment = '/post/commentPost/:postId',
  getAllPostComments = '/post/getAllPostComments/:postId',
  deletePost = '/post/deletePost/:postId',
}

export enum DiaryApiPaths {
  createHomeWork = '/homework/addHomework',
  getAllHomeWork = '/homework/getAllHomework',
  getAllChildHomework = '/homework/getAllChildHomework/:childId',
  getHomeworkById = '/homework/getHomeworkById/:homeWorkId',
  deleteHomeWork = '/homework/deleteHomework/:homeWorkId',
  updateHomeWork = '/homework/updateHomework/:homeWorkId'
}

export const AllApiPaths = Object.freeze({
  ...AuthApiPaths,
  ...ResetPasswordApiPaths,
  ...ProfileApiPaths,
  ...ClassApiPaths,
  ...PostApiPaths,
  ...DiaryApiPaths,
});

export type ApiPaths = AuthApiPaths | ResetPasswordApiPaths | ProfileApiPaths | ClassApiPaths | PostApiPaths | DiaryApiPaths;

class ApiPathHandler<T> {
  private paths: T;

  constructor(paths: T) {
    this.paths = paths;
  }

  getPath<K extends keyof T>(
    key: K,
    params?: Record<string, string | number>
  ): T[K] {
    let path: string = this.paths[key] as string;
    if (!params || !Object.keys(params ?? {}).length) {
      return path as T[K];
    }

    for (const param in params) {
      path = path.replace(`:${param}`, params[param].toString());
    }
    return path as T[K];
  }
}

export const allApiPaths = new ApiPathHandler(AllApiPaths);

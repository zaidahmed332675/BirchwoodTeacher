export enum ERootStack {
  auth = 'auth',
  main = 'main',
}

export type RootStackParams = {
  auth: undefined;
  main: undefined;
};

export enum EAuthStack {
  signIn = 'signIn',
  emailVerification = 'emailVerification',
  verificaionCode = 'verificaionCode',
  resetPassword = 'resetPassword',
  main = 'main',
}

export type AuthStackParams = {
  signIn: undefined;
  emailVerification: undefined;
  verificaionCode: {
    email: string;
  };
  resetPassword: {
    email: string;
    code: string;
  };
  main: undefined;
};

export enum EMainStack {
  home = 'home',
  profileRoutes = 'profileRoutes',
  myClass = 'myClass',
  activityRoutes = 'activityRoutes',
  diaryRoutes = 'diaryRoutes',
  chatRoutes = 'chatRoutes',
  attendanceRoutes = 'attendanceRoutes',
  changePassword = 'changePassword',
}

export type MainStackParams = {
  home: undefined;
  profileRoutes: undefined;
  myClass: undefined;
  activityRoutes: undefined;
  diaryRoutes: undefined;
  chatRoutes: undefined;
  attendanceRoutes: undefined;
  changePassword: undefined;
};

export enum EProfileStack {
  profile = 'profile',
  editPersonalInfo = 'editPersonalInfo',
  editEducation = 'editEducation',
  editExperience = 'editExperience',
}

export type ProfileStackParams = {
  profile: undefined;
  editPersonalInfo: undefined;
  editEducation: undefined;
  editExperience: undefined;
};

export enum EActivityStack {
  activities = 'activities',
  activity = 'activity',
  createActivity = 'createActivity',
}

export type ActivityStackParams = {
  activities: undefined;
  activity: {
    activityId: string;
    activityName: string;
  };
  createActivity: undefined;
};

export enum EDiaryStack {
  diary = 'diary',
  createDiary = 'createDiary',
}

export type DiaryStackParams = {
  diary: undefined;
  createDiary: undefined;
};

export enum EChatStack {
  chat = 'chat',
  createChat = 'createChat',
}

export type ChatStackParams = {
  chat: undefined;
  createChat: {
    parentId: number;
    parentName: string;
  };
};

export enum EAttendanceStack {
  attendance = 'attendance',
}

export type AttendanceStackParams = {
  attendance: undefined;
};

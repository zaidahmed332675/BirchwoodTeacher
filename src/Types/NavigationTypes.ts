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
  myClassRoutes = 'myClassRoutes',
  activityRoutes = 'activityRoutes',
  diaryRoutes = 'diaryRoutes',
  chatRoutes = 'chatRoutes',
  attendanceRoutes = 'attendanceRoutes',
  changePassword = 'changePassword',
  checkOut = 'checkOut',
  logOut = 'logOut',
}

export type MainStackParams = {
  home: undefined;
  profileRoutes: undefined;
  myClassRoutes: undefined;
  activityRoutes: undefined;
  diaryRoutes: undefined;
  chatRoutes: undefined;
  attendanceRoutes: undefined;
  changePassword: undefined;
  checkOut: undefined;
  logOut: undefined;
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

export enum EClassStack {
  class = 'class',
  studentInfo = 'studentInfo',
}

export type ClassStackParams = {
  class: undefined;
  studentInfo: undefined;
};

export enum EActivityStack {
  activities = 'activities',
  activityList = 'activityList',
  createActivity = 'createActivity',
}

export type ActivityStackParams = {
  activities: undefined;
  activityList: undefined;
  createActivity: {
    activityId: number;
    activityName: string;
  };
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

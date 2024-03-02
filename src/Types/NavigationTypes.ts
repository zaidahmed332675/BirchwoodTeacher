// import {EventProps} from './EventType'
// import {HistoryProps} from './HistoryType'
// import {NewsProps} from './NewsType'
// import {OrderProps} from './OrderType'
// import {ProductProps} from './ProductType'

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
  activityRoutes = 'activityRoutes',
  diaryRoutes = 'diaryRoutes',
  chatRoutes = 'chatRoutes',
  attendanceRoutes = 'attendanceRoutes',

  //   reparationRoutes = 'reparationRoutes',
  //   eventRoutes = 'eventRoutes',
  //   orderRoutes = 'orderRoutes',
  //   newsRoutes = 'newsRoutes',
  //   historyRoutes = 'historyRoutes',

  //   cart = 'cart',
  //   wishList = 'wishList',
  //   productDetail = 'productDetail',
  //   checkOut = 'checkOut'
}

export type MainStackParams = {
  home: undefined;
  profileRoutes: undefined;
  activityRoutes: undefined;
  diaryRoutes: undefined;
  chatRoutes: undefined;
  attendanceRoutes: undefined;

  //   reparationRoutes: undefined
  //   eventRoutes: undefined
  //   orderRoutes: undefined
  //   newsRoutes: undefined
  //   historyRoutes: undefined

  //   cart: undefined
  //   wishList: undefined
  //   productDetail: {
  //     product: ProductProps
  //   }
  //   checkOut: undefined
};

export enum EProfileStack {
  profile = 'profile',
  editPersonalInfo = 'editPersonalInfo',
  editEducation = 'editEducation',
  editExperience = 'editExperience',
  // editProfile = 'editProfile',
  // changePassword = 'changePassword',
}

export type ProfileStackParams = {
  profile: undefined;
  editPersonalInfo: undefined;
  editEducation: undefined;
  editExperience: undefined;
  // editProfile: undefined;
  // changePassword: undefined
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
    parentId: string;
    parentName: string;
  };
};

export enum EAttendanceStack {
  attendance = 'attendance',
}

export type AttendanceStackParams = {
  attendance: undefined;
};

// export enum ENewsStack {
//   news = 'news',
//   newsDetails = 'newsDetails'
// }

// export type NewsStackParams = {
//   news: undefined
//   newsDetails: {
//     news: NewsProps
//   }
// }

// export enum EHistoryStack {
//   history = 'history',
//   historyDetails = 'historyDetails'
// }

// export type HistoryStackParams = {
//   history: undefined
//   historyDetails: {
//     history: HistoryProps
//   }
// }

// export enum EReparationStack {
//   state = 'state',
//   position = 'position',
//   representative = 'representative'
// }

// export type ReparationStackParams = {
//   state: undefined
//   position: {
//     stateId: string
//     stateName: string
//   }
//   representative: {
//     stateId: string
//     stateName: string
//     positionId: string
//     positionName: string
//   }
// }

// export enum EEventStack {
//   event = 'event',
//   eventDetail = 'eventDetail'
// }

// export type EventStackParams = {
//   event: undefined
//   eventDetail: {
//     event: EventProps
//   }
// }

// export enum EOrderStack {
//   order = 'order',
//   orderDetail = 'orderDetail'
// }

// export type OrderStackParams = {
//   order: undefined
//   orderDetail: {
//     order: OrderProps
//   }
// }

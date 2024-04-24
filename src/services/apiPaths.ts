export enum AuthApiPaths {
  login = 'auth/signin',
  signUp = 'auth/signup',
}

export enum ResetPasswordApiPaths {
  emailVerification = 'auth/emailVerificationCode',
  codeVerification = 'auth/verifyRecoverCode',
  resetPassword = 'auth/resetPassword',
}

export enum ProfileApiPaths {
  profile = 'profile/getProfile',
  updateProfile = 'profile/updateProfile',
  changePassword = 'profile/changePassword',
}

export enum ReparationCardApiPaths {
  states = 'state/getAllStates',
  positions = 'position/getAllPositions',
  representativeByPosition = 'representative/getRepresentativeByPosition',
}

export enum ReparationSchoolApiPaths {
  reparationSchool = 'school/getAllSchools',
}

export enum PodcastApiPaths {
  podcasts = 'podcast/getAllPodcasts',
}

export enum EventApiPaths {
  events = 'event/getAllEvents',
  eventById = 'event/getEventById',
}

export enum NewsApiPaths {
  news = 'news/getAllNews',
}

export enum HistoryApiPaths {
  histories = 'history/getAllHistorys',
}

export enum OrderApiPaths {
  createOrder = 'order/addOrder',
  orders = 'order/getMyOrders',
  createPayment = 'payment/orderPayment',
}

export enum ProductApiPaths {
  products = 'product/getAllProducts',
}

export enum DonationApiPaths {
  donatePayment = 'payment/donationPayment',
}

export enum DeleteAccount {
  deleteAccount = 'admin/user/deleteUser/:id',
}

export const AllApiPaths = Object.freeze({
  ...AuthApiPaths,
  ...ResetPasswordApiPaths,
  ...ProfileApiPaths,
  ...EventApiPaths,
  ...ReparationCardApiPaths,
  ...ReparationSchoolApiPaths,
  ...PodcastApiPaths,
  ...OrderApiPaths,
  ...ProductApiPaths,
  ...NewsApiPaths,
  ...HistoryApiPaths,
  ...DonationApiPaths,
  ...DeleteAccount,
});

export type ApiPaths =
  | AuthApiPaths
  | ResetPasswordApiPaths
  | ProfileApiPaths
  | EventApiPaths
  | ReparationCardApiPaths
  | ReparationSchoolApiPaths
  | PodcastApiPaths
  | OrderApiPaths
  | ProductApiPaths
  | NewsApiPaths
  | HistoryApiPaths
  | DonationApiPaths
  | DeleteAccount;

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

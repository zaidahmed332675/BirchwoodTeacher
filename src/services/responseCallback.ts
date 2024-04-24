import { AxiosResponse } from 'axios';
import { store } from '../Stores';
import { resetUserState } from '../Stores/slices/user.slice';

export interface ResponseCallback<RD> {
  status: boolean;
  message: string;
  data?: RD;
}

export function responseCallback<RT>(
  res: AxiosResponse<ResponseCallback<RT>>
): ResponseCallback<RT> {
  const message = res.data.message ?? res.statusText;

  if ([500, 404, 401, 400, 409].includes(res?.status)) {
    if (res.status === 401) {
      store.dispatch(resetUserState());
    }

    return {
      ...(res?.data ?? {}),
      message,
      status: false,
    };
  }

  return res?.data ?? {};
}

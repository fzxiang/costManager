import { defHttp } from '/@/utils/http/axios';
import { type LoginParams, type LoginResultModel, type GetUserInfoModel } from './model/userModel';

import { type ErrorMessageMode } from '/#/axios';

enum Api {
  Logout = '/sso/logout',
  GetPermCode = '/organization/user/getUserFeatureInfo',
  // un-used
  Login = '/user/login',
  GetUserInfo = '/user/info',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export async function getUserInfo(): Promise<GetUserInfoModel> {
  const res = await defHttp.get<{
    name: string;
    email: string;
    avatar: string;
    roles: Array<{
      id: string;
      name: string;
    }>;
    menu: any;
  }>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
  return {
    roles: res.roles.map((item) => {
      return { roleName: item.name, value: item.id };
    }),
    userId: res.email,
    username: res.name,
    realName: res.name,
    avatar: res.avatar,
    menu: res.menu,
  };
}

export function getPermCode(params?) {
  return defHttp.get<string[]>({ url: Api.GetPermCode, params });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

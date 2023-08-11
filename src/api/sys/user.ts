import { defHttp } from '/@/utils/http/axios';
import { type LoginParams, type LoginResultModel, type GetUserInfoModel } from './model/userModel';

import { type ErrorMessageMode } from '/#/axios';

enum Api {
  Logout = '/sso/logout',
  GetPermCode = '/organization/user/getUserFeatureInfo',
  // un-used
  Login = '/login',
  GetUserInfo = '/getUserInfo',
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
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
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

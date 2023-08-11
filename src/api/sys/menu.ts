import { defHttp } from '/@/utils/http/axios';
import { type getMenuListResultModel } from './model/menuModel';

enum Api {
  GetAdminMenu = '/organization/user/getAdminMenuInfo',
  GetUserMenu = '/organization/user/getUserMenuInfo',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (params?) => {
  return defHttp.get<getMenuListResultModel>({
    url: params.path === '/system' ? Api.GetAdminMenu : Api.GetUserMenu,
    params,
  });
};

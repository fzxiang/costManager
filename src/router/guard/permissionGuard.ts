import type { Router } from 'vue-router';

import { usePermissionStoreWithOut } from '/@/store/modules/permission';

import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWithOut } from '/@/store/modules/user';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { RootRoute } from '/@/router/routes';

import { type RoleEnum } from '/@/enums/roleEnum';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = RootRoute.path;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath);
      return;
    }

    const token = userStore.getToken;

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        try {
          await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch {
          //
        }
      }
      next();
      return;
    }
    // token or user does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // redirect login page
      // const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
      //   path: LOGIN_PATH,
      //   replace: true,
      // };
      // if (to.path) {
      //   redirectData.query = {
      //     ...redirectData.query,
      //     redirect: to.path,
      //   };
      // }
      // next(redirectData);

      // 只使用单点登录
      const url = new URL(location.href);
      if (url.searchParams.get('token')) {
        const token = url.searchParams.get('token') || undefined;
        userStore.setToken(token);

        const roles = [
          {
            roleName: url.searchParams.get('is_admin') === '1' ? '超级管理员' : '普通用户',
            value: url.searchParams.get('is_admin') === '1' ? 'super' : 'user',
          },
        ];
        userStore.setUserInfo({
          userId: '1',
          username: url.searchParams.get('user_name') || '',
          realName: url.searchParams.get('real_name') || '',
          avatar: url.searchParams.get('avatar') || '',
          desc: 'none description',
          roles: roles,
        });
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        userStore.setRoleList(roleList);
        next({ path: to.path });
      }
      // else {
      //   userStore.setToken(undefined);
      //   userStore.setSessionTimeout(false);
      //   userStore.setUserInfo(null);
      //   location.href = location.origin + '/api/api/login';
      // }
      // return;
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      return;
    }

    // get userinfo while last fetch time is empty
    // if (userStore.getLastUpdateTime === 0) {
    //   try {
    //     await userStore.getUserInfoAction();
    //   } catch (err) {
    //     next();
    //     return;
    //   }
    // }

    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    await permissionStore.buildRoutesAction();

    // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}

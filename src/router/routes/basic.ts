import type { AppRouteRecordRaw } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import {
  REDIRECT_NAME,
  LAYOUT,
  EXCEPTION_COMPONENT,
  PAGE_NOT_FOUND_NAME,
} from '/@/router/constant';

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/sys/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: LAYOUT,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      component: () => import('/@/views/sys/error-log/index.vue'),
      meta: {
        title: t('routes.basic.errorLogList'),
        hideBreadcrumb: true,
        currentActiveMenu: '/error-log',
      },
    },
  ],
};

// 头部入口默认菜单 后续考虑接口获取
export const ENTRY_ROUTE: AppRouteRecordRaw[] = [
  {
    path: '/welcome',
    name: 'WelcomeCastle',
    component: '/welcome/castle',
    meta: {
      orderNo: 0,
      icon: 'ant-design:smile-outlined',
      title: '欢迎页',
      hideChildrenInMenu: true,
    },
  },
  {
    path: '/project',
    name: 'Project',
    component: 'LAYOUT',
    redirect: '/project/main',
    meta: {
      icon: 'la:project-diagram',
      title: '项目管理',
    },
    children: [
      {
        path: 'main',
        name: 'ProjectMainSelect',
        component: '/project/main/select/index',
        meta: {
          icon: 'grommet-icons:select',
          title: '选择项目',
          hideTab: true,
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    component: 'LAYOUT',
    redirect: '/system/permission/account',
    meta: {
      icon: 'ion:settings-outline',
      title: '系统设置',
    },
    children: [],
  },
];

import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const comp: AppRouteModule = {
  path: '/expenses',
  name: 'Expenses',
  component: LAYOUT,
  redirect: '/expenses/person',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: '成本管理',
  },

  children: [
    {
      path: 'person',
      name: 'ExpensesMember',
      component: () => import('/@/views/expenses/person/index.vue'),
      meta: {
        title: '人员人工成本',
      },
    },
    {
      path: 'project',
      name: 'ExpensesProject',
      component: () => import('/@/views/expenses/project/index.vue'),
      meta: {
        title: '项目人工成本预算',
      },
    },
  ],
};

export default comp;
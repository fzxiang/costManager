import { type VxeFormItemProps, type VxeGridPropTypes } from '/@/components/VxeTable';
import { useUserStore } from '/@/store/modules/user';
import { computed } from 'vue';

const userStore = useUserStore();
export const vxeTableColumns: VxeGridPropTypes.Columns = [
  // {
  //   title: '序号',
  //   type: 'seq',
  //   fixed: 'left',
  //   width: '50',
  //   align: 'center',
  // },
  {
    title: '时间',
    field: 'date',
    width: 150,
  },
  {
    title: '类型',
    field: 'type',
    width: 150,
  },
  {
    title: '总人数',
    field: 'total_num',
  },
  {
    title: '总人工成本',
    field: 'total_cost',
  },
  {
    title: '策划总人数',
    field: 'designer_num',
  },
  {
    title: '策划总工时',
    field: 'designer_time',
  },
  {
    title: '客户端总人数',
    field: 'client_num',
  },
  {
    title: '客户端总工时',
    field: 'client_time',
  },
  {
    title: '服务端总人数',
    field: 'server_num',
  },
  {
    title: '服务端总工时',
    field: 'server_time',
  },
  {
    title: '美术总人数',
    field: 'art_num',
  },
  {
    title: '美术总工时',
    field: 'art_time',
  },
  {
    title: '最新修改时间',
    field: 'updated_at',
  },
  {
    width: 160,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

const projectOptions = computed(() => {
  const { menu } = userStore.getUserInfo || {};
  const { project } = menu || {};
  if (project && project.length > 0) {
    return project.map((item) => {
      return { label: item.name, value: item.id };
    });
  } else {
    return [];
  }
});
export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'project_id',
    title: '项目',
    itemRender: {
      name: 'ASelect',
      props: {
        options: projectOptions.value,
        defaultValue: projectOptions.value[0].value,
      },
    },
    span: 6,
  },

  {
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: { type: 'primary', content: '查询', htmlType: 'submit' },
          attrs: { class: 'mr-2' },
        },
        // { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
  },
];

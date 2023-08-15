import { type VxeFormItemProps, type VxeGridPropTypes } from '/@/components/VxeTable';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  // {
  //   title: '序号',
  //   type: 'seq',
  //   fixed: 'left',
  //   width: '50',
  //   align: 'center',
  // },
  {
    title: '中心',
    field: 'center',
    align: 'center',
    minWidth: 150,
    showOverflow: 'tooltip',
  },
  {
    title: '部门',
    field: 'department',
    align: 'center',
    minWidth: 150,
    showOverflow: 'tooltip',
  },
  {
    title: '岗位',
    field: 'job',
    align: 'center',
    minWidth: 150,
    showOverflow: 'tooltip',
  },
  {
    title: '编制人数',
    field: 'num',
    align: 'center',
    minWidth: 150,
    showOverflow: 'tooltip',
    editRender: {
      name: 'AInputNumber',
      props: {
        min: 0,
        attrs: {
          placeholder: '请输入编制人数',
        },
      },
    },
  },
  {
    minWidth: 160,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'center',
    title: '中心',
    itemRender: {
      name: 'AInput',
    },
    span: 6,
  },
  {
    // span: 12,
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: { type: 'primary', content: '查询', htmlType: 'submit' },
          attrs: { class: 'mr-2' },
        },
        { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
  },
];

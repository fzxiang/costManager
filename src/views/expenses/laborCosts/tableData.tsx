import { type VxeFormItemProps, type VxeGridPropTypes } from '/@/components/VxeTable';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: '月份',
    field: 'date',
    align: 'center',
    minWidth: 150,
    showOverflow: 'tooltip',
  },
  {
    title: '合计人工成本',
    field: 'cost',
    align: 'center',
    minWidth: 150,
    showOverflow: 'tooltip',
  },
  {
    title: '合计工时',
    field: 'hour',
    align: 'center',
    minWidth: 150,
    showOverflow: 'tooltip',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'year',
    title: '选择年份',
    itemRender: {
      name: 'ASelect',
      props: {
        options: ['', '', '', '', ''].map((item, index) => {
          const year = new Date().getFullYear() - index;
          return { label: year + '年', value: year };
        }),
      },
      defaultValue: '2023',
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
        // { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
  },
];

<template>
  <PageWrapper contentFullHeight fixedHeight>
    <div class="p-4 bg-white h-full">
      <VxeGrid ref="tableRef" v-bind="gridOptions">
        <template #action="{ row }">
          <TableAction outside :actions="createActions(row)" />
        </template>
      </VxeGrid>
    </div>
    <Modal @register="register" :maskClosable="false" width="80%" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref, provide } from 'vue';
  import type { ActionItem } from '/@/components/Table';
  import { TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './tableData';
  import { type BasicTableProps, VxeGrid, type VxeGridInstance } from '/@/components/VxeTable';

  import { getListApi, addApi } from '/@/api/expenses/project';
  import { useModal } from '/@/components/Modal';
  import Modal from './Modal.vue';

  const { createMessage } = useMessage();

  const tableRef = ref<VxeGridInstance>();
  provide('tableRef', tableRef);
  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    keepSource: true,
    columns: vxeTableColumns,

    toolbarConfig: {
      buttons: [
        {
          content: '新增下月预算',
          buttonRender: {
            name: 'AButton',
            props: {
              type: 'primary',
              preIcon: 'mdi:page-next-outline',
            },
            events: {
              click: async () => {
                if (!tableRef.value) return;
                const proxyInfo = tableRef.value.getProxyInfo();
                const form = proxyInfo?.form;
                if (!form.project_id) {
                  createMessage.error('请选择项目');
                  return;
                }
                await addApi(form);
                console.log(tableRef.value);
                tableRef.value.commitProxy('query');
                createMessage.success('新增成功');
              },
            },
          },
        },
      ],
    },
    formConfig: {
      enabled: true,
      items: vxeTableFormSchema,
      rules: {
        project_id: [{ required: true, message: '请选择项目' }],
      },
    },
    height: 'auto',
    proxyConfig: {
      autoLoad: false,
      props: {
        list: 'list',
        total: 'count',
      },
      ajax: {
        query: async ({ page, form }) => {
          return getListApi({
            page: page.currentPage,
            page_size: page.pageSize,
            ...form,
          });
        },
        queryAll: async ({ form }) => {
          console.log(form);
          return [];
          // return await demoListApi(form);
        },
      },
    },
  });

  // 操作按钮（权限控制）
  const createActions = (record) => {
    const actions: ActionItem[] = [
      {
        label: '查看详情',
        ifShow: !record.editable,
        onClick: () => {
          if (!tableRef.value) return;
          const proxyInfo = tableRef.value.getProxyInfo();
          const form = proxyInfo?.form;
          if (!form.project_id) {
            createMessage.error('请选择项目');
            return;
          }
          openModal(true, { ...record, project_id: form.project_id });
        },
      },
      {
        ifShow: record.editable,
        label: '编辑',
        onClick: () => {
          if (!tableRef.value) return;
          const proxyInfo = tableRef.value.getProxyInfo();
          const form = proxyInfo?.form;
          if (!form.project_id) {
            createMessage.error('请选择项目');
            return;
          }
          openModal(true, { ...record, project_id: form.project_id });
        },
      },
      // {
      //   label: '删除',
      //   color: 'error',
      //   popConfirm: {
      //     title: '是否确认删除',
      //     confirm: () => {
      //       tableRef.value?.remove(record);
      //     },
      //   },
      // },
    ];

    return actions;
  };

  // 弹窗
  const [register, { openModal }] = useModal();
</script>

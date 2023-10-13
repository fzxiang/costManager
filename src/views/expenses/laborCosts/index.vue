<template>
  <PageWrapper contentFullHeight fixedHeight>
    <div class="p-4 bg-white h-full">
      <VxeGrid ref="xGrid" v-bind="gridOptions">
        <template #buttons>
          <div class="flex space-x-2">
            <BasicUpload
              :maxSize="20"
              :maxNumber="1"
              @change="handleChange"
              :api="uploadApi"
              title="导入文档"
              :emptyHidePreview="true"
            />
          </div>
        </template>
      </VxeGrid>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './tableData';
  import { type BasicTableProps, VxeGrid, type VxeGridInstance } from '/@/components/VxeTable';
  import { BasicUpload } from '/@/components/Upload';

  import { getListApi, uploadApi } from '/@/api/expenses/laborCosts';

  const { createMessage } = useMessage();

  const xGrid = ref<VxeGridInstance>();

  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    keepSource: true,
    editConfig: { trigger: 'manual', mode: 'row', showStatus: true },
    columns: vxeTableColumns,
    toolbarConfig: {
      slots: {
        buttons: 'buttons',
      },
    },
    formConfig: {
      enabled: true,
      items: vxeTableFormSchema,
    },
    height: 'auto',
    proxyConfig: {
      props: {
        list: 'list',
        total: 'count',
      },
      ajax: {
        query: async ({ form }) => {
          return getListApi(form);
        },
      },
    },
  });

  // 导入
  function handleChange(list: string[]) {
    createMessage.info(`已上传文件${JSON.stringify(list)}`);
    const $grid = xGrid.value;
    if ($grid) {
      $grid.commitProxy('reload');
    }
  }
</script>

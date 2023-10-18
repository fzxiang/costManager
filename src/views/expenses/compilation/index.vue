<template>
  <PageWrapper contentFullHeight fixedHeight>
    <div class="p-4 bg-white h-full">
      <VxeGrid ref="xGrid" v-bind="gridOptions">
        <template #action="{ row }">
          <template v-if="hasActiveEditRow(row)">
            <div class="flex space-x-2 justify-center">
              <a-button type="success" content="保存" @click="saveRowEvent(row)" size="small"
                >保存</a-button
              >
              <a-button @click="clearRowEvent" size="small">取消</a-button>
            </div>
          </template>
          <template v-else>
            <a-button type="primary" @click="editRowEvent(row)" size="small">编辑</a-button>
          </template>
        </template>
        <template #buttons>
          <div class="flex space-x-2">
            <BasicUpload
              :maxSize="20"
              :maxNumber="1"
              @change="handleChange"
              :api="uploadApi"
              title="导入文档"
              :emptyHidePreview="true"
              :showPreviewNumber="false"
            />
            <a-button
              color="success"
              class="mr-2"
              preIcon="ant-design:download-outlined"
              @click="exportHandler"
            >
              导出文档
            </a-button>
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

  import { getListApi, uploadApi, downloadApi, updateApi } from '/@/api/expenses/compilation';

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
        query: async ({ page, form }) => {
          return getListApi({
            page: page.currentPage,
            page_size: page.pageSize,
            ...form,
          });
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

  // 导出
  async function exportHandler() {
    await downloadApi();
    createMessage.info('导出成功');
  }

  // 编辑
  interface RowVO {
    id: number;
    center: string;
    num: number;
    apartment: string;
    job: string;
  }

  function hasActiveEditRow(row: RowVO) {
    const $grid = xGrid.value;
    if ($grid) {
      return $grid.isEditByRow(row);
    }
    return false;
  }
  function clearRowEvent() {
    const $grid = xGrid.value;
    if ($grid) {
      $grid.clearEdit();
    }
  }
  async function saveRowEvent(row: RowVO) {
    const $grid = xGrid.value;
    if ($grid) {
      try {
        gridOptions.loading = true;
        // 模拟异步保存
        await updateApi(row);
        gridOptions.loading = false;
        await $grid.clearEdit();
        createMessage.info({ content: `编辑成功` });
      } catch (error) {
        gridOptions.loading = false;
        await $grid.revertData();
        console.log(error);
      }
    }
  }

  function editRowEvent(row: RowVO) {
    const $grid = xGrid.value;
    if ($grid) {
      $grid.setEditRow(row);
    }
  }
</script>

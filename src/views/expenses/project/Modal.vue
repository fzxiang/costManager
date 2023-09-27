<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="editable ? '修改预算' : '预算详情'"
    @ok="onConfirm"
  >
    <div class="border-table">
      <div class="flex">
        <div class="w-150px border-th">岗位</div>
        <div class="w-150px border-th">成员</div>
        <div class="w-150px border-th">人员状态</div>
        <div v-for="item in th" :key="item" class="flex-1 border-th">{{ item }}</div>
      </div>
      <div v-for="items in detailList" :key="items.name">
        <div class="flex">
          <div class="w-150px flex justify-center items-center border-td">{{ items.name }}</div>
          <div class="flex-1">
            <div class="flex" v-for="item in items.employees" :key="item.name">
              <div class="w-150px border-td">
                <Select
                  v-if="item.editable"
                  v-model:value="item.name"
                  :options="getOptions(items.name, items.employees)"
                  style="width: 100%"
                  :showSearch="true"
                  @change="onChange(item)"
                />
                <span v-else>{{ item.name }}</span>
              </div>
              <div class="w-150px border-td">
                <Select
                  v-if="item.editable"
                  :value="item.type ? 1 : 0"
                  :onUpdate:value="
                    (val) => {
                      item.type = val === 1;
                    }
                  "
                  :options="[
                    { label: '固定', value: 1 },
                    { label: '非固定', value: 0 },
                  ]"
                />
                <span v-else>
                  {{ item.type ? '固定' : '非固定' }}
                </span>
              </div>
              <div class="flex-1 border-td" v-for="child in item.hour" :key="child.date">
                <InputNumber
                  v-if="child.editable"
                  v-model:value="child.value"
                  addonAfter="%"
                  :min="0"
                  :max="200"
                />
                <div v-else>{{ child.value }}%</div>
              </div>
            </div>

            <div class="flex justify-center border-td" v-if="editable">
              <a-button type="primary" size="small" @click="handleAdd(items.employees)"
                >新增</a-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import type { Ref } from 'vue';
  import { computed, inject, nextTick, onMounted, ref } from 'vue';
  import type { VxeGridInstance } from '/@/components/VxeTable';
  import type { SelectProps } from 'ant-design-vue';
  import { InputNumber, Select } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { get } from 'lodash-es';

  import type { DetailList, Employee, List } from '/@/api/expenses/project';
  import {
    detailApi,
    getEmployeeApi,
    getEmployeeBudgetApi,
    updateApi,
  } from '/@/api/expenses/project';

  const tableRef = inject<Ref<VxeGridInstance>>('tableRef');
  const editable = ref(false);
  const detailList = ref<DetailList[]>();

  const th = computed(() => {
    const hour = get(detailList.value, '[0].employees[0].hour', []) as any[];
    const arr: string[] = [];
    hour.forEach((item) => {
      if (item.date && item.editable !== undefined) {
        const str = item.editable ? `${item.date}实际工时` : `${item.date}预计工时`;
        arr.push(str);
      }
    });
    return arr;
  });

  const project_id = ref();
  const date = ref();

  const [register, { closeModal, changeOkLoading, changeLoading }] = useModalInner(
    async (record: List & { project_id: number }) => {
      changeLoading(true);
      editable.value = record.editable;
      project_id.value = record.project_id;
      date.value = record.date;
      const { list } = await detailApi({ project_id: project_id.value, date: date.value });
      detailList.value = list;
      nextTick(() => {
        changeLoading(false);
      });
    },
  );

  // select
  const employees = ref<Recordable<string[]>>();

  onMounted(async () => {
    employees.value = await getEmployeeApi({ project_id: project_id.value });
  });

  function getOptions(name, existName): SelectProps['options'] {
    if (!employees.value) return undefined;
    const sel = employees.value[name];
    const exist = existName.map((item) => item.name);
    return sel.map((item) => ({ label: item, value: item, disabled: exist.includes(item) }));
  }

  async function onChange(obj: Employee) {
    const res = await getEmployeeBudgetApi({
      project_id: project_id.value,
      date: date.value,
      name: obj.name,
    });
    obj.hour = res.hour;
    obj.editable = true;
    obj.type = res.type;
  }

  function handleAdd(employees: DetailList['employees']) {
    employees.push({
      name: '',
      editable: true,
      type: true,
      hour: th.value.map((item) => ({
        date: item,
        value: 0,
        editable: false,
      })),
    });
  }

  // 提交
  async function onConfirm() {
    try {
      changeOkLoading(true);
      if (detailList.value) {
        await updateApi({
          project_id: project_id.value,
          date: date.value,
          data: detailList.value,
        });
      }
      changeOkLoading(false);
      closeModal();
      tableRef?.value?.commitProxy('query');
    } catch (error) {
      changeOkLoading(false);
    }
  }
</script>

<style lang="less" scoped>
  .border-table {
    border-top: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
  }

  .border-th {
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    background-color: #f3f3f3;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
  }

  .border-td {
    padding: 8px;
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    line-height: 31px;
    text-align: center;
  }
</style>

import { defHttp } from '/@/utils/http/axios';
import { type BasicPageParams, type BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  LIST = '/budget',
}

/**
 * @description: Get sample list value
 */

export interface List {
  /**
   * 美术总人数
   */
  art_num: number;
  /**
   * 美术总工时
   */
  art_time: number;
  /**
   * 客户端总人数
   */
  client_num: number;
  /**
   * 客户端总工时
   */
  client_time: number;
  /**
   * 时间
   */
  date: string;
  /**
   * 游戏策划总人数
   */
  designer_num: number;
  /**
   * 策划总工时
   */
  designer_time: number;
  id: string;
  /**
   * 服务端总人数
   */
  server_num: number;
  /**
   * 服务端总工时
   */
  server_time: number;
  /**
   * 总人工成本
   */
  total_cost: number;
  /**
   * 总人数
   */
  total_num: number;
  /**
   * 1:预估  2: 实际
   */
  type: 1 | 2;
  /**
   * 最新更新时间
   */
  updated_at: number;
  editable: boolean;
}
export const getListApi = (params: { project_id?: number } & BasicPageParams) =>
  defHttp.get<BasicFetchResult<List>>({
    url: Api.LIST,
    params,
    headers: {
      project_id: params.project_id,
    },
  });

export const addApi = (params: { project_id?: number }) =>
  defHttp.post<any>({
    url: Api.LIST,
    headers: {
      project_id: params.project_id,
    },
  });

export interface DetailList {
  employees: Employee[];
  /**
   * 岗位
   */
  name: string;
}

export interface Employee {
  editable?: boolean;
  hour: Hour[];
  /**
   * 名字
   */
  name: string;
  /**
   * 是否固定
   */
  type: boolean;
}

export interface Hour {
  date: string;
  editable: boolean;
  value: number;
}

// 修改
export function updateApi(params: { project_id: number; date: string; data: DetailList[] }) {
  return defHttp.put({
    url: Api.LIST + '/' + params.date,
    params: params.data,
    headers: {
      project_id: params.project_id,
    },
  });
}

// 详情
export function detailApi(params: { project_id: number; date: string }) {
  return defHttp.get<BasicFetchResult<DetailList>>({
    url: Api.LIST + '/' + params.date,
    headers: {
      project_id: params.project_id,
    },
  });
}

// 员工列表
export function getEmployeeApi(params: { project_id: number }) {
  return defHttp.get<Recordable<string[]>>({
    url: '/employee',
    headers: {
      project_id: params.project_id,
    },
  });
}

// 员工预算
export function getEmployeeBudgetApi(params: { name: string; date: string; project_id: number }) {
  return defHttp.get<Employee>({
    url: `/budget/${params.date}/employee/${params.name}`,
    headers: {
      project_id: params.project_id,
    },
  });
}

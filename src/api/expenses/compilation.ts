import { defHttp } from '/@/utils/http/axios';
import { type BasicPageParams, type BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  LIST = '/compilation/list',
}

/**
 * @description: Get sample list value
 */

export interface List {
  center: string;
  department: string;
  id: string;
  job: string;
  num: string;
}
export const getListApi = (params: { center?: string } & BasicPageParams) =>
  defHttp.get<BasicFetchResult<List>>({
    url: Api.LIST,
    params,
  });

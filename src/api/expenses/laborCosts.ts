import { defHttp } from '/@/utils/http/axios';
import { type BasicFetchResult } from '/@/api/model/baseModel';
import { type UploadFileParams } from '/#/axios';

enum Api {
  LIST = '/cost',
  Upload = '/cost/import',
}

/**
 * @description: Get sample list value
 */

export interface List {
  date: string;
  cost: number;
  hour: number;
}
export const getListApi = (params: { year?: string }) =>
  defHttp.get<BasicFetchResult<List>>({
    url: Api.LIST,
    params,
  });

// 上传文件
export function uploadApi(params: UploadFileParams, onUploadProgress) {
  return defHttp.uploadFile<any>(
    {
      url: '/api' + Api.Upload,
      onUploadProgress,
    },
    params,
  );
}

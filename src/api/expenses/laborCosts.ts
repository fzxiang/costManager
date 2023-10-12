import { defHttp } from '/@/utils/http/axios';
import { type BasicPageParams, type BasicFetchResult } from '/@/api/model/baseModel';
import { type UploadFileParams } from '/#/axios';

enum Api {
  LIST = '/cost',
  Upload = '/cost/import',
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

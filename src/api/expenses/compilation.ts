import { defHttp } from '/@/utils/http/axios';
import { type BasicPageParams, type BasicFetchResult } from '/@/api/model/baseModel';
import { type UploadFileParams } from '/#/axios';
import { downloadByBase64 } from '/@/utils/file/download';

enum Api {
  LIST = '/compilation',
  Upload = '/compilation/import',
  Download = '/compilation/export',
  Update = '/compilation',
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

// 下载文件
export async function downloadApi(): Promise<void> {
  const res = await defHttp.post<{ file: string; name: string }>({
    url: Api.Download,
  });

  downloadByBase64(res.file, res.name);
}

// 修改
export function updateApi(params: { num: number; id: number }) {
  return defHttp.put({ url: Api.Update + '/' + params.id, params });
}

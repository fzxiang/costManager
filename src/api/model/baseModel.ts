export interface BasicPageParams {
  page: number;
  page_size: number;
}

export interface BasicFetchResult<T> {
  list: T[];
  count: number;
}

export default interface SuccessResponse<T> {
  message: string;
  status: number;
  metadata: T;
}
export interface Pagination<T> {
  offset: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  results: Array<T>;
}

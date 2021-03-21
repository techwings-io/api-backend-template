export class PaginatedResultsDto<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
}

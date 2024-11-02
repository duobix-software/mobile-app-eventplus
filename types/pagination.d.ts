type CursorPaginationMeta = {
  path: string;
  per_page: number;
  next_cursor?: string;
  prev_cursor?: string;
};

type SimplePaginationMeta = {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
};

type PaginationLinks = {
  first?: string;
  lasr?: string;
  prev?: string;
  next?: string;
};

interface CursorPagination<TData> {
  data: TData;
  meta: CursorPaginationMeta;
  links: PaginationLinks;
}

interface SimplePagination<TData> {
  data: TData;
  meta: SimplePaginationMeta;
  links: PaginationLinks;
}

export { CursorPagination, SimplePagination };

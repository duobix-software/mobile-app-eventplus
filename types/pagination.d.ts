type CursorPaginationMeta = {
  path: string;
  per_page: number;
  next_cursor?: string;
  prev_cursor?: string;
};

type CursorPaginationLinks = {
  first?: string;
  lasr?: string;
  prev?: string;
  next?: string;
};

interface CursorPagination<TData> {
  data: TData;
  meta: CursorPaginationMeta;
  links: CursorPaginationLinks;
}

// type PaginationMeta = {
//     current_page: number;
//     from: number;
//     last_page: number;
//     links: PaginationMetaLink[];
//     path: string;
//     per_page: number;
//     to: number;
//     total: number;
// };

// type PaginationMetaLink = {
//     url?: string;
//     label: string;
//     active: boolean;
// };

// type PaginationLinks = {
//     first: string;
//     last: string;
//     next?: string;
//     prev?: string;
// };

export { CursorPagination };

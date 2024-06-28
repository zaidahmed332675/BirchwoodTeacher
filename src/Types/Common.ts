export interface PaginationProps {
    totalDocs: number,
    limit: number,
    page: number,
    totalPages: number,
    pagingCounter: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number | null,
    nextPage: number | null
}
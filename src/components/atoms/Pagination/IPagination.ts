export interface IPagination {
	totalPages: number;
	currentPage: number;
	handlePageChange: (page: number) => void;
}

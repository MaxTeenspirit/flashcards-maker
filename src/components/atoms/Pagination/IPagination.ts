export interface IPagination {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

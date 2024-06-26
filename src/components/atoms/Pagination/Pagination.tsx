import {Button, Flex, IconButton} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';

import styles from './Pagination.module.scss';
import {IPagination} from './IPagination.ts';

const Pagination = ({totalPages, currentPage, handlePageChange}: IPagination) => {
	const visiblePages = [];
	const totalVisiblePages = 3;

	let startPage = Math.max(1, currentPage - Math.floor(totalVisiblePages / 2));
	let endPage = Math.min(totalPages, startPage + totalVisiblePages - 1);

	if (totalPages <= totalVisiblePages) {
		startPage = 1;
		endPage = totalPages;
	} else {
		if (currentPage <= Math.ceil(totalVisiblePages / 2)) {
			endPage = totalVisiblePages;
		} else if (currentPage >= totalPages - Math.floor(totalVisiblePages / 2)) {
			startPage = totalPages - totalVisiblePages + 1;
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		visiblePages.push(i);
	}

	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	const handlePage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
			handlePageChange(page);
		}
	};

	return (
		<Flex
			justify="center"
			align="center"
			marginBottom="2rem"
			maxWidth="360px"
			mx="auto"
			className={styles['pagination']}
		>
			<IconButton
				icon={<ChevronLeftIcon />}
				variant="ghost"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={isFirstPage}
				aria-label="Previous Page"
				className={styles['pagination__button']}
			/>
			{startPage > 1 && (
				<>
					<Button className={styles['pagination__button']} variant="ghost" onClick={() => handlePage(1)}>
						1
					</Button>
					{startPage > 2 && (
						<Button className={styles['pagination__button']} variant="unstyled" disabled>
							...
						</Button>
					)}
				</>
			)}
			{visiblePages.map((page) => (
				<Button
					className={styles['pagination__button']}
					key={page}
					variant={page === currentPage ? 'outline' : 'ghost'}
					onClick={() => handlePage(page)}
				>
					{page}
				</Button>
			))}
			{endPage < totalPages && (
				<>
					{endPage < totalPages - 1 && (
						<Button className={styles['pagination__button']} variant="unstyled" disabled>
							...
						</Button>
					)}
					<Button
						className={styles['pagination__button']}
						variant="ghost"
						onClick={() => handlePage(totalPages)}
					>
						{totalPages}
					</Button>
				</>
			)}
			<IconButton
				icon={<ChevronRightIcon />}
				onClick={() => handlePage(currentPage + 1)}
				disabled={isLastPage}
				aria-label="Next Page"
				variant="ghost"
				className={styles['pagination__button']}
			/>
		</Flex>
	);
};

export default Pagination;

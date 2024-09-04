import {FC} from 'react';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return (
        <div className="mt-6 flex justify-center">
            <ul className="inline-flex -space-x-px">
                {prevPage && (
                    <li>
                        <button onClick={() => onPageChange(prevPage)}
                                className="px-3 py-2 leading-tight text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 hover:bg-blue-500 rounded-l-lg border-2 border-gray-300 dark:border-gray-700">
                            Previous
                        </button>
                    </li>
                )}
                {Array.from({length: totalPages}).map((_, index) => {
                    const page = index + 1;
                    return (
                        <li key={page}>
                            <button onClick={() => onPageChange(page)}
                                    className={`px-3 py-2 leading-tight ${
                                        currentPage === page
                                            ? 'text-gray-900 dark:text-gray-100 bg-blue-500 border-blue-300'
                                            : 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 hover:bg-blue-500'
                                    } ${page == 1 && !prevPage ? 'rounded-l-lg' : ''} ${page == totalPages && !nextPage ? 'rounded-r-lg' : ''} ${
                                        page > currentPage + 2 || page < currentPage - 2
                                            ? 'hidden sm:block'
                                            : ''
                                    } border-2 border-gray-300 dark:border-gray-700`}>
                                {page}
                            </button>
                        </li>
                    );
                })}
                {nextPage && (
                    <li>
                        <button onClick={() => onPageChange(nextPage)}
                                className="px-3 py-2 leading-tight text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 hover:bg-blue-500 rounded-r-lg border-2 border-gray-300 dark:border-gray-700">
                            Next
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
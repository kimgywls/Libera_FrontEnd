import React from 'react';

interface StudentsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const StudentsPagination: React.FC<StudentsPaginationProps> = React.memo(({ currentPage, totalPages, onPageChange }) => (
    <div className="flex gap-2 items-center text-gray-800">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            style={{ padding: '4px 8px' }}
        >
            이전
        </button>
        <span>
            {currentPage} / {totalPages}
        </span>
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            style={{ padding: '4px 8px' }}
        >
            다음
        </button>
    </div>
));

StudentsPagination.displayName = 'StudentsPagination'; 
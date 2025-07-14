import type { FC, ReactNode } from 'react';

interface DataStateProps {
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    loadingMessage?: string;
    errorMessage?: string;
    emptyMessage?: string;
    children: ReactNode;
}

const DataState: FC<DataStateProps> = ({
    isLoading,
    isError,
    isEmpty,
    loadingMessage = '로딩 중...',
    errorMessage = '데이터를 불러오는 데 실패했습니다.',
    emptyMessage = '데이터가 없습니다.',
    children
}) => {
    if (isLoading) {
        return <div className="py-4 text-center text-gray-500">{loadingMessage}</div>;
    }

    if (isError) {
        return <div className="py-4 text-center text-red-500">{errorMessage}</div>;
    }

    if (isEmpty) {
        return (
            <div className="text-center text-gray-400">
                <div className="text-gray-700 bg-gray-100 rounded-md py-5">
                    {emptyMessage}
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default DataState; 
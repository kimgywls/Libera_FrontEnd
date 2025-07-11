import { FC, memo } from 'react';

interface UniversityListStatusProps {
    loading: boolean;
    error: Error | null;
    hasData: boolean;
}

const UniversityListStatus: FC<UniversityListStatusProps> = ({ loading, error, hasData }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600 font-medium">추천 학교를 불러오는 중...</span>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.95-.833-2.72 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">추천 학교를 불러오지 못했습니다</h3>
                    <p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
                </div>
            </div>
        );
    }
    if (!hasData) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">추천 데이터가 없습니다</h3>
                    <p className="text-gray-600">성적을 입력하면 추천 학교가 표시됩니다.</p>
                </div>
            </div>
        );
    }
    return null;
};

export default memo(UniversityListStatus); 
import { FC } from 'react';

interface SaveRecommendationModalProps {
    open: boolean;
}

const SaveRecommendationModal: FC<SaveRecommendationModalProps> = ({
    open,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-sm mx-4 text-center">
                <div className="flex flex-col items-center space-y-4">
                    {/* 로딩 스피너 */}
                    <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-500 rounded-full animate-spin"></div>

                    {/* 제목 */}
                    <h3 className="text-lg font-semibold text-gray-900">
                        선택한 학교 저장 중입니다
                    </h3>

                    {/* 설명 */}
                    <p className="text-sm text-gray-600">
                        잠시만 기다려주세요...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SaveRecommendationModal; 
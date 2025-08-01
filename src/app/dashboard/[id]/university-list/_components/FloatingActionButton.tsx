import { FC } from 'react';

interface FloatingActionButtonProps {
    selectedItems: number[];
    isSaving: boolean;
    isHidden: boolean;
    onCancel: () => void;
    onSave: () => Promise<void>;
    onHide: () => Promise<void>;
}

const FloatingActionButton: FC<FloatingActionButtonProps> = ({
    selectedItems,
    isSaving,
    isHidden,
    onCancel,
    onSave,
    onHide,
}) => {
    if (selectedItems.length === 0) return null;

    return (
        <>
            <div
                className="fixed bottom-8 right-8 z-50"
                style={{
                    animation: 'slideInFromBottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* 선택 카운트 배지 */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">{selectedItems.length}</span>
                    </div>

                    <div className="flex items-center gap-5">
                        {/* 버튼 그룹 */}
                        <div className="flex items-center gap-3">
                            {/* 취소 버튼 */}
                            <button
                                onClick={onCancel}
                                className="relative overflow-hidden bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed hover:scale-105 min-w-[120px] justify-center"
                                disabled={isSaving}
                                title="선택 취소"
                            >
                                <span>선택 취소</span>
                            </button>

                            {/* 숨김 버튼 */}
                            <button
                                onClick={async () => await onHide()}
                                disabled={isHidden}
                                className="relative overflow-hidden bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed hover:scale-105 min-w-[120px] justify-center"
                            >
                                {/* 버튼 배경 애니메이션 */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"></div>

                                {/* 버튼 내용 */}
                                <div className="relative flex items-center gap-2 text-white">
                                    {isHidden ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span className="text-white">숨김 처리 중</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-white">{selectedItems.length}개 추천 학교 숨김</span>
                                        </>
                                    )}
                                </div>
                            </button>

                            {/* 저장 버튼 */}
                            <button
                                onClick={async () => await onSave()}
                                disabled={isSaving}
                                className="relative overflow-hidden bg-violet-500 hover:bg-violet-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed hover:scale-105 min-w-[120px] justify-center"
                            >
                                {/* 버튼 배경 애니메이션 */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"></div>

                                {/* 버튼 내용 */}
                                <div className="relative flex items-center gap-2">
                                    {isSaving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span className="text-white">추천 학교 저장 중</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-white">{selectedItems.length}개 추천 학교 저장</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 글로우 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl -z-10 opacity-60"></div>
            </div>

            {/* 애니메이션을 위한 CSS */}
            <style jsx>{`
                @keyframes slideInFromBottom {
                    from {
                        transform: translateY(100%) scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
};

export default FloatingActionButton; 
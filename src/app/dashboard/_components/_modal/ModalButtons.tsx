import type { FC } from 'react';
import { Loader2 } from 'lucide-react';

interface ModalButtonsProps {
    onCancel: () => void;
    onSave: () => void;
    isLoading: boolean;
    cancelText?: string;
    saveText?: string;
    loadingText?: string;
}

const ModalButtons: FC<ModalButtonsProps> = ({
    onCancel,
    onSave,
    isLoading,
    cancelText = '취소',
    saveText = '저장하기',
    loadingText = '처리 중...'
}) => {
    return (
        <div className="flex justify-end space-x-3">
            <button
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                onClick={onCancel}
                disabled={isLoading}
            >
                {cancelText}
            </button>
            <button
                className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-violet-400 transition-all duration-200 font-medium flex items-center"
                onClick={onSave}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                        {loadingText}
                    </>
                ) : (
                    saveText
                )}
            </button>
        </div>
    );
};

export default ModalButtons; 
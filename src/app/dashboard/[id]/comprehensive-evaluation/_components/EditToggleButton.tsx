import { FC } from "react";

interface EditToggleButtonProps {
    isEditing: boolean;
    isUpdating: boolean;
    hasContent?: boolean;
    onToggle: () => void;
    editText?: string;
    completeText?: string;
    updateText?: string;
    createText?: string;
}

const EditToggleButton: FC<EditToggleButtonProps> = ({
    isEditing,
    isUpdating,
    hasContent = false,
    onToggle,
    editText = "수정",
    completeText = "완료",
    updateText = "저장 중...",
    createText = "작성하기"
}) => {
    const getButtonStyle = () => {
        if (isUpdating) {
            return 'bg-gray-100 text-gray-400 cursor-not-allowed';
        }
        if (isEditing) {
            return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
        }
        return 'bg-violet-100 text-violet-700 hover:bg-violet-200';
    };

    const getButtonText = () => {
        if (isUpdating) {
            return (
                <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                    {updateText}
                </>
            );
        }
        if (isEditing) {
            return <>{completeText}</>;
        }
        if (hasContent) {
            return <>{editText}</>;
        }
        return <>{createText}</>;
    };

    return (
        <button
            onClick={onToggle}
            disabled={isUpdating}
            className={`px-3 py-1 text-sm font-semibold rounded flex items-center gap-1 transition-colors ${getButtonStyle()}`}
        >
            {getButtonText()}
        </button>
    );
};

export default EditToggleButton; 
import { FC, useRef } from "react";

interface EditableEvaluationTextProps {
    isEditing: boolean;
    content: string;
    placeholder?: string;
    onContentChange: (content: string) => void;
}

const EditableEvaluationText: FC<EditableEvaluationTextProps> = ({
    isEditing,
    content,
    placeholder = "내용을 입력하세요...",
    onContentChange,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(e.currentTarget.value);
    };

    if (isEditing) {
        return (
            <textarea
                ref={textareaRef}
                className="w-full rounded-md focus:outline-none resize-none"
                placeholder={placeholder}
                value={content}
                onChange={handleChange}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                onFocus={(e) => e.currentTarget.focus({ preventScroll: true })}
                style={{ height: "1000px", overflowY: "auto" }}
            />
        );
    }

    return (
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {content || "학생부 종합 의견 문구가 없습니다."}
        </div>
    );
};

export default EditableEvaluationText;
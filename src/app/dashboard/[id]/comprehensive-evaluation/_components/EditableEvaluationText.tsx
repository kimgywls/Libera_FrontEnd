import { FC, useRef, useEffect } from "react";

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
    onContentChange
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [isEditing, content]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        onContentChange(target.value);
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
    };

    if (isEditing) {
        return (
            <textarea
                ref={textareaRef}
                className="w-full p-1 rounded-md focus:outline-none transition-all resize-none overflow-hidden"
                placeholder={placeholder}
                value={content}
                onChange={handleChange}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
            />
        );
    }

    return (
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {content || '학생부 종합 의견 문구가 없습니다.'}
        </div>
    );
};

export default EditableEvaluationText; 
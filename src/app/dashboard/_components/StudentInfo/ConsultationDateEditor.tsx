import { FC } from 'react';

interface ConsultationDateEditorProps {
    editMode: boolean;
    inputDate: string;
    setInputDate: (v: string) => void;
    onSave: () => void;
    onCancel: () => void;
    displayDate: string;
    isUpdating?: boolean;
}

const ConsultationDateEditor: FC<ConsultationDateEditorProps> = ({
    editMode, inputDate, setInputDate, onSave, onCancel, displayDate, isUpdating = false
}) => (
    <>
        {editMode ? (
            <>
                <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={inputDate}
                    onChange={e => setInputDate(e.target.value)}
                />
                <button
                    className="px-3 py-2 text-gray-500 bg-gray-300 hover:bg-gray-400 rounded-lg"
                    onClick={onCancel}
                    disabled={isUpdating}
                >
                    <span>취소</span>
                </button>
                <button
                    className={`px-3 py-2 rounded-lg ${isUpdating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-white bg-blue-400 hover:bg-blue-500'}`}
                    onClick={onSave}
                    disabled={isUpdating}
                >
                    <span>{isUpdating ? '저장 중...' : '저장'}</span>
                </button>
            </>
        ) : (
            <span className="text-lg font-semibold text-gray-900">{displayDate}</span>
        )}
    </>
);

export default ConsultationDateEditor; 
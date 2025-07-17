import { FC } from 'react';

interface ConsultationDateEditorProps {
    editMode: boolean;
    inputDate: string;
    setInputDate: (v: string) => void;
    onSave: () => void;
    onCancel: () => void;
    displayDate: string;
}

const ConsultationDateEditor: FC<ConsultationDateEditorProps> = ({
    editMode, inputDate, setInputDate, onSave, onCancel, displayDate
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
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" onClick={onSave}><span>저장</span></button>
                <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg" onClick={onCancel}><span>취소</span></button>
            </>
        ) : (
            <span className="text-lg font-semibold text-gray-900">{displayDate}</span>
        )}
    </>
);

export default ConsultationDateEditor; 
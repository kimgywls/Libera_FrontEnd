import { FC, useRef } from 'react';

interface DesiredSchoolFormProps {
    newSchoolValue: string;
    setNewSchoolValue: (v: string) => void;
    newDepartmentValue: string;
    setNewDepartmentValue: (v: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

const DesiredSchoolForm: FC<DesiredSchoolFormProps> = ({
    newSchoolValue, setNewSchoolValue, newDepartmentValue, setNewDepartmentValue, onSave, onCancel
}) => {
    const isSubmitting = useRef(false);

    const handleSave = () => {
        if (isSubmitting.current) return;
        isSubmitting.current = true;
        onSave();
        setTimeout(() => {
            isSubmitting.current = false;
        }, 100);
    };

    return (
        <div className="bg-white rounded-lg p-4 mb-3">
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대학명</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-gray-500 outline-none"
                        value={newSchoolValue}
                        onChange={e => setNewSchoolValue(e.target.value)}
                        placeholder="예: 서울대학교"
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">학과명</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-gray-500 outline-none"
                        value={newDepartmentValue}
                        onChange={e => setNewDepartmentValue(e.target.value)}
                        placeholder="예: 컴퓨터공학과"
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSave();
                            }
                            if (e.key === 'Escape') onCancel();
                        }}
                    />
                </div>
                <div className="flex space-x-2">
                    <button type="button" className="flex items-center space-x-1 px-3 py-1.5 text-red-600 rounded-lg hover:bg-red-200 transition-colors" onClick={handleSave}>추가</button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors" onClick={onCancel}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default DesiredSchoolForm; 
import { Check } from 'lucide-react';
import { HighschoolTypeEnum } from '@/app/types/checklist';
import { AlertModal } from '@/app/components/modal/AlertModal';

const SCHOOL_TYPES = Object.values(HighschoolTypeEnum);

interface ChecklistMetaSectionProps {
    schoolType: HighschoolTypeEnum | '';
    setSchoolType: (type: HighschoolTypeEnum | '') => void;
    curriculumCompleted: string;
    setCurriculumCompleted: (value: string) => void;
    meta: any;
    alert: {
        open: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
    };
    handleSave: () => void;
}

export default function ChecklistMetaSection({
    schoolType,
    setSchoolType,
    curriculumCompleted,
    setCurriculumCompleted,
    meta,
    alert,
    handleSave,
}: ChecklistMetaSectionProps) {
    return (
        <section className="flex flex-col w-full justify-between items-end border border-gray-200 rounded-xl p-4 bg-white shadow-sm text-sm text-black">
            <div className="flex flex-row w-full mb-2 justify-between items-center">
                <h3 className="text-2xl font-bold mb-1 text-gray-900">학생 정보 체크</h3>
                <div className="flex justify-end h-10">
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-violet-500 text-sm rounded-md hover:bg-violet-600 hover:text-white transition"
                    >
                        저장
                    </button>
                </div>
            </div>

            <div className="flex flex-row w-full justify-between items-center gap-5">
                <div className="space-y-2 w-1/2 bg-gray-50 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-gray-800 flex items-center gap-1">
                        <Check className="w-4 h-4 text-violet-600" /> 고교 구분
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-4">
                        {SCHOOL_TYPES.map((type) => (
                            <label
                                key={type}
                                className={`flex items-center justify-center px-3 py-1.5 rounded-md border cursor-pointer transition ${schoolType === type
                                    ? 'bg-violet-600 text-white border-violet-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-violet-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="schoolType"
                                    value={type}
                                    checked={schoolType === type}
                                    onChange={() => setSchoolType(type as HighschoolTypeEnum)}
                                    className="hidden"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                    {/* 저장된 값 표시 */}
                    {meta && meta.highschool_type && (
                        <div className="mt-2 text-xs text-gray-500">저장됨: {meta.highschool_type}</div>
                    )}
                </div>

                <div className="space-y-2 w-1/2 bg-gray-50 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-gray-800 flex items-center gap-1">
                        <Check className="w-4 h-4 text-violet-600" /> 개설 교과목은 위계에 맞게 이수하였는가?
                    </h3>
                    <div className="flex gap-4 px-5">
                        {['YES', 'NO'].map((value) => (
                            <label
                                key={value}
                                className={`flex items-center justify-center px-4 py-1.5 rounded-md border cursor-pointer transition ${curriculumCompleted === value
                                    ? 'bg-violet-600 text-white border-violet-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-violet-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="curriculumCompleted"
                                    value={value}
                                    checked={curriculumCompleted === value}
                                    onChange={() => setCurriculumCompleted(value)}
                                    className="hidden"
                                />
                                {value}
                            </label>
                        ))}
                    </div>
                    {/* 저장된 값 표시 */}
                    {meta && meta.is_subject_sequence_completed !== null && meta.is_subject_sequence_completed !== undefined && (
                        <div className="mt-2 text-xs text-gray-500">저장됨: {meta.is_subject_sequence_completed ? 'YES' : 'NO'}</div>
                    )}
                </div>
            </div>
            <AlertModal
                open={alert.open}
                title={alert.title}
                description={alert.description}
                onConfirm={alert.onConfirm}
                onCancel={alert.onConfirm}
            />
        </section>
    );
}

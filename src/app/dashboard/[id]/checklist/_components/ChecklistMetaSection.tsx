import { Check } from 'lucide-react';

import { ChecklistMetaResponse, HighschoolTypeEnum } from '@/app/types/checklist';

import { AlertModal } from '@/app/components/modal/AlertModal';

const SCHOOL_TYPES = Object.values(HighschoolTypeEnum);

interface ChecklistMetaSectionProps {
    schoolType: HighschoolTypeEnum | '';
    setSchoolType: (type: HighschoolTypeEnum | '') => void;
    curriculumCompleted: string;
    setCurriculumCompleted: (value: string) => void;
    meta: ChecklistMetaResponse;
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
                    {!meta && (
                        <button
                            onClick={handleSave}
                            className="inline-flex items-center gap-1.5 px-5 py-1.5 bg-violet-500 text-white font-semibold rounded-md hover:bg-violet-600 transition"
                        >
                            저장
                        </button>
                    )}
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
                                className={`flex items-center justify-center px-3 py-1.5 rounded-md border cursor-pointer transition ${(
                                    meta
                                        ? meta.highschool_type === type
                                        : schoolType === type
                                )
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
                </div>

                <div className="space-y-2 w-1/2 bg-gray-50 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-gray-800 flex items-center gap-1">
                        <Check className="w-4 h-4 text-violet-600" /> 개설 교과목은 위계에 맞게 이수하였는가?
                    </h3>
                    <div className="flex gap-4 px-5">
                        {['YES', 'NO'].map((value) => (
                            <label
                                key={value}
                                className={`flex items-center justify-center px-4 py-1.5 rounded-md border cursor-pointer transition ${(
                                    meta
                                        ? (meta.is_subject_sequence_completed !== null && meta.is_subject_sequence_completed !== undefined &&
                                            ((meta.is_subject_sequence_completed && value === 'YES') || (!meta.is_subject_sequence_completed && value === 'NO')))
                                        : curriculumCompleted === value
                                )
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
                </div>
            </div>
            <AlertModal
                open={alert.open}
                title={alert.title}
                description={`학생의 고교 구분과 개설 교과목 이수 여부를 성공적으로 저장 했습니다`}
                onConfirm={alert.onConfirm}
                onCancel={alert.onConfirm}
            />
        </section>
    );
}

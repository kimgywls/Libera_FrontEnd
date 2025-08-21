import { FC } from 'react';
import { Calendar, Edit3, Plus } from 'lucide-react';

import { DetailedAbility } from '@/app/types/extracurricular';

import DataState from '../../../_components/DataState';
import Section from '../../../_components/Section';

interface DetailedAbilitiesSectionProps {
    abilities: DetailedAbility[];
    onEdit: (ability: DetailedAbility) => void;
    onAdd: (type: 'detailed', grade: number) => void;
}

const DetailedAbilitiesSection: FC<DetailedAbilitiesSectionProps> = ({
    abilities,
    onEdit,
    onAdd
}) => {
    // 학년별로 그룹화
    const abilitiesByGrade = abilities.reduce((acc, ability) => {
        if (!acc[ability.grade]) acc[ability.grade] = [];
        acc[ability.grade].push(ability);
        return acc;
    }, {} as Record<number, DetailedAbility[]>);

    const formatSemester = (semester: string | number | null | undefined) => {
        if (semester == null || semester === "") return "선택하세요";

        if (typeof semester === 'string' && semester.includes("학기")) return semester;

        const semesterDisplayMap = {
            "1": "1학기",
            "2": "2학기",
            "1,2": "1,2학기",
            "": "선택하세요"
        };

        return semesterDisplayMap[semester as keyof typeof semesterDisplayMap] || semester;
    };


    return (
        <Section title="세부능력 및 특기사항">
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={abilities.length === 0}
                emptyMessage="등록된 세부능력 및 특기사항이 없습니다."
            >
                <div className="space-y-6 ml-2">
                    {[1, 2, 3].map(grade => (
                        <div key={grade} className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    {grade}학년
                                </h4>
                                <button
                                    className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
                                    onClick={() => onAdd('detailed', grade)}
                                >
                                    <Plus className="w-3 h-3" />
                                    추가
                                </button>
                            </div>
                            <div className="space-y-4">
                                {(abilitiesByGrade[grade] || []).map((ability: DetailedAbility) => (
                                    <div
                                        key={ability.id}
                                        className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-neutral-400 rounded-full " />
                                                <h5 className="font-semibold text-gray-900 text-lg">{ability.subject}</h5>
                                                <span className="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-200 rounded text-sm font-medium">
                                                    {formatSemester(ability.semester)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => onEdit(ability)}
                                                    className="p-1.5 text-sm font-semibold bg-violet-100 text-violet-700 rounded hover:bg-violet-200"
                                                    title="수정"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed ml-2">{ability.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </DataState>

            {/* 완전히 빈 상태일 때만 추가 버튼 표시 */}
            {abilities.length === 0 && (
                <div className="mt-6 text-center">
                    <div className="flex justify-center gap-3">
                        {[1, 2, 3].map(grade => (
                            <button
                                key={grade}
                                onClick={() => onAdd('detailed', grade)}
                                className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                {grade}학년 세특 추가
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </Section>
    );
};

export default DetailedAbilitiesSection; 
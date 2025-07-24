import { FC } from 'react';
import { Calendar, Edit3 } from 'lucide-react';

import { DetailedAbility } from '@/app/types/extracurricular';

import DataState from '../../../_components/DataState';
import Section from '../../../_components/Section';

interface DetailedAbilitiesSectionProps {
    abilities: DetailedAbility[];
    onEdit: (ability: DetailedAbility) => void;
}

const DetailedAbilitiesSection: FC<DetailedAbilitiesSectionProps> = ({
    abilities,
    onEdit
}) => {
    // 학년별로 그룹화
    const abilitiesByGrade = abilities.reduce((acc, ability) => {
        if (!acc[ability.grade]) acc[ability.grade] = [];
        acc[ability.grade].push(ability);
        return acc;
    }, {} as Record<number, DetailedAbility[]>);

    return (
        <Section title="세부능력 및 특기사항">
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={abilities.length === 0}
                emptyMessage="등록된 세부능력 및 특기사항이 없습니다."
            >
                <div className="space-y-6 ml-2">
                    {Object.entries(abilitiesByGrade)
                        .sort(([a], [b]) => Number(a) - Number(b))
                        .map(([grade, abilities]) => (
                            <div key={grade} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                                <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    {grade}학년
                                </h4>
                                <div className="space-y-4">
                                    {abilities.map((ability: DetailedAbility) => (
                                        <div
                                            key={ability.id}
                                            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 bg-violet-400 rounded-full " />
                                                    <h5 className="font-semibold text-gray-900 text-lg">{ability.subject}</h5>
                                                    <span className="px-2 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded text-sm font-medium">
                                                        {ability.semester}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => onEdit(ability)}
                                                        className="p-1 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded transition-colors"
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
        </Section>
    );
};

export default DetailedAbilitiesSection; 
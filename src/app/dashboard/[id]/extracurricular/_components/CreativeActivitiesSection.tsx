import { FC } from 'react';
import { Calendar, Edit3, Plus } from 'lucide-react';

import { CreativeActivity } from '@/app/types/extracurricular';

import DataState from '../../../_components/DataState';
import Section from '../../../_components/Section';

interface CreativeActivitiesSectionProps {
    activities: CreativeActivity[];
    onEdit: (activity: CreativeActivity) => void;
    onAdd: (type: 'creative', grade: number) => void;
}

const CreativeActivitiesSection: FC<CreativeActivitiesSectionProps> = ({
    activities,
    onEdit,
    onAdd
}) => {
    const getAreaColor = (area: string) => {
        const colors: Record<string, { bg: string; hover: string; text: string; border: string; icon: string }> = {
            '자율활동': {
                bg: 'bg-green-50',
                hover: 'hover:bg-green-100 hover:text-green-600',
                text: 'text-green-700',
                border: 'border-green-200',
                icon: 'bg-green-400'
            },
            '동아리활동': {
                bg: 'bg-blue-50',
                hover: 'hover:bg-blue-100 hover:text-blue-600',
                text: 'text-blue-700',
                border: 'border-blue-200',
                icon: 'bg-blue-400'
            },
            '진로활동': {
                bg: 'bg-orange-50',
                hover: 'hover:bg-orange-100 hover:text-orange-600',
                text: 'text-orange-700',
                border: 'border-orange-200',
                icon: 'bg-orange-400'
            },
            '봉사활동': {
                bg: 'bg-orange-50',
                hover: 'hover:bg-orange-100 hover:text-orange-600',
                text: 'text-orange-700',
                border: 'border-orange-200',
                icon: 'bg-orange-400'
            },
            '기타': {
                bg: 'bg-gray-50',
                hover: 'hover:bg-gray-100 hover:text-gray-700',
                text: 'text-gray-700',
                border: 'border-gray-200',
                icon: 'bg-gray-400'
            }
        };
        return colors[area] || colors['기타'];
    };

    // 학년별로 그룹화
    const activitiesByGrade = activities.reduce((acc, activity) => {
        if (!acc[activity.grade]) acc[activity.grade] = {};
        if (!acc[activity.grade][activity.area]) acc[activity.grade][activity.area] = [];
        acc[activity.grade][activity.area].push(activity);
        return acc;
    }, {} as Record<number, Record<string, CreativeActivity[]>>);

    return (
        <Section title="창의체험활동">
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={activities.length === 0}
                emptyMessage="등록된 창의체험활동이 없습니다."
            >
                <div className="space-y-4 ml-2">
                    {[1, 2, 3].map(grade => (
                        <div key={grade} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    {grade}학년
                                </h4>
                                <button
                                    className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
                                    onClick={() => onAdd('creative', grade)}
                                >
                                    <Plus className="w-3 h-3" />
                                    추가
                                </button>
                            </div>
                            <div className="space-y-4">
                                {activitiesByGrade[grade] && Object.entries(activitiesByGrade[grade]).map(([area, activities]) => (
                                    <div key={area} className="space-y-3">
                                        {activities.map((activity: CreativeActivity) => {
                                            const color = getAreaColor(area);
                                            return (
                                                <div
                                                    key={activity.id}
                                                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className={`flex items-center gap-3 text-lg font-semibold`}>
                                                                    <div className={`w-3 h-3 rounded-full ${color.icon}`} /> {area}
                                                                </span>
                                                                <button
                                                                    onClick={() => onEdit(activity)}
                                                                    className="p-1.5 text-sm font-semibold bg-violet-100 text-violet-700 rounded hover:bg-violet-200"
                                                                    title="수정"
                                                                >
                                                                    <Edit3 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                            <p className="text-gray-700 leading-relaxed">{activity.details}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </DataState>

            {/* 완전히 빈 상태일 때만 추가 버튼 표시 */}
            {activities.length === 0 && (
                <div className="mt-6 text-center">
                    <div className="flex justify-center gap-3">
                        {[1, 2, 3].map(grade => (
                            <button
                                key={grade}
                                onClick={() => onAdd('creative', grade)}
                                className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                {grade}학년 창의체험활동 추가
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </Section>
    );
};

export default CreativeActivitiesSection; 
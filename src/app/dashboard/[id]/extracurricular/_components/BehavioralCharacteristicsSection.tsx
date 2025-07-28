import { FC } from 'react';
import { Calendar, Edit3, Plus } from 'lucide-react';

import { BehavioralCharacteristic } from '@/app/types/extracurricular';

import DataState from '../../../_components/DataState';
import Section from '../../../_components/Section';

interface BehavioralCharacteristicsSectionProps {
    characteristics: BehavioralCharacteristic[];
    onEdit: (characteristic: BehavioralCharacteristic) => void;
    onAdd: (type: 'behavioral', grade: number) => void;
}

const BehavioralCharacteristicsSection: FC<BehavioralCharacteristicsSectionProps> = ({
    characteristics,
    onEdit,
    onAdd
}) => {
    // 학년별 그룹화
    const characteristicsByGrade = characteristics.reduce((acc, c) => {
        if (!acc[c.grade]) acc[c.grade] = [];
        acc[c.grade].push(c);
        return acc;
    }, {} as Record<number, BehavioralCharacteristic[]>);

    return (
        <Section title="행동특성 및 종합의견">
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={characteristics.length === 0}
                emptyMessage="등록된 행동특성 및 종합의견이 없습니다."
            >
                <div className="space-y-4 ml-2">
                    {[1, 2, 3].map(grade => (
                        <div key={grade} className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    {grade}학년
                                </h4>
                                <button
                                    className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
                                    onClick={() => onAdd('behavioral', grade)}
                                >
                                    <Plus className="w-3 h-3" />
                                    추가
                                </button>
                            </div>
                            {(characteristicsByGrade[grade] || []).map((characteristic: BehavioralCharacteristic) => (
                                <div key={characteristic.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-2">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-rose-400 rounded-full " />
                                            <span className="font-semibold text-gray-900 text-lg">{characteristic.grade}학년 종합의견</span>
                                        </div>
                                        <button
                                            onClick={() => onEdit(characteristic)}
                                            className="p-1.5 text-sm font-semibold bg-violet-100 text-violet-700 rounded hover:bg-violet-200"
                                            title="수정"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed ">{characteristic.content}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </DataState>

            {/* 완전히 빈 상태일 때만 추가 버튼 표시 */}
            {characteristics.length === 0 && (
                <div className="mt-6 text-center">
                    <div className="flex justify-center gap-3">
                        {[1, 2, 3].map(grade => (
                            <button
                                key={grade}
                                onClick={() => onAdd('behavioral', grade)}
                                className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                {grade}학년 행동특성 추가
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </Section>
    );
};

export default BehavioralCharacteristicsSection; 
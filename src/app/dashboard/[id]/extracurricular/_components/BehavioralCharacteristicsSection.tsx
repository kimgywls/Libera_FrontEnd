import { FC } from 'react';
import { Calendar, Edit3 } from 'lucide-react';

import { BehavioralCharacteristic } from '@/app/types/extracurricular';

import DataState from '../../../_components/DataState';
import Section from '../../../_components/Section';

interface BehavioralCharacteristicsSectionProps {
    characteristics: BehavioralCharacteristic[];
    onEdit: (characteristic: BehavioralCharacteristic) => void;
}

const BehavioralCharacteristicsSection: FC<BehavioralCharacteristicsSectionProps> = ({
    characteristics,
    onEdit
}) => {
    return (
        <Section title="행동특성 및 종합의견">
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={characteristics.length === 0}
                emptyMessage="등록된 행동특성 및 종합의견이 없습니다."
            >
                <div className="space-y-4 ml-2">
                    {characteristics.map((characteristic: BehavioralCharacteristic) => (
                        <div key={characteristic.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    {characteristic.grade}학년 종합의견
                                </h4>
                                <button
                                    onClick={() => onEdit(characteristic)}
                                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors"
                                    title="수정"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed ">{characteristic.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DataState>
        </Section>
    );
};

export default BehavioralCharacteristicsSection; 
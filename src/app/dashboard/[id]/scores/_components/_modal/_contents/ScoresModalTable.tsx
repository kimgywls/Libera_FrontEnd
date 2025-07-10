import type { FC } from 'react';
import type { ScoreForm } from '@/app/types/score';
import {
    CATEGORY_OPTIONS,
    CATEGORY_COLUMNS,
    ALL_COLUMNS,
} from '@/app/constants';
import ScoresModalTableBody from './ScoresModalTableBody';

interface ScoresModalTableProps {
    scoresForm: ScoreForm[];
    onChange: (idx: number, field: keyof ScoreForm, value: ScoreForm[keyof ScoreForm]) => void;
    onAddSubject: () => void;
}

const ScoresModalTable: FC<ScoresModalTableProps> = ({ scoresForm, onChange, onAddSubject }) => {
    function getMinWidth(key: string) {
        if ([
            'credit_hours', 'raw_score', 'subject_average', 'standard_deviation', 'student_count', 'grade_rank'
        ].includes(key)) return 'min-w-14';
        if (key === 'achievement_distribution') return 'min-w-40';
        return 'min-w-28';
    }

    function getDisplayValue(value: unknown): string {
        if (typeof value === 'object' && value !== null) {
            return Object.entries(value as Record<string, unknown>)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ');
        }
        return value !== undefined && value !== null && value !== '' ? String(value) : '';
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full bg-white overflow-hidden border-b border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b-2 border-gray-200">
                            {ALL_COLUMNS.map(key => {
                                const col = Object.values(CATEGORY_COLUMNS).flat().find(c => c.key === key);
                                return (
                                    <th key={key} className={`px-4 py-2 text-left font-semibold text-gray-700 tracking-wider border-r border-gray-200 ${getMinWidth(key)}`}>
                                        {col?.label || key}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <ScoresModalTableBody
                            sortedForm={scoresForm}
                            onChange={onChange}
                            getMinWidth={getMinWidth}
                            getDisplayValue={getDisplayValue}
                            ALL_COLUMNS={ALL_COLUMNS}
                            CATEGORY_COLUMNS={CATEGORY_COLUMNS}
                            CATEGORY_OPTIONS={CATEGORY_OPTIONS}
                        />
                    </tbody>
                </table>
            </div>
            {/* 과목 추가 버튼 */}
            <div className="mt-2 ml-5">
                <button
                    className="inline-flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                    onClick={onAddSubject}
                >
                    + 과목 추가
                </button>
            </div>
        </div>
    );
};

export default ScoresModalTable; 
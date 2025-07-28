import type { FC } from 'react';
import { Trash2 } from 'lucide-react';

import type { CategoryOption } from '@/app/constants';
import type { ScoreForm } from '@/app/types/score';

interface ScoresModalTableBodyProps {
    sortedForm: ScoreForm[];
    onChange: (idx: number, field: keyof ScoreForm, value: ScoreForm[keyof ScoreForm]) => void;
    onDelete?: (idx: number) => void;
    getMinWidth: (key: string) => string;
    getDisplayValue: (value: ScoreForm[keyof ScoreForm]) => string;
    ALL_COLUMNS: string[];
    CATEGORY_COLUMNS: Record<string, ReadonlyArray<{ key: keyof ScoreForm; label: string }>>;
    CATEGORY_OPTIONS: readonly CategoryOption[];
}

const ScoresModalTableBody: FC<ScoresModalTableBodyProps> = ({
    sortedForm,
    onChange,
    onDelete,
    getMinWidth,
    getDisplayValue,
    ALL_COLUMNS,
    CATEGORY_COLUMNS,
    CATEGORY_OPTIONS,
}) => {
    return (
        <>
            {sortedForm.map((row, idx) => {
                const columns = CATEGORY_COLUMNS[row.subject_type as keyof typeof CATEGORY_COLUMNS];
                return (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150 text-black">
                        {ALL_COLUMNS.map((key) => {
                            const col = columns.find((c) => c.key === key);
                            if (!col)
                                return (
                                    <td
                                        key={key}
                                        className={`px-4 py-3 border-r border-gray-200 bg-gray-50 ${getMinWidth(key)}`}
                                    />
                                );
                            switch (key) {
                                case 'subject_type':
                                    return (
                                        <td key={key} className={`px-4 py-3 border-r border-gray-200 ${getMinWidth(key)}`}>
                                            <select
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                                value={row.subject_type ?? ''}
                                                onChange={e => onChange(idx, 'subject_type', e.target.value)}
                                            >
                                                {CATEGORY_OPTIONS.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    );
                                case 'achievement_level':
                                    return (
                                        <td key={key} className={`px-4 py-3 border-r border-gray-200 ${getMinWidth(key)}`}>
                                            <select
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                value={row.achievement_level || ''}
                                                onChange={e => onChange(idx, 'achievement_level', e.target.value)}
                                            >
                                                <option value="">선택</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="P">P</option>
                                            </select>
                                        </td>
                                    );
                                case 'achievement_distribution':
                                    return (
                                        <td key={key} className={`px-4 py-3 border-r border-gray-200 ${getMinWidth(key)}`}>
                                            <input
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                                placeholder="성취도별 분포 비율"
                                                value={
                                                    typeof row.achievement_distribution === 'object' &&
                                                        row.achievement_distribution !== null
                                                        ? Object.entries(row.achievement_distribution)
                                                            .map(([k, v]) => `${k}: ${v}`)
                                                            .join(', ')
                                                        : row.achievement_distribution || ''
                                                }
                                                onChange={e =>
                                                    onChange(idx, 'achievement_distribution', e.target.value)
                                                }
                                            />
                                        </td>
                                    );
                                case 'standard_deviation':
                                    return (
                                        <td key={key} className={`px-4 py-3 border-r border-gray-200 ${getMinWidth(key)}`}>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                                placeholder="표준편차"
                                                value={row.standard_deviation ?? ''}
                                                onChange={e => onChange(idx, 'standard_deviation', e.target.value)}
                                            />
                                        </td>
                                    );
                                case 'raw_score':
                                    return (
                                        <td key={key} className={`px-4 py-3 border-r border-gray-200 ${getMinWidth(key)}`}>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                                placeholder="원점수"
                                                value={row.raw_score ?? ''}
                                                onChange={e => onChange(idx, 'raw_score', e.target.value)}
                                            />
                                        </td>
                                    );
                                case 'subject_average':
                                    return (
                                        <td key={key} className={`px-4 py-3 border-r border-gray-200 ${getMinWidth(key)}`}>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                                placeholder="과목평균"
                                                value={row.subject_average ?? ''}
                                                onChange={e => onChange(idx, 'subject_average', e.target.value)}
                                            />
                                        </td>
                                    );
                                default:
                                    return (
                                        <td key={key} className={`px-4 py-3 border-r border-gray-200 ${getMinWidth(key)}`}>
                                            <input
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                                placeholder={col.label}
                                                value={getDisplayValue(row[key as keyof ScoreForm])}
                                                onChange={e =>
                                                    onChange(
                                                        idx,
                                                        key as keyof ScoreForm,
                                                        e.target.value as ScoreForm[keyof ScoreForm]
                                                    )
                                                }
                                            />
                                        </td>
                                    );
                            }
                        })}
                        {onDelete && (
                            <td className="px-4 py-3 border-r border-gray-200">
                                <button
                                    onClick={() => onDelete(idx)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        )}
                    </tr>
                );
            })}
        </>
    );
};

export default ScoresModalTableBody; 
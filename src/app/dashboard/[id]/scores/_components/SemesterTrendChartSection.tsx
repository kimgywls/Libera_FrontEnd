'use client';

import type { FC } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LabelList,
    ResponsiveContainer,
} from 'recharts';
import { SemesterTrendPeriod, SemesterTrendResponse } from '@/app/types/semesterTrend';
import { SEMESTER_TREND_CATEGORY_LABELS } from '@/app/constants';

const CATEGORY_COLORS: Record<string, string> = {
    overall: '#8884d8',
    main_with_science: '#82ca9d',
    main_with_science_only: '#ff8042',
    main_with_social: '#8dd1e1',
    math_science: '#a4de6c',
    math_english_science: '#d0ed57',
    korean_english_social: '#a28fd0',
    science: '#f9a3a4',
    social: '#ffbb28',
    english: '#00C49F',
    math: '#EC4899',
    korean: '#FF6666',
};

const ALL_SEMESTERS = [
    { label: '1-1', grade: 1, semester: 1 },
    { label: '1-2', grade: 1, semester: 2 },
    { label: '2-1', grade: 2, semester: 1 },
    { label: '2-2', grade: 2, semester: 2 },
    { label: '3-1', grade: 3, semester: 1 },
];

interface SemesterTrendChartSectionProps {
    semesterTrend?: SemesterTrendResponse;
    isLoading: boolean;
    isError: boolean;
}

interface CategoryTrendChartProps {
    categoryId: string;
    categoryName: string;
    data: { semester: string; barValue: number | null; originalValue: number | null }[];
}

const CategoryTrendChart: FC<CategoryTrendChartProps> = ({ categoryId, categoryName, data }) => (
    <div className="bg-white rounded-lg shadow pl-2 pt-4 pb-2">
        <div className="font-bold mb-2 ml-2 text-lg text-gray-800 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: CATEGORY_COLORS[categoryId] || '#ff7675' }} />
            {SEMESTER_TREND_CATEGORY_LABELS[categoryId] || categoryName} 석차 등급 추이
        </div>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <XAxis dataKey="semester" />
                <YAxis
                    type="number"
                    domain={[5.5, 9]} // 1~5등급만 보이게 설정
                    tickFormatter={(v) => `${10 - v}등급`}
                    tickCount={5}
                    allowDecimals={false}
                />
                <Tooltip
                    labelFormatter={(label: string) => {
                        const [grade, semester] = label.split('-');
                        return `${grade}학년 ${semester}학기`;
                    }}
                    formatter={(
                        _v: number,
                        _name: string,
                        props: { payload?: { originalValue?: number | null } }
                    ) => {
                        const original = props?.payload?.originalValue;
                        return [
                            original !== undefined && original !== null ? `${original}등급` : '',
                            '',
                        ];
                    }}
                    separator=""
                />
                <Bar dataKey="barValue" fill={CATEGORY_COLORS[categoryId] || '#ff7675'}>
                    <LabelList
                        dataKey="barValue"
                        content={({ x, y, width, index }) => {
                            if (
                                typeof x !== 'number' ||
                                typeof y !== 'number' ||
                                typeof width !== 'number' ||
                                typeof index !== 'number'
                            )
                                return null;
                            const originalValue = data[index]?.originalValue;
                            if (originalValue == null) return null;
                            return (
                                <text
                                    x={x + width / 2}
                                    y={y - 6}
                                    textAnchor="middle"
                                    fill="#444"
                                    fontSize={12}
                                >
                                    {originalValue}등급
                                </text>
                            );
                        }}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const SemesterTrendChartSection: FC<SemesterTrendChartSectionProps> = ({
    semesterTrend,
    isLoading,
    isError,
}) => {
    if (isLoading) return <div className="py-4 text-center text-gray-500">로딩 중...</div>;
    if (isError) return <div className="py-4 text-center text-red-500">석차등급 정보를 불러오는 데 실패했습니다.</div>;
    if (!semesterTrend?.categories) return <div className="py-4 text-center text-gray-400">석차등급 정보가 없습니다.</div>;

    return (
        <div className="grid grid-cols-3 gap-3 mb-6">
            {semesterTrend.categories.map((category) => {
                const periodMap = Object.fromEntries(
                    category.periods.map((data: SemesterTrendPeriod) => [
                        `${data.grade}-${data.semester}`,
                        data.gpa,
                    ])
                );
                const data = ALL_SEMESTERS.map(sem => {
                    const gpa = periodMap[`${sem.grade}-${sem.semester}`];
                    return {
                        semester: `${sem.grade}-${sem.semester}`,
                        barValue: gpa !== undefined && gpa !== null ? 10 - gpa : null,
                        originalValue: gpa ?? null,
                    };
                });
                return (
                    <CategoryTrendChart
                        key={category.id}
                        categoryId={category.id}
                        categoryName={category.name}
                        data={data}
                    />
                );
            })}
        </div>
    );
};

export default SemesterTrendChartSection;

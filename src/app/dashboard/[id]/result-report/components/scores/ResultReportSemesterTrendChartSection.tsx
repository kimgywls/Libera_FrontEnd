'use client';

import type { FC } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LabelList,
} from 'recharts';

import { SEMESTER_TREND_CATEGORY_LABELS } from '@/app/constants';
import { SemesterTrendPeriod, SemesterTrendResponse } from '@/app/types/semesterTrend';
import DataState from '@/app/dashboard/_components/DataState';
import ResultReportSection from '../ResultReportSection';

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
    english: '#00c49f',
    math: '#ec4899',
    korean: '#ff6666',
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
}

interface CategoryTrendChartProps {
    categoryId: string;
    categoryName: string;
    data: { semester: string; barValue: number | null; originalValue: number | null }[];
    chartId: string;
}

const CategoryTrendChart: FC<CategoryTrendChartProps> = ({ categoryId, categoryName, data, chartId }) => (
    <div id={chartId} className="rounded-lg pl-1 pt-2 pb-1 pr-1" style={{ backgroundColor: '#ffffff' }}>
        <div className="font-bold mb-1 ml-1 text-xs flex items-center" style={{ color: '#1e293b' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: CATEGORY_COLORS[categoryId] || '#6b7280' }} />
            <span style={{ color: '#374151' }} className="text-xs">
                {SEMESTER_TREND_CATEGORY_LABELS[categoryId] || categoryName}
            </span>
        </div>
        <BarChart width={250} height={175} data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis dataKey="semester" />
            <YAxis
                type="number"
                domain={[5.5, 9]} // 1~5등급만 보이게 설정
                tickFormatter={(v) => `${10 - v}`}
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
            <Bar dataKey="barValue" fill={CATEGORY_COLORS[categoryId] || '#6b7280'}>
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
                                y={y - 4}
                                textAnchor="middle"
                                style={{ fill: '#444444', fontSize: 9 }}
                            >
                                {originalValue}등급
                            </text>
                        );
                    }}
                />
            </Bar>
        </BarChart>
    </div>
);

const ResultReportSemesterTrendChartSection: FC<SemesterTrendChartSectionProps> = ({
    semesterTrend,
}) => {
    const isEmpty = !semesterTrend?.categories || semesterTrend.categories.length === 0;

    return (
        <ResultReportSection title="석차등급 추이 분석">
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={isEmpty}
                loadingMessage="석차등급 정보를 불러오는 중..."
                errorMessage="석차등급 정보를 불러오는 데 실패했습니다."
                emptyMessage="석차등급 정보가 없습니다."
            >
                <div id="semester-trend-charts" className="grid grid-cols-4 gap-2">
                    {semesterTrend?.categories.map((category) => {
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
                                chartId={`chart-${category.id}`}
                            />
                        );
                    })}
                </div>
            </DataState>
        </ResultReportSection>
    );
};

export default ResultReportSemesterTrendChartSection;

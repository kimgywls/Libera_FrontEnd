import { FC } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    LabelList,
    Cell,
    ReferenceLine,
    Legend,
} from "recharts";
import type { LabelProps } from "recharts";

import { ChecklistDetailedResultResponse } from "@/app/types/checklist";
import ResultReportSection from "../ResultReportSection";

interface ChecklistScoreChartProps {
    data: ChecklistDetailedResultResponse | undefined;
}

const CATEGORY_COLORS: Record<string, string> = {
    "학업역량": "#a28fd0",
    "진로역량": "#8dd1e1",
    "공동체역량": "#f9a3a4",
};

const ResultReportChecklistScoreChart: FC<ChecklistScoreChartProps> = ({ data }) => {

    // Bar chart용 데이터 구성 - 안전한 체크 추가
    const chartData = data?.categories?.flatMap(cat =>
        cat.sub_categories?.map(sub => ({
            main: cat.main_category_name,
            sub: sub.sub_category_name,
            score: sub.score,
        })) || []
    ) || [];

    const uniqueMainCategories = [...new Set(chartData.map(d => d.main))];

    // 데이터가 없는 경우 추가 처리
    if (!data?.categories || data.categories.length === 0 || chartData.length === 0) {
        return (
            <div id="checklist-score-chart" className="rounded-2xl pt-6 border" style={{ backgroundColor: '#ffffff', borderColor: '#f3f4f6' }}>
                <div className="mb-8 ml-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>평가요소별 점수</h3>
                    <p className="text-sm" style={{ color: '#6b7280' }}>각 하위 카테고리별 점수를 확인하세요</p>
                </div>
                <div className="text-center py-8">
                    <p style={{ color: '#6b7280' }}>평가 데이터가 없습니다.</p>
                </div>
            </div>
        );
    }

    // 커스텀 Legend 렌더러
    const renderCustomLegend = () => (
        <div className="flex gap-6 justify-center flex-wrap">
            {uniqueMainCategories.map(main => (
                <div key={main} className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[main] || '#6b7280' }}
                    />
                    <span className="text-sm font-medium" style={{ color: '#374151' }}>{main}</span>
                </div>
            ))}
        </div>
    );

    // 커스텀 라벨 렌더러
    const renderCustomLabel = (props: LabelProps) => {
        const { x = 0, y = 0, width = 0, value = 0 } = props;
        const xNum = typeof x === "number" ? x : parseFloat(x || "0");
        const yNum = typeof y === "number" ? y : parseFloat(y || "0");
        const widthNum = typeof width === "number" ? width : parseFloat(width || "0");
        return (
            <text
                x={xNum + widthNum / 2}
                y={yNum - 5}
                textAnchor="middle"
                className="fill-gray-700 text-xs font-medium"
            >
                {typeof value === "number" ? value.toFixed(1) : value}
            </text>
        );
    };

    // X축 멀티라인 tick
    const renderTick = ({ x = 0, y = 0, payload }: { x?: number; y?: number; payload: { value: string } }) => {
        const words = payload.value.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        let isFirstLine = true;

        for (const word of words) {
            if (isFirstLine) {
                currentLine += word + ' ';
                isFirstLine = false;
            } else {
                if ((currentLine + word).length > 6) {
                    lines.push(currentLine.trim());
                    currentLine = word + ' ';
                } else {
                    currentLine += word + ' ';
                }
            }
        }
        if (currentLine.trim()) lines.push(currentLine.trim());

        return (
            <text
                x={x}
                y={y + 10}
                textAnchor="middle"
                fill="#6b7280"
                fontSize={10}
                style={{ letterSpacing: 0 }}
            >
                {lines.map((line, index) => (
                    <tspan key={index} x={x} dy={index === 0 ? 0 : 12}>
                        {line}
                    </tspan>
                ))}
            </text>
        );
    };

    return (
        <ResultReportSection title="평가요소별 점수">
            <div id="checklist-score-chart" className="flex justify-center">
                <BarChart
                    width={1000}
                    height={480}
                    data={chartData}
                    margin={{ top: 30, right: 0, left: -30, bottom: 30 }}
                    barCategoryGap={5}
                >
                    <XAxis
                        dataKey="sub"
                        interval={0}
                        textAnchor="middle"
                        height={80}
                        tickLine={true}
                        axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                        tick={renderTick}
                    />
                    <YAxis
                        domain={[0, 100]}
                        ticks={[0, 20, 40, 60, 80, 100]}
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                    />
                    <Legend content={renderCustomLegend} />
                    {data.categories.map((category, catIndex) => {
                        if (catIndex === data.categories.length - 1) return null;
                        const cumulativeCount = data.categories
                            .slice(0, catIndex + 1)
                            .reduce((sum, cat) => sum + cat.sub_categories.length, 0);
                        return (
                            <ReferenceLine
                                key={`category-divider-${catIndex}`}
                                x={cumulativeCount - 0.5}
                                stroke="#ef4444"
                                strokeWidth={3}
                                strokeDasharray="8 4"
                                opacity={1}
                            />
                        );
                    })}
                    <Bar dataKey="score" >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={CATEGORY_COLORS[entry.main] || "#6b7280"}
                                className="transition-opacity duration-200"
                            />
                        ))}
                        <LabelList content={renderCustomLabel} />
                    </Bar>
                </BarChart>
            </div>
        </ResultReportSection>
    );
};

export default ResultReportChecklistScoreChart;
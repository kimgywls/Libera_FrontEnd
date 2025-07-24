import { FC } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
    CartesianGrid,
    ReferenceLine,
    Legend,
} from "recharts";
import type { LabelProps } from "recharts";

import { ChecklistDetailedResultResponse } from "@/app/types/checklist";

interface ChecklistScoreChartProps {
    data: ChecklistDetailedResultResponse | undefined;
    isLoading: boolean;
    isError: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
    "학업역량": "#a28fd0",
    "진로역량": "#8dd1e1",
    "공동체역량": "#f9a3a4",
};

const ChecklistScoreChart: FC<ChecklistScoreChartProps> = ({ data, isLoading, isError }) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-lg mb-6 w-1/3" />
                    <div className="space-y-4">
                        <div className="h-64 bg-gray-200 rounded-lg" />
                        <div className="flex justify-end space-x-4">
                            <div className="h-4 bg-gray-200 rounded w-20" />
                            <div className="h-4 bg-gray-200 rounded w-20" />
                            <div className="h-4 bg-gray-200 rounded w-20" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">데이터 로드 실패</h3>
                    <p className="text-gray-500">데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>
                </div>
            </div>
        );
    }

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
            <div id="checklist-score-chart" className="bg-white rounded-2xl shadow-lg pt-6 border border-gray-100">
                <div className="mb-8 ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">평가요소별 점수</h3>
                    <p className="text-gray-500 text-sm">각 하위 카테고리별 점수를 확인하세요</p>
                </div>
                <div className="text-center py-8">
                    <p className="text-gray-500">평가 데이터가 없습니다.</p>
                </div>
            </div>
        );
    }

    // 커스텀 툴팁
    const CustomTooltip = ({ active, payload, label }: {
        active?: boolean;
        payload?: Array<{ payload: { main: string; score: number }; value: number }>;
        label?: string;
    }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 backdrop-blur-sm">
                    <p className="font-semibold text-gray-900 mb-1">{label}</p>
                    <p className="text-sm text-gray-600 mb-1">{payload[0].payload.main}</p>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: CATEGORY_COLORS[payload[0].payload.main] }}
                        />
                        <span className="text-sm font-medium">{payload[0].value.toFixed(1)}점</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    // 커스텀 Legend 렌더러
    const renderCustomLegend = () => (
        <div className="flex gap-6 justify-center mt-6 flex-wrap">
            {uniqueMainCategories.map(main => (
                <div key={main} className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: CATEGORY_COLORS[main] || '#888' }}
                    />
                    <span className="text-sm font-medium text-gray-700">{main}</span>
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
                fontSize={13}
                style={{ letterSpacing: 1 }}
            >
                {lines.map((line, index) => (
                    <tspan key={index} x={x} dy={index === 0 ? 0 : 16}>
                        {line}
                    </tspan>
                ))}
            </text>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg pt-6 border border-gray-100">
            <div className="mb-8 ml-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">평가요소별 점수</h3>
                <p className="text-gray-500 text-sm">각 하위 카테고리별 점수를 확인하세요</p>
            </div>
            <div id="checklist-score-chart" className="flex justify-center">
                <ResponsiveContainer width="100%" height={420}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                        <XAxis
                            dataKey="sub"
                            interval={0}
                            textAnchor="middle"
                            height={48}
                            tickLine={false}
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
                        <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                        <Tooltip content={<CustomTooltip />} />
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
                                    fill={CATEGORY_COLORS[entry.main] || "#888"}
                                    className="transition-opacity duration-200"
                                />
                            ))}
                            <LabelList content={renderCustomLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChecklistScoreChart;
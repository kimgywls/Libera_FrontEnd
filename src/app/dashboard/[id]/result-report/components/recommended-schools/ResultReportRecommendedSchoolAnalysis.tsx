
import { FC } from "react";
import type { SavedRecommendation } from '@/app/types/university';
import { School } from "lucide-react";
import evaluationFactors from "@/app/data/DetailedEvaluationFactors.json";
import ResultReportSection from "../ResultReportSection";

interface ResultReportRecommendedSchoolAnalysisProps {
    savedRecommendations: SavedRecommendation[] | undefined;
}

const ResultReportRecommendedSchoolAnalysis: FC<ResultReportRecommendedSchoolAnalysisProps> = ({
    savedRecommendations,
}) => {
    if (!savedRecommendations || savedRecommendations.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                분석할 추천 대학교가 없습니다.
            </div>
        );
    }

    return (
        <ResultReportSection title="추천 대학교 세부 분석">
            <div className="space-y-4">
                {savedRecommendations.map((recommendation, recommendationIndex) => (
                    <div key={recommendation.id} className="">
                        {recommendation.items.map((item, itemIndex) => {
                            const isLastRecommendation = recommendationIndex === savedRecommendations.length - 1;
                            const isLastItem = itemIndex === recommendation.items.length - 1;
                            const isLast = isLastRecommendation && isLastItem;

                            return (
                                <div key={item.id} className={`py-4 flex flex-col gap-2 ${!isLast ? 'border-b' : ''}`} style={{ borderColor: '#e5e7eb' }}>
                                    <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                                        <School className="w-5 h-5 mr-2" /> {item.university_name} - {item.major_name} / {item.admission_category}
                                    </h4>

                                    {/* (1) 결과 분석 - 학생부교과가 아닌 경우에만 표시 */}
                                    {item.admission_category !== '학생부교과' && (
                                        <div>
                                            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white" style={{ borderColor: '#e5e7eb', backgroundColor: '#ffffff' }}>
                                                <table className="min-w-full border border-gray-200 divide-y divide-gray-200 bg-white">
                                                    <thead style={{ backgroundColor: '#f5f3ff' }}>
                                                        <tr>
                                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-x border-gray-200">요소</th>
                                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-x border-gray-200">반영비율</th>
                                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-x border-gray-200">반영점수</th>
                                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-x border-gray-200" colSpan={4}>세부 평가 요소</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {[1, 2, 3].map((n) => {
                                                            const elementName = n === 1 ? item.element1_name : n === 2 ? item.element2_name : item.element3_name;
                                                            const elementPercentage = n === 1 ? item.element1_percentage : n === 2 ? item.element2_percentage : item.element3_percentage;
                                                            const elementScore = n === 1 ? item.element1_score : n === 2 ? item.element2_score : item.element3_score;

                                                            // element1, element2, element3에 따라 해당하는 요소들 가져오기
                                                            const evaluationElements = evaluationFactors.find(factor => factor.id === n)?.elements || [];

                                                            return (
                                                                <tr key={n} className="hover:bg-gray-50">
                                                                    <td className="px-4 py-2 text-gray-900 border-x border-gray-200">{elementName}</td>
                                                                    <td className="px-4 py-2 text-gray-900 border-x border-gray-200">{elementPercentage}%</td>
                                                                    <td className="px-4 py-2 text-gray-900 border-x border-gray-200">{elementScore.toFixed(2)}</td>
                                                                    <td className="px-4 py-2 text-gray-900 border-x border-gray-200" colSpan={4}>
                                                                        {evaluationElements.length > 0 ? (
                                                                            <div className="flex flex-col gap-2">
                                                                                {evaluationElements.map((element, index) => (
                                                                                    <div key={index} className="text-gray-700 text-sm">- {element.name}</div>
                                                                                ))}
                                                                            </div>
                                                                        ) : (
                                                                            '-'
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}

                                                        {/* 환산점수 행 */}
                                                        <tr className="font-medium" style={{ backgroundColor: '#f5f3ff' }}>
                                                            <td className="px-4 py-2 border-x border-gray-200 text-gray-900" colSpan={2}>환산점수</td>
                                                            <td className="px-4 py-2 border-x border-gray-200 text-gray-900 bg-white">{item.total_element_score.toFixed(2)}/100</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* 세부 평가 요소 안내 박스 */}
                                            <div className="mt-3" >
                                                <div className="space-y-2">
                                                    {evaluationFactors.map((factor) => (
                                                        <div
                                                            key={factor.id}
                                                            className="rounded-lg border px-5 py-4"
                                                            style={{ borderColor: '#c4b4ff', backgroundColor: '#ffffff' }}
                                                        >
                                                            <div className="font-semibold text-violet-800 mb-2">{factor.category}</div>
                                                            <ul className="space-y-2">
                                                                {factor.elements.map((element, index) => (
                                                                    <li key={index} className="grid grid-cols-[1rem_10rem_1rem_1fr] items-start text-sm text-gray-800">
                                                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-500" />
                                                                        <span className="font-medium text-gray-900">{element.name}</span>
                                                                        <span className="text-gray-500">-</span>
                                                                        <span className="text-gray-700">{element.description}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    )}

                                    {/* (2) 전형 방법 및 최저학력기준 */}
                                    <div className="mt-3">
                                        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white" style={{ borderColor: '#e5e7eb', backgroundColor: '#ffffff' }}>
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead style={{ backgroundColor: '#f5f3ff' }}>
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-x border-gray-200 w-[400px]">전형 방법</th>
                                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-x border-gray-200">최저학력기준</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    <tr className="hover:bg-gray-50">
                                                        <td className="px-4 py-2 border-x border-gray-200 text-gray-900 w-[400px]">{item.admission_method}</td>
                                                        <td className="px-4 py-2 border-x border-gray-200 text-gray-900">{item.minimum_qualification}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </ResultReportSection>
    );
};

export default ResultReportRecommendedSchoolAnalysis;

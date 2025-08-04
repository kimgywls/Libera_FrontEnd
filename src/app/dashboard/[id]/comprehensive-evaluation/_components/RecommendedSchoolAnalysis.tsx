import Section from "@/app/dashboard/_components/Section";
import { FC } from "react";
import type { SavedRecommendation } from '@/app/types/university';
import { School } from "lucide-react";
import { NON_SCORE_RECOMMEND_TYPE_COLOR } from "@/app/constants";
import evaluationFactors from "@/app/data/DetailedEvaluationFactors.json";

interface RecommendedSchoolAnalysisProps {
    savedRecommendations: SavedRecommendation[] | undefined;
}

const RecommendedSchoolAnalysis: FC<RecommendedSchoolAnalysisProps> = ({
    savedRecommendations,
}) => {
    if (!savedRecommendations || savedRecommendations.length === 0) {
        return (
            <Section title="추천 대학교 분석">
                <div className="text-center py-8 text-gray-500">
                    분석할 추천 대학교가 없습니다.
                </div>
            </Section>
        );
    }

    return (
        <Section title="추천 대학교 분석">
            <div className="space-y-8">
                {savedRecommendations.map((recommendation) => (
                    <div key={recommendation.id} className="space-y-6">
                        {recommendation.items.map((item) => (
                            <div key={item.id} className="space-y-6 rounded-xl border border-gray-200 shadow-sm p-6">
                                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                                    <School className="w-5 h-5 mr-2" /> {item.university_name} - {item.major_name} / {item.admission_category}
                                </h4>

                                {/* (1) 결과 분석 - 학생부교과가 아닌 경우에만 표시 */}
                                {item.admission_category !== '학생부교과' && (
                                    <div>
                                        <h5 className="text-sm font-semibold text-gray-600 mb-3">결과 분석</h5>
                                        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200 bg-white">
                                                <thead className="bg-gray-50">
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
                                                    <tr className="bg-gray-100 font-medium hover:bg-gray-100">
                                                        <td className="px-4 py-2 border-x border-gray-200 text-gray-900" colSpan={2}>환산점수</td>
                                                        <td className="px-4 py-2 border-x border-gray-200 text-gray-900 bg-white">{item.total_element_score.toFixed(2)}/100</td>
                                                        <td className="px-4 py-2 border-x border-gray-200 text-gray-900">배치점수</td>
                                                        <td className="px-4 py-2 border-x border-gray-200 text-gray-900 bg-white">80점</td>
                                                        <td className="px-4 py-2 border-x border-gray-200 text-gray-900">비교과 판정</td>
                                                        <td className="px-4 py-2 border-x border-gray-200 text-gray-900 bg-white">
                                                            <span className={`inline-block text-sm font-medium px-2 py-1 rounded ${NON_SCORE_RECOMMEND_TYPE_COLOR[item.non_subject_suitability] || 'bg-gray-100 text-gray-800'}`}>
                                                                {item.non_subject_suitability}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* 세부 평가 요소 안내 박스 */}
                                        <div className="mt-6 bg-white border border-violet-200 rounded-xl p-6 shadow-md">
                                            <h6 className="text-lg font-bold text-violet-700 mb-4 flex items-center">
                                                <span className="w-1.5 h-4 bg-violet-500 mr-2 rounded-sm" /> 세부 평가 요소
                                            </h6>

                                            <div className="space-y-6">
                                                {evaluationFactors.map((factor) => (
                                                    <div
                                                        key={factor.id}
                                                        className="rounded-lg border border-violet-100 bg-violet-50 px-5 py-4 shadow-sm"
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
                                <div>
                                    <h5 className="text-sm font-semibold text-gray-600 mb-3">전형 방법 및 최저학력기준</h5>
                                    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
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
                        ))}
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default RecommendedSchoolAnalysis;

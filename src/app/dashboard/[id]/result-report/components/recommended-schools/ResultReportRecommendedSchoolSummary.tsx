import { FC } from "react";

import { SavedRecommendation, SavedUniversityItem } from "@/app/types/university";
import ResultReportBaseTable from "../ResultReportBaseTable";
import ResultReportSection from "../ResultReportSection";

interface ResultReportRecommendedSchoolSummaryProps {
    savedRecommendations: SavedRecommendation[] | undefined;
}

interface TableRow {
    category: string;
    [key: string]: string | number | { value: string; isLongText?: boolean };
}

const ResultReportRecommendedSchoolSummary: FC<ResultReportRecommendedSchoolSummaryProps> = ({ savedRecommendations }) => {
    const recommendations = savedRecommendations?.[0]?.items || [];

    const getCellData = (recommendation: SavedUniversityItem, dataKey: string): string | { value: string; isLongText?: boolean } => {
        if (!recommendation) return "";

        switch (dataKey) {
            case "overall_evaluation":
                return recommendation.overall_evaluation || "";
            case "university_name":
                return recommendation.university_name || "";
            case "major_name":
                return recommendation.major_name || "";
            case "admission_category":
                return recommendation.admission_category || "";
            case "admission_type":
                return recommendation.admission_type || "";
            case "recruitment_count":
                return recommendation.recruitment_count || "";
            case "competition_ratio_cy":
                return recommendation.competition_ratio_cy || "";
            case "grade_cutoff_cy":
                return recommendation.grade_cutoff_cy || "";
            case "add_recruit_cy":
                return recommendation.add_recruit_cy || "";
            case "competition_ratio_cy_minus_1":
                return recommendation.competition_ratio_cy_minus_1 || "";
            case "grade_cutoff_cy_minus_1":
                return recommendation.grade_cutoff_cy_minus_1 || "";
            case "add_recruit_cy_minus_1":
                return recommendation.add_recruit_cy_minus_1 || "";
            case "competition_ratio_cy_minus_2":
                return recommendation.competition_ratio_cy_minus_2 || "";
            case "grade_cutoff_cy_minus_2":
                return recommendation.grade_cutoff_cy_minus_2 || "";
            case "add_recruit_cy_minus_2":
                return recommendation.add_recruit_cy_minus_2 || "";
            case "admission_method":
                const admissionMethod = recommendation.admission_method || "";
                return {
                    value: admissionMethod,
                    isLongText: admissionMethod.length > 10
                };
            case "minimum_qualification":
                const minimumQualification = recommendation.minimum_qualification || "";
                return {
                    value: minimumQualification,
                    isLongText: minimumQualification.length > 10
                };
            case "university_exam_date":
                return recommendation.university_exam_date || "";
            default:
                return "";
        }
    };

    const tableRows: TableRow[] = [
        { category: "지원적정성" },
        { category: "대학명" },
        { category: "학과명" },
        { category: "전형유형" },
        { category: "전형명" },
        { category: `2026 \n모집인원` },
        { category: `2025 \n경쟁률` },
        { category: `2025 \n입결` },
        { category: `2025 \n충원` },
        { category: `2024 \n경쟁률` },
        { category: `2024 \n입결` },
        { category: `2024 \n충원` },
        { category: `2023 \n경쟁률` },
        { category: `2023 \n입결` },
        { category: `2023 \n충원` },
        { category: "전형방법" },
        { category: "최저학력기준" },
        { category: "면접일" }
    ];

    const dataKeys = [
        "overall_evaluation",
        "university_name",
        "major_name",
        "admission_category",
        "admission_type",
        "recruitment_count",
        "competition_ratio_cy",
        "grade_cutoff_cy",
        "add_recruit_cy",
        "competition_ratio_cy_minus_1",
        "grade_cutoff_cy_minus_1",
        "add_recruit_cy_minus_1",
        "competition_ratio_cy_minus_2",
        "grade_cutoff_cy_minus_2",
        "add_recruit_cy_minus_2",
        "admission_method",
        "minimum_qualification",
        "university_exam_date"
    ];

    // 각 행에 데이터 추가
    tableRows.forEach((row, rowIndex) => {
        recommendations.forEach((recommendation, colIndex) => {
            const columnKey = `preference_${colIndex + 1}`;
            row[columnKey] = getCellData(recommendation, dataKeys[rowIndex]);
        });
    });

    const columns = [
        { key: "category", label: "구분", width: "w-32" },
        ...recommendations.map((_, index) => ({
            key: `preference_${index + 1}`,
            label: `${index + 1}지망`,
            width: "w-40"
        }))
    ];


    return (
        <ResultReportSection title="추천 대학교 요약">
            <div className="space-y-6">
                <div className="w-full">
                    <ResultReportBaseTable
                        columns={columns}
                        data={tableRows}
                        className="w-full"
                    />
                </div>
            </div>
        </ResultReportSection>
    );
}

export default ResultReportRecommendedSchoolSummary;
import { FC } from "react";
import { useStudentInfoContext } from "@/app/contexts/StudentInfoContext";
import { useReportData } from "../hooks/use-report-data";
import { PERIODS } from "@/app/constants";
import ResultReportStudentInfo from "./student-info/ResultReportStudentInfo";
import ResultReportAttendanceSection from "./attendance/ResultReportAttendanceSection";
import ResultReportSemesterTrendSection from "./scores/ResultReportSemesterTrendSection";
import ResultReportSemesterTrendChartSection from "./scores/ResultReportSemesterTrendChartSection";
import ResultReportRecommendedSchoolsSection from "./recommended-schools/ResultReportRecommendedSchoolsSection";
import ResultReportComprehensiveEvaluationSection from "./comprehensive-evaluation/ResultReportComprehensiveEvaluationSection";
import ResultReportScoresSection from "./scores/ResultReportScoresSection";
import ResultReportChecklistSection from "./checklist/ResultReportChecklistSection";
import ResultReportCategoryEvaluationSection from "./comprehensive-evaluation/ResultReportCategoryEvaluationSection";

const ResultReportWidget: FC = () => {
    const { studentInfo } = useStudentInfoContext();
    const { reportData } = useReportData(studentInfo?.id || 0);

    if (!studentInfo) {
        return (
            <div className="result-report-widget">
                <div className="result-report-error-text">학생 정보를 찾을 수 없습니다.</div>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="result-report-widget">
                <div className="result-report-loading">
                    <div className="result-report-loading-content">
                        <div className="result-report-spinner"></div>
                        <span className="result-report-loading-text">보고서 데이터를 불러오는 중...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="result-report-widget">
            <div className="result-report-section-wrapper">
                <ResultReportStudentInfo student={studentInfo} />
            </div>

            <div className="result-report-section-wrapper">
                <ResultReportAttendanceSection
                    attendance={{
                        records: reportData.attendance,
                        total_records: reportData.attendance.length,
                        summary: {
                            total_absence: 0,
                            total_tardiness: 0,
                            total_early_leave: 0
                        },
                        has_data: reportData.attendance.length > 0
                    }}
                />
            </div>

            {PERIODS.map(({ grade, semester }) => (
                <div key={`${grade}-${semester}`} className="result-report-section-wrapper">
                    <ResultReportScoresSection
                        grade={grade}
                        semester={semester}
                        scores={reportData.scores}
                    />
                </div>
            ))}

            <div className="result-report-section-wrapper">
                <ResultReportSemesterTrendSection
                    overallGpa={reportData.overallGpa}
                    semesterTrend={reportData.semesterTrend}
                />
            </div>

            <div className="result-report-section-wrapper">
                <ResultReportSemesterTrendChartSection
                    semesterTrend={reportData.semesterTrend}
                />
            </div>

            <div className="result-report-section-wrapper">
                <ResultReportChecklistSection
                    questions={reportData.checklistQuestions}
                    responses={reportData.checklistResponses}
                    result={reportData.checklistResult}
                    detailedResult={reportData.checklistDetailedResult}
                />
            </div>

            <div className="result-report-section-wrapper">
                <ResultReportCategoryEvaluationSection
                    categoryEvaluations={reportData.finalEvaluation?.category_evaluations || []}
                />
            </div>

            {reportData.recommendedUniversities && reportData.recommendedUniversities.length > 0 && (
                <div className="result-report-section-wrapper">
                    <ResultReportRecommendedSchoolsSection
                        savedRecommendations={reportData.recommendedUniversities}
                    />
                </div>
            )}

            <div className="result-report-section-wrapper">
                <ResultReportComprehensiveEvaluationSection
                    overallEvaluation={reportData.overallEvaluation?.overall_content || null}
                />
            </div>
        </div>
    );
};

export default ResultReportWidget;
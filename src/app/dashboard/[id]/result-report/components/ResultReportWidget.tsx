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

const ResultReportWidget: FC = () => {
    const { studentInfo } = useStudentInfoContext();
    const { reportData } = useReportData(studentInfo?.id || 0);


    if (!studentInfo) {
        return <div>학생 정보를 찾을 수 없습니다.</div>;
    }

    if (!reportData) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#2563eb' }}></div>
                    <span className="font-medium" style={{ color: '#4b5563' }}>보고서 데이터를 불러오는 중...</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="space-y-10"
            style={{
                padding: '10px',
                backgroundColor: '#ffffff'
            }}
        >
            <ResultReportStudentInfo student={studentInfo} />

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

            {PERIODS.map(({ grade, semester }) => (
                <ResultReportScoresSection
                    key={`${grade}-${semester}`}
                    grade={grade}
                    semester={semester}
                    scores={reportData.scores}
                />
            ))}

            <ResultReportSemesterTrendSection
                overallGpa={reportData.overallGpa}
                semesterTrend={reportData.semesterTrend}
            />

            <ResultReportSemesterTrendChartSection
                semesterTrend={reportData.semesterTrend}
            />

            <ResultReportChecklistSection
                questions={reportData.checklistQuestions}
                responses={reportData.checklistResponses}
                result={reportData.checklistResult}
                detailedResult={reportData.checklistDetailedResult}
            />

            <ResultReportRecommendedSchoolsSection
                savedRecommendations={reportData.recommendedUniversities || []}
            />

            <ResultReportComprehensiveEvaluationSection
                finalEvaluation={reportData.finalEvaluation}
                overallEvaluation={reportData.overallEvaluation?.overall_content || null}

            />
        </div>
    );
};

export default ResultReportWidget;
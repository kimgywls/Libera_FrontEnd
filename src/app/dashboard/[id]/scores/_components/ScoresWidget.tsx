import { FC } from "react";
import { PERIODS } from '@/app/constants';
import { useAttendance } from '../_hooks/use-attendance';
import { useStudentScores } from '../_hooks/use-student-scores';
import { useSemesterTrend } from '../_hooks/use-semester-trend';
import { useStudentInfoContext } from '@/app/dashboard/_contexts/StudentInfoContext';
import { useOverallGpa } from '../_hooks/use-overall-gpa';
import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import AttendanceSection from './AttendanceSection';
import ScoresSection from './ScoresSection';
import SemesterTrendSection from './SemesterTrendSection';
import SemesterTrendChartSection from './SemesterTrendChartSection';
import type { Score, ScoreForm } from '@/app/types/score';
import { useModalState } from '@/app/hooks/useModalState';

const ScoresWidget: FC = () => {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id;
    const { overallGpa } = useOverallGpa(studentId!);
    const { attendance, isLoading: isAttendanceLoading, isError: isAttendanceError } = useAttendance(studentId!);
    const { scores, isLoading: isScoresLoading, isError: isScoresError } = useStudentScores(studentId!);
    const { semesterTrend, isLoading: isTrendLoading, isError: isTrendError } = useSemesterTrend(studentId!);

    function toScoreForm(score: Score): ScoreForm {
        return {
            id: score.id,
            grade: score.grade,
            semester: score.semester,
            subject_type: score.subject_type,
            curriculum: score.curriculum ?? '',
            subject: score.subject ?? '',
            raw_score: score.raw_score ?? null,
            subject_average: score.subject_average ?? null,
            credit_hours: score.credit_hours ?? null,
            student_count: score.student_count ?? null,
            grade_rank: score.grade_rank ?? '',
            achievement_level: score.achievement_level ?? '',
            standard_deviation: score.standard_deviation ?? null,
            achievement_distribution: score.achievement_distribution ?? null,
            notes: score.notes ?? '',
        };
    }

    // useModalState 훅으로 모달 상태 관리
    const { openModal, closeModal, isModalOpen } = useModalState();
    const onScoreChange = () => { };

    return (
        <div className="space-y-10">
            <StudentInfoSection student={studentInfo!} />
            <AttendanceSection
                attendance={attendance ?? { total_records: 0, records: [], summary: { total_absence: 0, total_tardiness: 0, total_early_leave: 0 }, has_data: false }}
                isLoading={isAttendanceLoading}
                isError={isAttendanceError}
            />
            {PERIODS.map(({ grade, semester }) => (
                <ScoresSection
                    key={`${grade}-${semester}`}
                    grade={grade}
                    semester={semester}
                    scores={scores?.scores || []}
                    isScoresLoading={isScoresLoading}
                    isScoresError={isScoresError}
                    openModal={openModal}
                    closeModal={closeModal}
                    isModalOpen={isModalOpen}
                    studentId={studentId!}
                    toScoreForm={toScoreForm}
                    onScoreChange={onScoreChange}
                />
            ))}
            <SemesterTrendSection
                overallGpa={overallGpa ?? 0}
                semesterTrend={semesterTrend}
                isTrendLoading={isTrendLoading}
                isTrendError={isTrendError}
            />
            <SemesterTrendChartSection
                semesterTrend={semesterTrend}
                isLoading={isTrendLoading}
                isError={isTrendError}
            />
        </div>
    );
};

export default ScoresWidget;
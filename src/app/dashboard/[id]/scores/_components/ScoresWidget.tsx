import React, { FC } from 'react';

import type { Score, ScoreForm } from '@/app/types/score';
import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';
import { useModalState } from '@/app/hooks/useModalState';

import { useAttendance } from '../_hooks/use-attendance';
import { useOverallGpa } from '../_hooks/use-overall-gpa';
import { useSemesterTrend } from '../_hooks/use-semester-trend';
import { useStudentScores } from '../_hooks/use-student-scores';

import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import AttendanceSection from './AttendanceSection';
import ScoresSection from './ScoresSection';
import SemesterTrendChartSection from './SemesterTrendChartSection';
import SemesterTrendSection from './SemesterTrendSection';

export const PERIODS = [
    { grade: 1, semester: 1 },
    { grade: 1, semester: 2 },
    { grade: 2, semester: 1 },
    { grade: 2, semester: 2 },
    { grade: 3, semester: 1 },
] as const;

const ScoresWidget: FC = () => {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id;

    // 모든 hooks를 조건부 로직 전에 호출
    const { overallGpa } = useOverallGpa(studentId || 0);
    const { attendance, isLoading: isAttendanceLoading, isError: isAttendanceError } = useAttendance(studentId || 0);
    const { scores, isLoading: isScoresLoading, isError: isScoresError } = useStudentScores(studentId || 0);
    const { semesterTrend, isLoading: isTrendLoading, isError: isTrendError } = useSemesterTrend(studentId || 0);
    const { openModal, closeModal, isModalOpen } = useModalState();

    // studentId가 없으면 로딩 상태 표시
    if (!studentId) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">학생 정보를 불러오는 중...</p>
            </div>
        );
    }

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
            standard_deviation: score.standard_deviation ?? null,
            achievement_level: score.achievement_level ?? '',
            student_count: score.student_count ?? null,
            grade_rank: score.grade_rank ?? null,
            achievement_distribution: score.achievement_distribution ?? null,
            credit_hours: score.credit_hours ?? null,
            notes: score.notes ?? null,
        };
    }

    const onScoreChange = () => { };

    return (
        <div className="space-y-10">
            {studentInfo && (
                <StudentInfoSection student={studentInfo} />
            )}
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
                    studentId={studentId}
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
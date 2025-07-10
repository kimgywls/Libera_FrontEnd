'use client';

import { useParams } from 'next/navigation';
import { PERIODS } from '@/app/constants';
import { useAttendance } from './_hooks/use-attendance';
import { useStudentScores } from './_hooks/use-student-scores';
import { useSemesterTrend } from './_hooks/use-semester-trend';
import { useStudentInfoContext } from '@/app/dashboard/_contexts/StudentInfoContext';
import { useState } from 'react';
import { useOverallGpa } from './_hooks/use-overall-gpa';
import { useUpdateConsultationDate } from './_hooks/use-update-consultation-date';
import { useModalState } from '@/app/hooks/useModalState';
import { Score, ScoreForm } from '@/app/types/score';
import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import AttendanceSection from './_components/AttendanceSection';
import ScoresSection from './_components/ScoresSection';
import SemesterTrendSection from './_components/SemesterTrendSection';
import SemesterTrendChartSection from './_components/SemesterTrendChartSection';

export default function ScorePage() {
    const { id } = useParams();
    const studentId = Number(id);
    const { studentInfo } = useStudentInfoContext();
    const { overallGpa } = useOverallGpa(studentId);
    const { attendance, isLoading: isAttendanceLoading, isError: isAttendanceError } = useAttendance(studentId);
    const { scores, isLoading: isScoresLoading, isError: isScoresError } = useStudentScores(studentId);
    const { semesterTrend, isLoading: isTrendLoading, isError: isTrendError } = useSemesterTrend(studentId);
    const { updateConsultationDate, isLoading: isConsultationLoading } = useUpdateConsultationDate(studentId);

    const { openModal, closeModal, isModalOpen } = useModalState();

    // 상담일 상태 관리 (초기값: 오늘)
    const [consultationDate, setConsultationDate] = useState<Date>(new Date());

    const handleUpdateConsultationDate = async (date: Date) => {
        setConsultationDate(date);
        await updateConsultationDate(date);
    };

    function toScoreForm(score: Score): ScoreForm {
        return {
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
            achievement_distribution: score.achievement_distribution ?? '',
            notes: score.notes ?? '',
        };
    }

    return (
        <div className="space-y-10">
            <StudentInfoSection
                student={studentInfo!}
            />
            <AttendanceSection
                attendance={attendance!}
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
}
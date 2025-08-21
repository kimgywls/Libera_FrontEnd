import { useQuery } from '@tanstack/react-query';

import { ThirdGradeScoresData } from '@/app/types/student';
import { fetchStudentScores } from '../_actions/fetch-student-scores';

export function useCheckThirdGradeScores(studentId: number) {
    return useQuery({
        queryKey: ['student-scores', studentId],
        queryFn: () => fetchStudentScores(studentId),
        enabled: !!studentId,
        select: (data): ThirdGradeScoresData => {
            // 3학년 1학기 성적이 있는지 확인
            const thirdGradeFirstSemester = data.scores?.find(
                score => score.grade === 3 && score.semester === 1
            );

            // 실제로 성적 데이터가 입력되어 있는지 확인 (raw_score가 null이 아닌 경우)
            const hasValidScores = thirdGradeFirstSemester &&
                data.scores?.some(score =>
                    score.grade === 3 &&
                    score.semester === 1 &&
                    score.raw_score !== null
                );

            return {
                hasThirdGradeScores: !!hasValidScores
            };
        },
        staleTime: 5 * 60 * 1000, // 5분
        refetchOnWindowFocus: false,
    });
} 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudentConsultation } from '../_actions/update-student-consultation';
import type { StudentDetail } from '@/app/types/student';

interface UpdateStudentConsultationParams {
    studentId: number;
    name: string;
    birth_date: Date;
    phone_number: string;
    consultation_date: Date;
}

export const useUpdateStudentConsultation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ studentId, birth_date, consultation_date, ...data }: UpdateStudentConsultationParams) =>
            updateStudentConsultation(studentId, {
                ...data,
                birth_date: birth_date,
                consultation_date: consultation_date,
            }),
        onSuccess: (data, variables) => {
            // 학생 정보 캐시 무효화
            queryClient.invalidateQueries({
                queryKey: ['student-detail', variables.studentId]
            });

            // 캐시된 데이터를 즉시 업데이트
            queryClient.setQueryData(['student-detail', variables.studentId], (oldData: StudentDetail) => {
                if (oldData) {
                    return {
                        ...oldData,
                        consultation_date: new Date(variables.consultation_date)
                    };
                }
                return oldData;
            });
        },
        onError: (error) => {
            console.error('상담 일정 업데이트 실패:', error);
        }
    });
}; 
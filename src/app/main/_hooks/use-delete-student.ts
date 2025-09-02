import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeleteStudentResponse } from '@/app/types/student';
import { deleteStudents, deleteStudent } from '../_actions/delete-student';

interface UseDeleteStudentReturn {
    deleteStudents: (studentIds: number[]) => Promise<DeleteStudentResponse>;
    deleteStudent: (studentId: number) => Promise<DeleteStudentResponse>;
    deleteSelectedStudents: (studentIds: number[]) => Promise<DeleteStudentResponse>;
    isLoading: boolean;
    isSuccess: boolean;
    error: Error | null;
    reset: () => void;
}

export function useDeleteStudent(): UseDeleteStudentReturn {
    const queryClient = useQueryClient();

    const multiDeleteMutation = useMutation<DeleteStudentResponse, Error, number[]>({
        mutationFn: (studentIds: number[]) => deleteStudents(studentIds),
        onSuccess: () => {
            // 모든 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['students'] });
            queryClient.invalidateQueries({ queryKey: ['all-students'] });
        }
    });

    const singleDeleteMutation = useMutation<DeleteStudentResponse, Error, number>({
        mutationFn: (studentId: number) => deleteStudent(studentId),
        onSuccess: () => {
            // 모든 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['students'] });
            queryClient.invalidateQueries({ queryKey: ['all-students'] });
        }
    });

    // 선택된 학생 수에 따라 단일/다중 삭제 결정하는 함수
    const deleteSelectedStudents = async (studentIds: number[]): Promise<DeleteStudentResponse> => {
        if (studentIds.length === 1) {
            return singleDeleteMutation.mutateAsync(studentIds[0]);
        } else {
            return multiDeleteMutation.mutateAsync(studentIds);
        }
    };

    return {
        deleteStudents: multiDeleteMutation.mutateAsync,
        deleteStudent: singleDeleteMutation.mutateAsync,
        deleteSelectedStudents,
        isLoading: multiDeleteMutation.isPending || singleDeleteMutation.isPending,
        isSuccess: multiDeleteMutation.isSuccess || singleDeleteMutation.isSuccess,
        error: multiDeleteMutation.error || singleDeleteMutation.error,
        reset: () => {
            multiDeleteMutation.reset();
            singleDeleteMutation.reset();
        }
    };
} 
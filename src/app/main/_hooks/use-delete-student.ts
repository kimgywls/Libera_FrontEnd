import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteStudent } from '../_actions/delete-student';
import { DeleteStudentResponse } from '@/app/types/student';

interface UseDeleteStudentReturn {
    deleteStudents: (studentIds: number[]) => Promise<DeleteStudentResponse>;
    isLoading: boolean;
    isSuccess: boolean;
    error: Error | null;
    reset: () => void;
}

export function useDeleteStudent(): UseDeleteStudentReturn {
    const queryClient = useQueryClient();

    const mutation = useMutation<DeleteStudentResponse, Error, number[]>({
        mutationFn: deleteStudent,
        onSuccess: () => {
            // 모든 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['students'] });
            queryClient.invalidateQueries({ queryKey: ['all-students'] });
        }
    });

    return {
        deleteStudents: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        reset: mutation.reset
    };
} 
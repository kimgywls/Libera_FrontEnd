import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteStudent, DeleteStudentResponse } from '../_actions/delete-student';

export function useDeleteStudent() {
    const queryClient = useQueryClient();

    const mutation = useMutation<DeleteStudentResponse, Error, number[]>({
        mutationFn: deleteStudent,
        onSuccess: () => {
            // 학생 목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ['students'] });
            queryClient.invalidateQueries({ queryKey: ['all-students'] });
        },
    });

    const remove = async (studentIds: number[]) => {
        return await mutation.mutateAsync(studentIds);
    };

    const reset = () => {
        mutation.reset();
    };

    return {
        loading: mutation.isPending,
        error: mutation.error?.message || '',
        success: mutation.isSuccess,
        remove,
        reset,
    };
} 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDesiredSchool, deleteDesiredSchool, AddDesiredSchoolParams } from '../_actions/desired-school';

export function useAddDesiredSchool() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: AddDesiredSchoolParams) => addDesiredSchool(params),
        onSuccess: (_data, variables) => {
            // 희망학교 목록 쿼리 무효화 (student_id 기준)
            queryClient.invalidateQueries({ queryKey: ['desired-schools', variables.student_id] });
        },
    });
}

export function useDeleteDesiredSchool() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (desired_school_id: number) => deleteDesiredSchool(desired_school_id),
        onSuccess: () => {
            // 삭제 후 전체 목록 무효화 (student_id를 context로 넘길 수도 있음)
            queryClient.invalidateQueries({ queryKey: ['desired-schools'] });
        },
    });
} 
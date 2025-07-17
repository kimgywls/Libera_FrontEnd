import { useQueryClient } from '@tanstack/react-query';

export function useInvalidateDesiredSchools(studentId: number) {
    const queryClient = useQueryClient();
    return () => {
        queryClient.invalidateQueries({ queryKey: ['desired-schools', studentId] });
        queryClient.invalidateQueries({ queryKey: ['school-recommendations', studentId] });
    };
} 
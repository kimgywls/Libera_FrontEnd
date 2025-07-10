import { useMutation } from '@tanstack/react-query';
import { updateConsultationDateAction } from '../_actions/update-consultation-date';

export function useUpdateConsultationDate(studentId: number) {
    const {
        mutate: updateConsultationDate,
        isPending,
        isError,
    } = useMutation({
        mutationFn: (date: Date) => updateConsultationDateAction(studentId, date),
    });
    return { updateConsultationDate, isPending, isError };
} 
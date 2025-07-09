import { useState, useCallback } from 'react';
import { updateConsultationDateAction } from '../_actions/update-consultation-date';

export function useUpdateConsultationDate(studentId: number) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const updateConsultationDate = useCallback(async (date: Date) => {
        setIsLoading(true);
        setIsError(false);
        try {
            await updateConsultationDateAction(studentId, date);
        } catch (e) {
            setIsError(true);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [studentId]);

    return { updateConsultationDate, isLoading, isError };
} 
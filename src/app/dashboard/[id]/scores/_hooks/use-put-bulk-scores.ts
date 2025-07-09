import { useState } from 'react';
import { putBulkScores } from '../_actions/put-bulk-scores';
import type { ScoreForm } from '@/app/types/score';

export function usePutBulkScores() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (studentId: number, scores: ScoreForm[]) => {
        setIsLoading(true);
        setError(null);
        try {
            await putBulkScores(studentId, scores);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { mutate, isLoading, error };
} 
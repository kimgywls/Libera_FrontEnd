import { useCallback, useEffect, useState } from 'react';
import type { SchoolRecommendationResponse } from '@/app/types/school-recommendation';
import { fetchSchoolRecommendations } from '../_actions/fetch-school-recommendations';

interface UseSchoolRecommendationsResult {
    data: SchoolRecommendationResponse | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export const useSchoolRecommendations = (
    studentId: number | undefined
): UseSchoolRecommendationsResult => {
    const [data, setData] = useState<SchoolRecommendationResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!studentId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetchSchoolRecommendations(studentId);
            setData(res);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [studentId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}; 
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { updateRecommendationItem } from '../_actions/update-recommendation-item';

interface UpdateRecommendationItemRequest {
    item_id: number;
    rank: number;
    suitability_type: string;
    non_subject_suitability: string;
    overall_evaluation: string;
    note: string;
    is_final_choice: boolean;
    is_hidden: boolean;
}

export const useUpdateRecommendationItem = () => {
    const params = useParams();
    const queryClient = useQueryClient();
    const studentId = parseInt(params.id as string, 10);
    const [error, setError] = useState<string | null>(null);

    const updateMutation = useMutation({
        mutationFn: updateRecommendationItem,
        onSuccess: () => {
            // 성공 시 관련 쿼리들 무효화
            queryClient.invalidateQueries({ queryKey: ['saved-recommendations', studentId] });
            setError(null);
        },
        onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : '추천 아이템 업데이트에 실패했습니다.';
            setError(errorMessage);
        }
    });

    const handleUpdate = async (data: UpdateRecommendationItemRequest) => {
        try {
            await updateMutation.mutateAsync(data);
        } catch (err) {
            throw err;
        }
    };

    return {
        isUpdating: updateMutation.isPending,
        error: error,
        handleUpdate
    };
}; 
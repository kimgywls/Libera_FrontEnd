import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { deleteRecommendationItem } from '../_actions/delete-recommendation-item';

interface UseDeleteRecommendationItemProps {
    recommendation_id: number;
    item_id: number;
}

export const useDeleteRecommendationItem = ({ recommendation_id, item_id }: UseDeleteRecommendationItemProps) => {
    const params = useParams();
    const queryClient = useQueryClient();
    const studentId = parseInt(params.id as string, 10);
    const [error, setError] = useState<string | null>(null);

    const deleteMutation = useMutation({
        mutationFn: () => deleteRecommendationItem({ recommendation_id, item_id }),
        onSuccess: () => {
            // 성공 시 관련 쿼리들 무효화
            queryClient.invalidateQueries({ queryKey: ['saved-recommendations', studentId] });
            setError(null);
        },
        onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : '추천 아이템 삭제에 실패했습니다.';
            setError(errorMessage);
        }
    });

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync();
        } catch (err) {
            throw err;
        }
    };

    return {
        isDeleting: deleteMutation.isPending,
        error: error,
        handleDelete
    };
}; 
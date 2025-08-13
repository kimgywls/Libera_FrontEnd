import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UniversityItem } from '@/app/types/university';
import { addRecommendationItem } from '../_actions/add-recommendation-item';
import type { AddRecommendationItemRequest } from '@/app/types/university';

interface UseAddRecommendationItemProps {
    selectedItems: number[];
    universityList: UniversityItem[];
    recommendationId: number;
    currentItemCount: number;
    allUniversityList?: UniversityItem[]; // 전체 학교 목록 추가
}

export const useAddRecommendationItem = ({
    selectedItems,
    universityList,
    recommendationId,
    currentItemCount,
    allUniversityList = [] // 기본값으로 빈 배열
}: UseAddRecommendationItemProps) => {
    const params = useParams();
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);

    // 추가 뮤테이션
    const addMutation = useMutation({
        mutationFn: async () => {
            if (selectedItems.length === 0) {
                throw new Error('선택된 학교가 없습니다.');
            }

            // 전체 학교 목록에서 선택된 학교들을 찾기 (우선순위: allUniversityList > universityList)
            const searchList = allUniversityList.length > 0 ? allUniversityList : universityList;

            // 선택된 학교들을 순위별로 정렬하여 items 배열 생성
            const items = selectedItems.map((admissionId, index) => {
                const university = searchList.find(uni => uni.admission_id === admissionId);
                if (!university) {
                    throw new Error(`학교 정보를 찾을 수 없습니다: ${admissionId}`);
                }

                // recommendation_type을 API에서 허용하는 suitability_type으로 매핑
                const getSuitabilityType = (recommendationType: string): string => {
                    switch (recommendationType) {
                        case '도전':
                            return '도전';
                        case '적정':
                            return '적정';
                        case '안전':
                            return '안정';
                        case '안정':
                            return '안정';
                        case '없음':
                            return '적정';
                        case '신설':
                            return '적정';
                        default:
                            return '적정'; // 기본값
                    }
                };

                const suitabilityType = getSuitabilityType(university.recommendation_type || '적합');

                const item: AddRecommendationItemRequest = {
                    admission_id: admissionId,
                    rank: currentItemCount + index + 1, // 기존 순위 다음부터 시작
                    suitability_type: suitabilityType,
                    non_subject_suitability: '추천',
                    overall_evaluation: '적정', // API에서 요구하는 기본값
                    note: '추천 학교',
                    is_final_choice: false
                };

                return item;
            });

            // 각 아이템을 순차적으로 추가
            const results = [];
            for (const item of items) {
                const result = await addRecommendationItem(recommendationId, item);
                results.push(result);
            }

            return results;
        },
        onSuccess: () => {
            // 성공 시 관련 쿼리들 무효화
            const studentId = params.id as string;
            queryClient.invalidateQueries({ queryKey: ['saved-recommendations', studentId] });
            queryClient.invalidateQueries({ queryKey: ['school-recommendations', studentId] });
            setError(null);
        },
        onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : '추천 학교 추가에 실패했습니다.';
            setError(errorMessage);
        }
    });

    const handleAddRecommendationItems = async () => {
        try {
            const response = await addMutation.mutateAsync();
            return response;
        } catch (err) {
            throw err;
        }
    };

    return {
        isAdding: addMutation.isPending,
        error,
        handleAddRecommendationItems
    };
}; 
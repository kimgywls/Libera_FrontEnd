import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import type { UniversityItem } from '@/app/types/university';
import { saveRecommendations } from '../_actions/save-recommendations';
import { getSavedRecommendations } from '../../comprehensive-evaluation/_actions/get-saved-recommendations';
import { useAddRecommendationItem } from './use-add-items-recommendation';
import type { SaveRecommendationRequest } from '@/app/types/university';

interface UseCreateOrAddRecommendationsProps {
    selectedItems: number[];
    universityList: UniversityItem[];
}

export const useCreateOrAddRecommendations = ({ selectedItems, universityList }: UseCreateOrAddRecommendationsProps) => {
    const params = useParams();
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);
    const studentId = parseInt(params.id as string, 10);

    // 기존 저장된 추천 리스트 조회
    const { data: existingRecommendations = [] } = useQuery({
        queryKey: ['saved-recommendations', studentId],
        queryFn: () => getSavedRecommendations({ student_id: studentId, rec_status: 'active' }),
        enabled: !!studentId,
    });

    // 기존 추천 리스트가 있는지 확인
    const hasExistingRecommendations = existingRecommendations.length > 0;
    const firstRecommendation = existingRecommendations[0];
    const currentItemCount = firstRecommendation?.items?.length || 0;

    // 새로운 학교 추가 훅 (기존 추천 리스트가 있을 때 사용)
    const addRecommendationHook = useAddRecommendationItem({
        selectedItems,
        universityList,
        recommendationId: firstRecommendation?.id || 0,
        currentItemCount
    });

    // 새로운 추천 리스트 생성 뮤테이션 (기존 추천 리스트가 없을 때 사용)
    const createMutation = useMutation({
        mutationFn: async () => {
            if (selectedItems.length === 0) {
                throw new Error('선택된 학교가 없습니다.');
            }

            const currentYear = new Date().getFullYear();
            const title = `${currentYear}년도 수시 추천 리스트`;

            // 선택된 학교들을 순위별로 정렬하여 items 배열 생성
            const items = selectedItems.map((admissionId, index) => {
                const university = universityList.find(uni => uni.admission_id === admissionId);
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
                            return '신설';
                        default:
                            return '적정'; // 기본값
                    }
                };

                const suitabilityType = getSuitabilityType(university.recommendation_type || '적정');

                const item = {
                    admission_id: admissionId,
                    rank: index + 1,
                    suitability_type: suitabilityType,
                    non_subject_suitability: '추천',
                    overall_evaluation: '적정',
                    note: '추천 학교',
                    is_final_choice: false
                };
                return item;
            });

            const requestData: SaveRecommendationRequest = {
                student_id: studentId,
                title,
                criteria: {
                    source: "ai_recommendation",
                    created_by: "admin",
                    selection_date: new Date().toISOString()
                },
                note: '추천 학교 리스트',
                items
            };

            return await saveRecommendations(requestData);
        },
        onSuccess: () => {
            // 성공 시 관련 쿼리들 무효화
            const studentId = params.id as string;
            queryClient.invalidateQueries({ queryKey: ['saved-recommendations', studentId] });
            queryClient.invalidateQueries({ queryKey: ['school-recommendations', studentId] });
            setError(null);
        },
        onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : '추천 학교 저장에 실패했습니다.';
            setError(errorMessage);
        }
    });

    const handleCreateOrAddRecommendations = async () => {
        try {
            if (hasExistingRecommendations && firstRecommendation) {
                // 기존 추천 리스트가 있으면 새로운 학교들을 추가
                return await addRecommendationHook.handleAddRecommendationItems();
            } else {
                // 기존 추천 리스트가 없으면 새로운 추천 리스트 생성
                return await createMutation.mutateAsync();
            }
        } catch (err) {
            throw err;
        }
    };

    return {
        isSaving: createMutation.isPending || addRecommendationHook.isAdding,
        error: error || addRecommendationHook.error,
        handleCreateOrAddRecommendations
    };
}; 
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    deleteCreativeActivity,
    deleteDetailedAbility,
    deleteBehavioralCharacteristic
} from '../_actions/delete-extracurricular-summary';

// 창의체험활동 삭제 훅
export function useDeleteCreativeActivity(studentId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (activityId: number) => deleteCreativeActivity(activityId),
        onSuccess: () => {
            // 캐시 무효화하여 데이터 새로고침
            queryClient.invalidateQueries({
                queryKey: ['extracurricular-summary', studentId]
            });
        },
        onError: (error) => {
            console.error('창의체험활동 삭제 실패:', error);
        }
    });
}

// 세부능력 및 특기사항 삭제 훅
export function useDeleteDetailedAbility(studentId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (abilityId: number) => deleteDetailedAbility(abilityId),
        onSuccess: () => {
            // 캐시 무효화하여 데이터 새로고침
            queryClient.invalidateQueries({
                queryKey: ['extracurricular-summary', studentId]
            });
        },
        onError: (error) => {
            console.error('세부능력 및 특기사항 삭제 실패:', error);
        }
    });
}

// 행동특성 및 종합의견 삭제 훅
export function useDeleteBehavioralCharacteristic(studentId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (characteristicId: number) => deleteBehavioralCharacteristic(characteristicId),
        onSuccess: () => {
            // 캐시 무효화하여 데이터 새로고침
            queryClient.invalidateQueries({
                queryKey: ['extracurricular-summary', studentId]
            });
        },
        onError: (error) => {
            console.error('행동특성 및 종합의견 삭제 실패:', error);
        }
    });
} 
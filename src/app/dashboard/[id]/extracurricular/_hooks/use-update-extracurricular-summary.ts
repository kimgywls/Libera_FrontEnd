import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    updateCreativeActivity,
    updateDetailedAbility,
    updateBehavioralCharacteristic,
    UpdateCreativeActivityRequest,
    UpdateDetailedAbilityRequest,
    UpdateBehavioralCharacteristicRequest
} from '../_actions/update-extracurricular-summary';

// 창의체험활동 업데이트 훅
export function useUpdateCreativeActivity(studentId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ activityId, data }: { activityId: number; data: UpdateCreativeActivityRequest }) =>
            updateCreativeActivity(activityId, data),
        onSuccess: () => {
            // 캐시 무효화하여 데이터 새로고침
            queryClient.invalidateQueries({
                queryKey: ['extracurricular-summary', studentId]
            });
        },
        onError: (error) => {
            console.error('창의체험활동 수정 실패:', error);
        }
    });
}

// 세부능력 및 특기사항 업데이트 훅
export function useUpdateDetailedAbility(studentId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ abilityId, data }: { abilityId: number; data: UpdateDetailedAbilityRequest }) =>
            updateDetailedAbility(abilityId, data),
        onSuccess: () => {
            // 캐시 무효화하여 데이터 새로고침
            queryClient.invalidateQueries({
                queryKey: ['extracurricular-summary', studentId]
            });
        },
        onError: (error) => {
            console.error('세부능력 및 특기사항 수정 실패:', error);
        }
    });
}

// 행동특성 및 종합의견 업데이트 훅
export function useUpdateBehavioralCharacteristic(studentId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ characteristicId, data }: { characteristicId: number; data: UpdateBehavioralCharacteristicRequest }) =>
            updateBehavioralCharacteristic(characteristicId, data),
        onSuccess: () => {
            // 캐시 무효화하여 데이터 새로고침
            queryClient.invalidateQueries({
                queryKey: ['extracurricular-summary', studentId]
            });
        },
        onError: (error) => {
            console.error('행동특성 및 종합의견 수정 실패:', error);
        }
    });
} 
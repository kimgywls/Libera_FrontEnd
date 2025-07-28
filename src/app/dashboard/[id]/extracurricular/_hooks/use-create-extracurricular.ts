import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createCreativeActivity,
    createDetailedAbility,
    createBehavioralCharacteristic,
    CreateCreativeActivityData,
    CreateDetailedAbilityData,
    CreateBehavioralCharacteristicData
} from '../_actions/create-extracurricular';

export const useCreateCreativeActivity = (studentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCreativeActivityData) => createCreativeActivity(studentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['extracurricular-summary', studentId] });
        },
        onError: (error: any) => {
            console.error('창의체험활동 추가 실패:', error);
            throw new Error('창의체험활동 추가에 실패했습니다: ' + (error?.message || '알 수 없는 오류'));
        }
    });
};

export const useCreateDetailedAbility = (studentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateDetailedAbilityData) => createDetailedAbility(studentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['extracurricular-summary', studentId] });
        },
        onError: (error: any) => {
            console.error('세부능력 및 특기사항 추가 실패:', error);
            throw new Error('세부능력 및 특기사항 추가에 실패했습니다: ' + (error?.message || '알 수 없는 오류'));
        }
    });
};

export const useCreateBehavioralCharacteristic = (studentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBehavioralCharacteristicData) => createBehavioralCharacteristic(studentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['extracurricular-summary', studentId] });
        },
        onError: (error: any) => {
            console.error('행동특성 및 종합의견 추가 실패:', error);
            throw new Error('행동특성 및 종합의견 추가에 실패했습니다: ' + (error?.message || '알 수 없는 오류'));
        }
    });
}; 
import { extracurricularApiService } from '@/app/lib/api-client';

// 창의체험활동 삭제
export async function deleteCreativeActivity(activityId: number): Promise<void> {
    try {
        await extracurricularApiService.delete(`/api/v1/extracurricular/creative-activities/${activityId}`);
    } catch (error) {
        console.error('[deleteCreativeActivity] error:', error);
        throw error;
    }
}

// 세부능력 및 특기사항 삭제
export async function deleteDetailedAbility(abilityId: number): Promise<void> {
    try {
        await extracurricularApiService.delete(`/api/v1/extracurricular/detailed-abilities/${abilityId}`);
    } catch (error) {
        console.error('[deleteDetailedAbility] error:', error);
        throw error;
    }
}

// 행동특성 및 종합의견 삭제
export async function deleteBehavioralCharacteristic(characteristicId: number): Promise<void> {
    try {
        await extracurricularApiService.delete(`/api/v1/extracurricular/behavioral-characteristics/${characteristicId}`);
    } catch (error) {
        console.error('[deleteBehavioralCharacteristic] error:', error);
        throw error;
    }
} 
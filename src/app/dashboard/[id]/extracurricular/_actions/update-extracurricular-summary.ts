import { extracurricularApiService } from '@/app/lib/api-client';
import { CreativeActivity, DetailedAbility, BehavioralCharacteristic } from '@/app/types/extracurricular';

// 창의체험활동 업데이트
export interface UpdateCreativeActivityRequest {
    grade: number;
    area: string;
    details: string;
}

export async function updateCreativeActivity(
    activityId: number,
    updateData: UpdateCreativeActivityRequest
): Promise<CreativeActivity> {
    try {
        const response = await extracurricularApiService.put<CreativeActivity>(
            `/api/v1/extracurricular/creative-activities/${activityId}`,
            updateData
        );

        if (!response) {
            throw new Error('No data in API response');
        }

        return response;
    } catch (error) {
        console.error('[updateCreativeActivity] error:', error);
        throw error;
    }
}

// 세부능력 및 특기사항 업데이트
export interface UpdateDetailedAbilityRequest {
    grade: number;
    semester: string;
    subject: string;
    content: string;
}

export async function updateDetailedAbility(
    abilityId: number,
    updateData: UpdateDetailedAbilityRequest
): Promise<DetailedAbility> {
    try {
        const response = await extracurricularApiService.put<DetailedAbility>(
            `/api/v1/extracurricular/detailed-abilities/${abilityId}`,
            updateData
        );

        if (!response) {
            throw new Error('No data in API response');
        }

        return response;
    } catch (error) {
        console.error('[updateDetailedAbility] error:', error);
        throw error;
    }
}

// 행동특성 및 종합의견 업데이트
export interface UpdateBehavioralCharacteristicRequest {
    grade: number;
    content: string;
}

export async function updateBehavioralCharacteristic(
    characteristicId: number,
    updateData: UpdateBehavioralCharacteristicRequest
): Promise<BehavioralCharacteristic> {
    try {
        const response = await extracurricularApiService.put<BehavioralCharacteristic>(
            `/api/v1/extracurricular/behavioral-characteristics/${characteristicId}`,
            updateData
        );

        if (!response) {
            throw new Error('No data in API response');
        }

        return response;
    } catch (error) {
        console.error('[updateBehavioralCharacteristic] error:', error);
        throw error;
    }
} 
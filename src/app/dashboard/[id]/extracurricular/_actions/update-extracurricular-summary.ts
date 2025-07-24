import axios, { AxiosError } from 'axios';

import { API_URL } from '@/app/constants';
import { CreativeActivity, DetailedAbility, BehavioralCharacteristic } from '@/app/types/extracurricular';

const api = axios.create({ baseURL: API_URL });

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
        const response = await api.put<CreativeActivity>(
            `/api/v1/api/extracurricular/creative-activities/${activityId}`,
            updateData
        );

        if (!response.data) {
            throw new Error('No data in API response');
        }

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[updateCreativeActivity] Axios error:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`창의체험활동 수정 실패: ${error.response?.status || 'Network Error'} - ${error.message}`);
        } else if (error instanceof Error) {
            console.error('[updateCreativeActivity] Error:', error.message);
            throw error;
        } else {
            console.error('[updateCreativeActivity] Unknown error:', error);
            throw new Error('창의체험활동 수정 중 알 수 없는 오류가 발생했습니다.');
        }
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
        const response = await api.put<DetailedAbility>(
            `/api/v1/api/extracurricular/detailed-abilities/${abilityId}`,
            updateData
        );

        if (!response.data) {
            throw new Error('No data in API response');
        }

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[updateDetailedAbility] Axios error:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`세부능력 및 특기사항 수정 실패: ${error.response?.status || 'Network Error'} - ${error.message}`);
        } else if (error instanceof Error) {
            console.error('[updateDetailedAbility] Error:', error.message);
            throw error;
        } else {
            console.error('[updateDetailedAbility] Unknown error:', error);
            throw new Error('세부능력 및 특기사항 수정 중 알 수 없는 오류가 발생했습니다.');
        }
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
        const response = await api.put<BehavioralCharacteristic>(
            `/api/v1/api/extracurricular/behavioral-characteristics/${characteristicId}`,
            updateData
        );

        if (!response.data) {
            throw new Error('No data in API response');
        }

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[updateBehavioralCharacteristic] Axios error:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`행동특성 및 종합의견 수정 실패: ${error.response?.status || 'Network Error'} - ${error.message}`);
        } else if (error instanceof Error) {
            console.error('[updateBehavioralCharacteristic] Error:', error.message);
            throw error;
        } else {
            console.error('[updateBehavioralCharacteristic] Unknown error:', error);
            throw new Error('행동특성 및 종합의견 수정 중 알 수 없는 오류가 발생했습니다.');
        }
    }
} 
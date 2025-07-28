import axios, { AxiosError } from 'axios';

import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

// 창의체험활동 삭제
export async function deleteCreativeActivity(activityId: number): Promise<void> {
    try {
        await api.delete(`/api/v1/extracurricular/creative-activities/${activityId}`);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[deleteCreativeActivity] Axios error:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`창의체험활동 삭제 실패: ${error.response?.status || 'Network Error'} - ${error.message}`);
        } else if (error instanceof Error) {
            console.error('[deleteCreativeActivity] Error:', error.message);
            throw error;
        } else {
            console.error('[deleteCreativeActivity] Unknown error:', error);
            throw new Error('창의체험활동 삭제 중 알 수 없는 오류가 발생했습니다.');
        }
    }
}

// 세부능력 및 특기사항 삭제
export async function deleteDetailedAbility(abilityId: number): Promise<void> {
    try {
        await api.delete(`/api/v1/extracurricular/detailed-abilities/${abilityId}`);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[deleteDetailedAbility] Axios error:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`세부능력 및 특기사항 삭제 실패: ${error.response?.status || 'Network Error'} - ${error.message}`);
        } else if (error instanceof Error) {
            console.error('[deleteDetailedAbility] Error:', error.message);
            throw error;
        } else {
            console.error('[deleteDetailedAbility] Unknown error:', error);
            throw new Error('세부능력 및 특기사항 삭제 중 알 수 없는 오류가 발생했습니다.');
        }
    }
}

// 행동특성 및 종합의견 삭제
export async function deleteBehavioralCharacteristic(characteristicId: number): Promise<void> {
    try {
        await api.delete(`/api/v1/extracurricular/behavioral-characteristics/${characteristicId}`);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[deleteBehavioralCharacteristic] Axios error:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`행동특성 및 종합의견 삭제 실패: ${error.response?.status || 'Network Error'} - ${error.message}`);
        } else if (error instanceof Error) {
            console.error('[deleteBehavioralCharacteristic] Error:', error.message);
            throw error;
        } else {
            console.error('[deleteBehavioralCharacteristic] Unknown error:', error);
            throw new Error('행동특성 및 종합의견 삭제 중 알 수 없는 오류가 발생했습니다.');
        }
    }
} 
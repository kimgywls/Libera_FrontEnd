import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

export interface CreateCreativeActivityData {
    grade: number;
    area: string;
    details: string;
}

export interface CreateDetailedAbilityData {
    grade: number;
    semester: string;
    subject: string;
    content: string;
}

export interface CreateBehavioralCharacteristicData {
    grade: number;
    content: string;
}

export const createCreativeActivity = async (studentId: number, data: CreateCreativeActivityData) => {
    const res = await api.post(`/api/v1/extracurricular/creative-activities/student/${studentId}`, data);
    return res.data;
};

export const createDetailedAbility = async (studentId: number, data: CreateDetailedAbilityData) => {
    const res = await api.post(`/api/v1/extracurricular/detailed-abilities/student/${studentId}`, data);
    return res.data;
};

export const createBehavioralCharacteristic = async (studentId: number, data: CreateBehavioralCharacteristicData) => {
    const res = await api.post(`/api/v1/extracurricular/behavioral-characteristics/student/${studentId}`, data);
    return res.data;
}; 
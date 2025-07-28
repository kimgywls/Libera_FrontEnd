import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

export interface CreateCreativeActivityData {
    grade: number;
    area: "자율활동" | "동아리활동" | "진로활동";
    details?: string | null;
    student_id: number;
}

export interface CreateDetailedAbilityData {
    grade: number;
    semester: "1" | "2" | "1,2";
    subject: string;
    content: string;
    student_id: number;
}

export interface CreateBehavioralCharacteristicData {
    grade: number;
    content: string;
    student_id: number;
}

export const createCreativeActivity = async (studentId: number, data: CreateCreativeActivityData) => {
    const res = await api.post("/api/v1/extracurricular/creative-activities", {
        ...data,
        student_id: studentId
    });
    return res.data;
};

export const createDetailedAbility = async (studentId: number, data: CreateDetailedAbilityData) => {
    const res = await api.post("/api/v1/extracurricular/detailed-abilities", {
        ...data,
        student_id: studentId
    });
    return res.data;
};

export const createBehavioralCharacteristic = async (studentId: number, data: CreateBehavioralCharacteristicData) => {
    const res = await api.post("/api/v1/extracurricular/behavioral-characteristics", {
        ...data,
        student_id: studentId
    });
    return res.data;
}; 
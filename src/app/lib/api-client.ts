import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '@/app/constants';

// API 에러 타입 정의
export class ApiError extends Error {
    constructor(
        public status: number,
        public code: string,
        message: string,
        public details?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// 네트워크 에러 타입
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

// 에러 처리 유틸리티
function handleApiError(error: unknown): never {
    if (error instanceof ApiError) {
        throw error;
    }

    // Axios 에러 체크
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data?: { code?: string; message?: string } } };
        const { status, data } = axiosError.response;
        throw new ApiError(
            status,
            data?.code || 'UNKNOWN_ERROR',
            data?.message || '알 수 없는 오류가 발생했습니다.',
            data
        );
    }

    // 네트워크 에러 체크
    if (error && typeof error === 'object' && 'request' in error) {
        throw new NetworkError('네트워크 연결에 실패했습니다.');
    }

    // 기타 에러
    const errorMessage = error instanceof Error ? error.message : '내부 서버 오류가 발생했습니다.';
    throw new ApiError(
        500,
        'INTERNAL_ERROR',
        errorMessage
    );
}

// API 클라이언트 설정
const createApiClient = (): AxiosInstance => {
    const client = axios.create({
        baseURL: API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // 요청 인터셉터
    client.interceptors.request.use(
        (config) => {
            // 요청 로깅 (개발 환경에서만)
            if (process.env.NODE_ENV === 'development') {
                console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
                    params: config.params,
                    data: config.data,
                });
            }
            return config;
        },
        (error) => {
            console.error('[API Request Error]', error);
            return Promise.reject(error);
        }
    );

    // 응답 인터셉터
    client.interceptors.response.use(
        (response: AxiosResponse) => {
            // 응답 로깅 (개발 환경에서만)
            if (process.env.NODE_ENV === 'development') {
                console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                    status: response.status,
                    data: response.data,
                });
            }
            return response;
        },
        (error) => {
            // 에러 처리 및 로깅
            console.error('[API Response Error]', {
                url: error.config?.url,
                method: error.config?.method,
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });

            // 구조화된 에러로 변환
            return Promise.reject(handleApiError(error));
        }
    );

    return client;
};

// API 클라이언트 인스턴스
export const apiClient = createApiClient();

// API 메서드 래퍼
export class ApiService {
    private client: AxiosInstance;

    constructor(client: AxiosInstance = apiClient) {
        this.client = client;
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.get<T>(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.patch<T>(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.delete<T>(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

// 기본 API 서비스 인스턴스
export const apiService = new ApiService();

// 특정 도메인별 API 서비스
export class StudentApiService extends ApiService {
    async getStudentDetail(studentId: number) {
        return this.get(`api/v1/students/${studentId}`);
    }

    async getAllStudents(params?: Record<string, unknown>) {
        return this.get('api/v1/students/', { params });
    }

    async deleteStudents(studentIds: number[]) {
        return this.delete('api/v1/students/', { data: { studentIds } });
    }
}

export class ScoreApiService extends ApiService {
    async getStudentScores(studentId: number) {
        return this.get(`api/v1/scores/students/${studentId}`);
    }

    async createScore(data: unknown) {
        return this.post('api/v1/scores/', data);
    }

    async updateScore(scoreId: number, data: unknown) {
        return this.put(`api/v1/scores/${scoreId}`, data);
    }

    async deleteScore(scoreId: number) {
        return this.delete(`api/v1/scores/${scoreId}`);
    }

    async bulkUpdateScores(data: unknown) {
        return this.put('api/v1/scores/bulk', data);
    }
}

export class AttendanceApiService extends ApiService {
    async getAttendance(studentId: number) {
        return this.get(`api/v1/attendance/students/${studentId}`);
    }
}

export class DesiredSchoolApiService extends ApiService {
    async getDesiredSchools(studentId: number) {
        return this.get(`api/v1/desired-schools/student/${studentId}`);
    }

    async addDesiredSchool(data: unknown) {
        return this.post('api/v1/desired-schools/', data);
    }

    async deleteDesiredSchool(desiredSchoolId: number) {
        return this.delete(`api/v1/desired-schools/${desiredSchoolId}`);
    }
}

export class ExtracurricularApiService extends ApiService {
    async getExtracurricular(studentId: number) {
        return this.get(`api/v1/extracurricular/students/${studentId}`);
    }
}

export class ChecklistApiService extends ApiService {
    async getQuestions() {
        return this.get('api/v1/checklist/questions/');
    }

    async submitChecklist(data: unknown) {
        return this.post('api/v1/checklist/submit/', data);
    }

    async getResults(studentId: number) {
        return this.get(`api/v1/checklist/results/${studentId}`);
    }
}

export class UniversityApiService extends ApiService {
    async getRecommendations(studentId: number, params?: Record<string, unknown>) {
        return this.get(`api/v1/universities/recommendations/${studentId}`, { params });
    }

    async saveRecommendation(data: unknown) {
        return this.post('api/v1/universities/recommendations/', data);
    }

    async getSavedRecommendations(studentId: number, params?: Record<string, unknown>) {
        return this.get(`api/v1/universities/recommendations/saved/${studentId}`, { params });
    }
}

// API 서비스 인스턴스들
export const studentApiService = new StudentApiService();
export const scoreApiService = new ScoreApiService();
export const attendanceApiService = new AttendanceApiService();
export const desiredSchoolApiService = new DesiredSchoolApiService();
export const extracurricularApiService = new ExtracurricularApiService();
export const checklistApiService = new ChecklistApiService();
export const universityApiService = new UniversityApiService();

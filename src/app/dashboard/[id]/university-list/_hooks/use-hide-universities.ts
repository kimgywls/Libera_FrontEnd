import { useState, useCallback, useEffect } from 'react';
import { hideUniversities, HideUniversitiesResponse } from '../_actions/hide-universities';
import { unhideUniversities } from '../_actions/hide-universities';
import { fetchHiddenUniversities } from '../_actions/hide-universities';
import type { UniversityItem } from '@/app/types/university';

interface UseHideUniversitiesResult {
    hide: (studentId: number, admissionIds: number[]) => Promise<HideUniversitiesResponse>;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export function useHideUniversities(): UseHideUniversitiesResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const hide = useCallback(async (studentId: number, admissionIds: number[]) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            // console.log('[useHideUniversities] hide 호출', { studentId, admissionIds });
            const res = await hideUniversities(studentId, admissionIds);
            // console.log('[useHideUniversities] hide 결과', res);
            setSuccess(res.success);
            if (!res.success) {
                setError(res.message || '숨기기 실패');
            }
            return res;
        } catch (e) {
            // console.error('[useHideUniversities] hide 에러', e);
            setError((e as Error).message || '숨기기 요청 중 오류 발생');
            setSuccess(false);
            return { success: false, message: '숨기기 요청 중 오류 발생' };
        } finally {
            setLoading(false);
        }
    }, []);

    return { hide, loading, error, success };
}

interface UseUnhideUniversitiesResult {
    unhide: (studentId: number, admissionIds: number[]) => Promise<HideUniversitiesResponse>;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export function useUnhideUniversities(): UseUnhideUniversitiesResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const unhide = useCallback(async (studentId: number, admissionIds: number[]) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            // console.log('[useUnhideUniversities] unhide 호출', { studentId, admissionIds });
            const res = await unhideUniversities(studentId, admissionIds);
            // console.log('[useUnhideUniversities] unhide 결과', res);
            setSuccess(res.success);
            if (!res.success) {
                setError(res.message || '숨기기 해제 실패');
            }
            return res;
        } catch (e) {
            // console.error('[useUnhideUniversities] unhide 에러', e);
            setError((e as Error).message || '숨기기 해제 요청 중 오류 발생');
            setSuccess(false);
            return { success: false, message: '숨기기 해제 요청 중 오류 발생' };
        } finally {
            setLoading(false);
        }
    }, []);

    return { unhide, loading, error, success };
}

interface UseHiddenUniversitiesResult {
    hiddenList: UniversityItem[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useHiddenUniversities(studentId: number | undefined): UseHiddenUniversitiesResult {
    const [hiddenList, setHiddenList] = useState<UniversityItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchList = useCallback(async () => {
        if (!studentId) return;
        setLoading(true);
        setError(null);
        try {
            // console.log('[useHiddenUniversities] fetchList 호출', studentId);
            const data = await fetchHiddenUniversities(studentId);
            // console.log('[useHiddenUniversities] fetchList 결과', data);
            setHiddenList(data);
        } catch (e) {
            // console.error('[useHiddenUniversities] fetchList 에러', e);
            setError((e as Error).message || '숨긴 학교 목록 조회 실패');
        } finally {
            setLoading(false);
        }
    }, [studentId]);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    return { hiddenList, loading, error, refetch: fetchList };
} 
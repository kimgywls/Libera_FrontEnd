import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { SchoolRecommendationResponse, UniversityItem } from '@/app/types/university';
import { fetchHiddenUniversities, hideUniversities, unhideUniversities } from '../_actions/hide-universities';

interface UseUniversityHideResult {
    hiddenList: UniversityItem[];
    showHidden: boolean;
    setShowHidden: (value: boolean | ((prev: boolean) => boolean)) => void;
    handleHideList: () => Promise<void>;
    handleUnhide: (admissionId: number) => Promise<void>;
    handleUnhideAll: () => Promise<void>;
    selectedItems: number[];
    handleSelectItem: (id: number) => void;
    handleSelectAll: (admissionIds: number[]) => void;
    alert: {
        open: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
    };
    setAlert: (alert: {
        open: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
    }) => void;
}

export function useUniversityHide(
    data: SchoolRecommendationResponse | null
): UseUniversityHideResult {
    const studentId = data?.student_id;
    const queryClient = useQueryClient();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [showHidden, setShowHidden] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        title: '',
        description: '',
        onConfirm: () => {},
    });

    // 숨긴 학교 목록 조회
    const { data: hiddenList = [] } = useQuery({
        queryKey: ['hiddenUniversities', studentId],
        queryFn: () => fetchHiddenUniversities(studentId!),
        enabled: !!studentId,
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    // 숨기기 뮤테이션
    const hideMutation = useMutation({
        mutationFn: (admissionIds: number[]) => hideUniversities(studentId!, admissionIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hiddenUniversities', studentId] });
        },
        onError: (error) => {
            console.error('숨기기 에러:', error);
        },
    });

    // 숨김 해제 뮤테이션
    const unhideMutation = useMutation({
        mutationFn: (admissionId: number) => unhideUniversities(studentId!, [admissionId]),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hiddenUniversities', studentId] });
        },
        onError: (error) => {
            console.error('숨김 해제 에러:', error);
        },
    });

    const handleSelectItem = useCallback((id: number) => {
        setSelectedItems(prev => {
            const newItems = prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id];
            return newItems;
        });
    }, []);

    const handleSelectAll = useCallback((admissionIds: number[]) => {
        setSelectedItems(admissionIds);
    }, []);

    const handleHideList = async () => {
        if (!studentId || selectedItems.length === 0) return;

        try {
            // 이미 숨겨진 학교들 제외
            const hiddenAdmissionIds = hiddenList.map(school => school.admission_id);
            const uniqueItems = selectedItems.filter(id => !hiddenAdmissionIds.includes(id));
            
            if (uniqueItems.length === 0) {
                setAlert({
                    open: true,
                    title: '알림',
                    description: '선택한 학교들이 이미 숨겨져 있습니다.',
                    onConfirm: () => setAlert(prev => ({ ...prev, open: false })),
                });
                setSelectedItems([]);
                return;
            }

            const response = await hideMutation.mutateAsync(uniqueItems);
            
            // 서버 응답에 따라 캐시 업데이트
            if (response.hidden_count && response.hidden_count > 0) {
                // 숨기기 성공 시 캐시 무효화하여 서버에서 최신 데이터 가져오기
                await queryClient.invalidateQueries({ queryKey: ['hiddenUniversities', studentId] });
            }
            
            setSelectedItems([]);
            
            setAlert({
                open: true,
                title: '성공',
                description: `${response.hidden_count || 0}개 학교가 숨겨졌습니다.`,
                onConfirm: () => setAlert(prev => ({ ...prev, open: false })),
            });
        } catch (error) {
            console.error('숨기기 에러:', error);
            const errorMessage = error instanceof Error ? error.message : '학교 숨기기에 실패했습니다.';
            setAlert({
                open: true,
                title: '오류',
                description: errorMessage,
                onConfirm: () => setAlert(prev => ({ ...prev, open: false })),
            });
        }
    };

    const handleUnhide = useCallback(async (admissionId: number) => {
        try {
            await unhideMutation.mutateAsync(admissionId);
            
            setAlert({
                open: true,
                title: '성공',
                description: '학교 숨김을 해제했습니다.',
                onConfirm: () => setAlert(prev => ({ ...prev, open: false })),
            });
        } catch (error) {
            console.error('숨김 해제 에러:', error);
            const errorMessage = error instanceof Error ? error.message : '학교 숨김 해제에 실패했습니다.';
            setAlert({
                open: true,
                title: '오류',
                description: errorMessage,
                onConfirm: () => setAlert(prev => ({ ...prev, open: false })),
            });
        }
    }, [unhideMutation, studentId]);

    const handleUnhideAll = useCallback(async () => {
        if (!studentId || hiddenList.length === 0) return;

        try {
            const admissionIds = hiddenList.map(school => school.admission_id);
            
            // 한 번의 API 호출로 모든 학교 숨김 해제
            await unhideUniversities(studentId, admissionIds);
            
            // 캐시 무효화
            await queryClient.invalidateQueries({ queryKey: ['hiddenUniversities', studentId] });
            
            setAlert({
                open: true,
                title: '성공',
                description: `${hiddenList.length}개 학교의 숨김을 모두 해제했습니다.`,
                onConfirm: () => setAlert(prev => ({ ...prev, open: false })),
            });
        } catch (error) {
            console.error('전체 숨김 해제 에러:', error);
            const errorMessage = error instanceof Error ? error.message : '전체 숨김 해제에 실패했습니다.';
            setAlert({
                open: true,
                title: '오류',
                description: errorMessage,
                onConfirm: () => setAlert(prev => ({ ...prev, open: false })),
            });
        }
    }, [studentId, hiddenList, queryClient]);

    return {
        hiddenList,
        showHidden,
        setShowHidden,
        handleHideList,
        handleUnhide,
        handleUnhideAll,
        selectedItems,
        handleSelectItem,
        handleSelectAll,
        alert,
        setAlert,
    };
} 
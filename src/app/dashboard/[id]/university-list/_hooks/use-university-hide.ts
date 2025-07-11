import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { SchoolRecommendationResponse } from '@/app/types/university';
import type { UniversityItem } from '@/app/types/university';
import {
    fetchHiddenUniversities,
    hideUniversities,
    unhideUniversities,
} from '../_actions/hide-universities';

interface UseUniversityHideResult {
    hiddenList: UniversityItem[];
    showHidden: boolean;
    setShowHidden: (value: boolean | ((prev: boolean) => boolean)) => void;
    handleHideList: () => Promise<void>;
    handleUnhide: (admissionId: number) => Promise<void>;
    selectedItems: number[];
    setSelectedItems: (v: number[]) => void;
    handleSelectItem: (admissionId: number) => void;
    handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    alert: {
        open: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
    };
    setAlert: React.Dispatch<React.SetStateAction<{
        open: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
    }>>;
}

export function useUniversityHide(
    data: SchoolRecommendationResponse | null,
    displayUniversityList: UniversityItem[],
    filteredUniversityList: UniversityItem[]
): UseUniversityHideResult {
    const studentId = data?.student_id;
    const queryClient = useQueryClient();

    // 숨긴 학교 목록 useQuery
    const { data: hiddenList = [], refetch } = useQuery({
        queryKey: ['hiddenUniversities', studentId],
        queryFn: () => studentId ? fetchHiddenUniversities(studentId) : Promise.resolve([]),
        enabled: !!studentId,
    });

    // 숨기기 useMutation
    const hideMutation = useMutation({
        mutationFn: (admissionIds: number[]) => hideUniversities(studentId!, admissionIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hiddenUniversities', studentId] });
        },
    });

    // 숨김 해제 useMutation
    const unhideMutation = useMutation({
        mutationFn: (admissionIds: number[]) => unhideUniversities(studentId!, admissionIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hiddenUniversities', studentId] });
        },
    });

    const [showHidden, setShowHidden] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [alert, setAlert] = useState({
        open: false,
        title: '',
        description: '',
        onConfirm: () => setAlert(a => ({ ...a, open: false })),
    });

    const handleSelectItem = useCallback((admissionId: number) => {
        setSelectedItems(prev =>
            prev.includes(admissionId)
                ? prev.filter(id => id !== admissionId)
                : [...prev, admissionId]
        );
    }, []);

    const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedItems(filteredUniversityList.map(u => u.admission_id));
        } else {
            setSelectedItems([]);
        }
    }, [filteredUniversityList]);

    const handleHideList = useCallback(async () => {
        if (!data || selectedItems.length === 0) {
            setAlert({
                open: true,
                title: '알림',
                description: '숨길 학교를 선택하세요.',
                onConfirm: () => setAlert(a => ({ ...a, open: false })),
            });
            return;
        }
        const res = await hideMutation.mutateAsync(selectedItems);
        if (res.success) {
            setSelectedItems([]);
            setAlert({
                open: true,
                title: '성공',
                description: res.message || '학교가 숨겨졌습니다.',
                onConfirm: () => setAlert(a => ({ ...a, open: false })),
            });
        } else {
            setAlert({
                open: true,
                title: '실패',
                description: res.message || '숨기기 실패',
                onConfirm: () => setAlert(a => ({ ...a, open: false })),
            });
        }
    }, [data, selectedItems, hideMutation]);

    const handleUnhide = useCallback(async (admissionId: number) => {
        if (!data) return;
        const res = await unhideMutation.mutateAsync([admissionId]);
        if (res.success) {
            setAlert({
                open: true,
                title: '성공',
                description: res.message || '숨기기 해제 완료',
                onConfirm: () => setAlert(a => ({ ...a, open: false })),
            });
        } else {
            setAlert({
                open: true,
                title: '실패',
                description: res.message || '숨기기 해제 실패',
                onConfirm: () => setAlert(a => ({ ...a, open: false })),
            });
        }
    }, [data, unhideMutation]);

    return {
        hiddenList,
        showHidden,
        setShowHidden,
        handleHideList,
        handleUnhide,
        selectedItems,
        setSelectedItems,
        handleSelectItem,
        handleSelectAll,
        alert,
        setAlert,
    };
} 
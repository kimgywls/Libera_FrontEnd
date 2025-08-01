import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import type { UniversityInfo } from '@/app/types/university';
import { getSavedRecommendations } from '../../comprehensive-evaluation/_actions/get-saved-recommendations';

export const useSavedUniversities = () => {
    const params = useParams();
    const queryClient = useQueryClient();
    const studentId = parseInt(params.id as string, 10);

    // 저장된 추천 학교들 조회
    const { data: savedRecommendations = [] } = useQuery({
        queryKey: ['saved-recommendations', studentId],
        queryFn: () => getSavedRecommendations({ student_id: studentId, rec_status: 'active' }),
        enabled: !!studentId,
        staleTime: 5 * 60 * 1000, // 5분
    });

    // 저장된 학교들의 admission_id 추출
    const savedUniversities = new Set<number>();
    savedRecommendations.forEach((rec: any) => {
        rec.items.forEach((item: any) => {
            savedUniversities.add(item.admission_id);
        });
    });

    // 저장된 학교 추가 뮤테이션
    const addSavedUniversitiesMutation = useMutation({
        mutationFn: (admissionIds: number[]) => {
            return Promise.resolve(admissionIds);
        },
        onSuccess: (admissionIds) => {
            // 저장된 추천 학교 쿼리 무효화하여 서버에서 최신 데이터 가져오기
            queryClient.invalidateQueries({ queryKey: ['saved-recommendations', studentId] });
        },
    });

    const addSavedUniversities = (admissionIds: number[]) => {
        addSavedUniversitiesMutation.mutate(admissionIds);
    };

    const isUniversitySaved = (admissionId: number) => {
        return savedUniversities.has(admissionId);
    };

    const getUnsavedUniversities = (universities: UniversityInfo[]) => {
        return universities.filter(uni => !savedUniversities.has(uni.admission_id));
    };

    return {
        savedUniversities,
        addSavedUniversities,
        isUniversitySaved,
        getUnsavedUniversities
    };
}; 
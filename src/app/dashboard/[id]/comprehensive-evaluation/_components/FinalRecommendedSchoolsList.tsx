import { FC, useState, useEffect, useMemo } from "react";
import { useUpdateRecommendationItem } from '../_hooks/use-update-recommendation-item';
import { useDeleteRecommendationItem } from '../_hooks/use-delete-recommendation-item';
import type { SavedUniversityItem, SavedRecommendation } from '@/app/types/university';
import BaseTable from '@/app/dashboard/_components/BaseTable';
import Section from '@/app/dashboard/_components/Section';
import DataState from '@/app/dashboard/_components/DataState';
import { AlertModal } from '@/app/components/modal/AlertModal';
import { useModalState } from '@/app/hooks/useModalState';
import { NON_SCORE_RECOMMEND_TYPE_COLOR, RECOMMEND_TYPE_COLOR } from '@/app/constants';

interface EditableItem extends SavedUniversityItem {
    isModified?: boolean;
    recommendation_id: number;
}

interface FinalRecommendedSchoolsListProps {
    savedRecommendations: SavedRecommendation[] | undefined;
    isLoading: boolean;
    error: Error | null;
}

const FinalRecommendedSchoolsList: FC<FinalRecommendedSchoolsListProps> = ({
    savedRecommendations,
    isLoading,
    error
}) => {
    const { handleUpdate, isUpdating, error: updateError } = useUpdateRecommendationItem();
    const [deleteParams, setDeleteParams] = useState({ recommendation_id: 0, item_id: 0 });
    const { handleDelete, isDeleting, error: deleteError } = useDeleteRecommendationItem(deleteParams);
    const { openModal, closeModal, isModalOpen } = useModalState();
    const [itemToDelete, setItemToDelete] = useState<EditableItem | null>(null);

    // 모든 저장된 추천 학교의 아이템들을 하나의 배열로 합치고 순위별로 정렬 (메모이제이션)
    const sortedItems = useMemo(() => {
        const allSavedItems: EditableItem[] = savedRecommendations?.flatMap(rec =>
            rec.items.map(item => ({ ...item, recommendation_id: rec.id }))
        ) || [];
        return allSavedItems.sort((a, b) => a.rank - b.rank);
    }, [savedRecommendations]);

    // 편집 가능한 아이템 상태 관리
    const [editableItems, setEditableItems] = useState<EditableItem[]>([]);

    // sortedItems가 변경될 때마다 editableItems 업데이트
    useEffect(() => {
        if (sortedItems.length > 0) {
            setEditableItems(sortedItems.map(item => ({ ...item, isModified: false })));
        }
    }, [sortedItems]);

    // 순위 옵션 (동적으로 생성)
    const rankOptions = useMemo(() => {
        // 실제 데이터의 최대 순위와 아이템 개수 중 더 큰 값 사용
        const actualMaxRank = editableItems.length > 0 ? Math.max(...editableItems.map(item => item.rank)) : 0;
        const maxRank = Math.max(actualMaxRank, editableItems.length, 10);
        return Array.from({ length: maxRank }, (_, i) => i + 1);
    }, [editableItems]);


    // 지원적정성 옵션
    const suitabilityOptions = [
        { value: '도전', label: '도전' },
        { value: '적정', label: '적정' },
        { value: '안정', label: '안정' },
    ];

    // 필드 변경 핸들러
    const handleFieldChange = (itemId: number, field: keyof EditableItem, value: string | number | boolean) => {
        setEditableItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, [field]: value, isModified: true }
                    : item
            )
        );
    };

    // 저장 핸들러
    const handleSave = async () => {
        const modifiedItems = editableItems.filter(item => item.isModified);

        if (modifiedItems.length === 0) {
            return;
        }

        try {
            // 각 수정된 아이템을 순차적으로 업데이트
            for (const item of modifiedItems) {
                await handleUpdate({
                    item_id: item.id,
                    rank: item.rank,
                    suitability_type: item.suitability_type,
                    non_subject_suitability: item.non_subject_suitability,
                    overall_evaluation: item.overall_evaluation,
                    note: item.note || '',
                    is_final_choice: item.is_final_choice,
                    is_hidden: item.is_hidden
                });
            }

            // 저장 성공 후 수정 플래그 초기화
            setEditableItems(prev =>
                prev.map(item => ({ ...item, isModified: false }))
            );
        } catch (err) {
            console.error('저장 중 오류 발생:', err);
        }
    };

    // 수정된 아이템이 있는지 확인
    const hasModifiedItems = editableItems.some(item => item.isModified);

    // 삭제 확인 핸들러
    const handleDeleteConfirm = (item: EditableItem) => {
        setItemToDelete(item);
        openModal('deleteConfirm');
    };

    // 삭제 실행 핸들러
    const handleDeleteItem = async () => {
        if (!itemToDelete) return;

        try {
            setDeleteParams({ recommendation_id: itemToDelete.recommendation_id, item_id: itemToDelete.id });
            await handleDelete();

            // 삭제 성공 시 로컬 상태에서만 제거 (순서 재정렬 없음)
            setEditableItems(prev => prev.filter(item => item.id !== itemToDelete.id));

            closeModal('deleteConfirm');
            setItemToDelete(null);
        } catch (err) {
            console.error('삭제 중 오류 발생:', err);
        }
    };

    const columns = [
        {
            key: 'rank' as const,
            label: '순서',
            render: (value: string | number | boolean | null | undefined, row: EditableItem) => (
                <select
                    value={row.rank}
                    onChange={(e) => handleFieldChange(row.id, 'rank', parseInt(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm min-w-[50px]"
                >
                    {rankOptions.map(rank => (
                        <option key={rank} value={rank}>{rank}</option>
                    ))}
                </select>
            )
        },
        { key: 'university_name' as const, label: '대학명' },
        { key: 'admission_type' as const, label: '전형명' },
        { key: 'admission_category' as const, label: '유형구분' },
        { key: 'major_name' as const, label: '학과명' },
        {
            key: 'suitability_type' as const,
            label: '교과 판정',
            render: (value: string | number | boolean | null | undefined, row: EditableItem) => {
                // 백엔드에서 '신설'로 저장된 것을 프론트엔드에서 '적정'으로 표시
                const displayText = row.suitability_type === '신설' ? '적정' : row.suitability_type;
                const colorKey = row.suitability_type === '신설' ? '적정' : row.suitability_type;

                return (
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${RECOMMEND_TYPE_COLOR[colorKey]} `}>
                        {displayText}
                    </span>
                );
            }
        },
        {
            key: 'non_subject_suitability' as const,
            label: '비교과 판정',
            render: (value: string | number | boolean | null | undefined, row: EditableItem) => (
                <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${NON_SCORE_RECOMMEND_TYPE_COLOR[row.non_subject_suitability]}`}>
                    {row.non_subject_suitability}
                </span>
            )
        },
        {
            key: 'overall_evaluation' as const,
            label: '지원적정성',
            render: (value: string | number | boolean | null | undefined, row: EditableItem) => (
                <select
                    value={row.overall_evaluation}
                    onChange={(e) => handleFieldChange(row.id, 'overall_evaluation', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm min-w-[70px]"
                >
                    {suitabilityOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            )
        },
        {
            key: 'id' as const,
            label: '취소',
            render: (value: string | number | boolean | null | undefined, row: EditableItem) => (
                <button
                    onClick={() => handleDeleteConfirm(row)}
                    disabled={isDeleting}
                    className="font-medium text-red-500 text-sm rounded hover:underline hover:font-bold disabled:text-gray-700 disabled:cursor-not-allowed transition-colors"
                >
                    {isDeleting ? '삭제 중...' : '추천 취소'}
                </button>
            )
        }
    ];

    return (
        <Section
            title={`최종 학교 추천 리스트 (${editableItems.length})`}
            headerContent={
                <button
                    onClick={handleSave}
                    disabled={!hasModifiedItems || isUpdating}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${hasModifiedItems && !isUpdating
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {isUpdating ? '저장 중...' : '저장하기'}
                </button>
            }
        >
            {updateError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {updateError}
                </div>
            )}

            {deleteError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {deleteError}
                </div>
            )}

            <DataState
                isLoading={isLoading}
                isError={!!error}
                isEmpty={!savedRecommendations || savedRecommendations.length === 0}
                loadingMessage="저장된 추천 학교를 불러오는 중..."
                errorMessage="저장된 추천 학교를 불러오는데 실패했습니다."
                emptyMessage="저장된 추천 학교가 없습니다."
            >
                <BaseTable
                    columns={columns}
                    data={editableItems}
                    className="mt-4"
                />
            </DataState>

            {/* 삭제 확인 모달 */}
            <AlertModal
                open={isModalOpen('deleteConfirm')}
                title="추천 취소 확인"
                description={itemToDelete ? `${itemToDelete.university_name}의 추천을 취소하시겠습니까?` : ''}
                confirmText={isDeleting ? '삭제 중...' : '추천 취소'}
                cancelText="취소"
                onConfirm={handleDeleteItem}
                onCancel={() => {
                    closeModal('deleteConfirm');
                    setItemToDelete(null);
                }}
            />
        </Section>
    );
};

export default FinalRecommendedSchoolsList;  
import React, { useState, useCallback } from 'react';

import { AlertModal } from '../../components/modal/AlertModal';
import { useDeleteStudent } from '../_hooks/use-delete-student';

interface DeleteStudentButtonProps {
    selectedIds: number[];
    onDeleted: () => void;
}

export const DeleteStudentButton: React.FC<DeleteStudentButtonProps> = React.memo(({ selectedIds, onDeleted }) => {
    const [open, setOpen] = useState(false);
    const { deleteStudents, isLoading, error, reset } = useDeleteStudent();

    const handleClick = useCallback(() => {
        if (selectedIds.length === 0) {
            alert('삭제할 학생을 선택하세요.');
            return;
        }
        setOpen(true);
        reset();
    }, [selectedIds, reset]);

    const handleConfirm = useCallback(async () => {
        try {
            const result = await deleteStudents(selectedIds);
            if (result.success) {
                setOpen(false);
                onDeleted();
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error('학생 삭제 중 오류:', err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    }, [deleteStudents, selectedIds, onDeleted]);

    const handleCancel = useCallback(() => {
        setOpen(false);
        reset();
    }, [reset]);

    return (
        <>
            <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                onClick={handleClick}
                disabled={isLoading || selectedIds.length === 0}
            >
                {isLoading ? '삭제 중...' : `선택한 학생 삭제 (${selectedIds.length})`}
            </button>
            <AlertModal
                open={open}
                title="정말 삭제하시겠습니까?"
                description={`이 작업은 되돌릴 수 없습니다\n선택한 ${selectedIds.length}명의 학생과 관련된 모든 데이터(학생 기본정보, 성적데이터, 출결데이터, 학교 이력, 희망 학교정보, 기타 학생과 관련된 모든 데이터)가 영구적으로 삭제됩니다\n실행 전 충분한 확인이 필요합니다`}
                confirmText="영구 삭제"
                cancelText="취소"
                onConfirm={handleConfirm}
                onCancel={handleCancel}

            />
            {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>}
        </>
    );
});

DeleteStudentButton.displayName = 'DeleteStudentButton'; 
'use client';

import React, { useState, useCallback } from 'react';

import { AlertModal } from '../../components/modal/AlertModal';
import { useModalState } from '../../hooks/useModalState';
import { StudentListParams } from '@/app/types/common';

import { useAllStudentsList } from '../_hooks/use-all-students-list';
import { useDeleteStudent } from '../_hooks/use-delete-student';

import { AddStudentModal } from './_modal/AddStudentModal';
import { StudentsListButtons } from './StudentsListButtons';
import { StudentsSearchForm } from './StudentsSearchForm';
import { StudentsTable } from './StudentsTable';

export const StudentsListWidget: React.FC = React.memo(() => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchParams, setSearchParams] = useState<StudentListParams>({});
    const [errorMessage, setErrorMessage] = useState<string>('');

    // 훅들을 사용하여 로직 분리
    const { students, isLoading, isError } = useAllStudentsList(searchParams);
    const { deleteSelectedStudents, isLoading: isDeleting } = useDeleteStudent();
    const { openModal, closeModal, isModalOpen } = useModalState();

    const handleSearch = useCallback((params: StudentListParams) => {
        setSearchParams(params);
    }, []);

    const handleDeleteConfirm = useCallback(async () => {
        try {
            const result = await deleteSelectedStudents(selectedIds);
            if (result.success) {
                setSelectedIds([]);
                closeModal('deleteStudent');
            } else {
                setErrorMessage(result.message);
                openModal('error');
            }
        } catch (error) {
            console.error('학생 삭제 중 오류:', error);
            setErrorMessage('학생 삭제 중 오류가 발생했습니다.');
            openModal('error');
        }
    }, [selectedIds, deleteSelectedStudents, closeModal, openModal]);

    return (
        <div className="w-full h-full p-2">
            <div className="flex justify-between items-center mb-2">
                <div className="w-full flex justify-start">
                    <StudentsSearchForm value={searchParams} onChange={handleSearch} />
                </div>
                <StudentsListButtons
                    openModal={openModal}
                    selectedIds={selectedIds}
                    isDeleting={isDeleting}
                />
            </div>
            <div className="h-[90%] overflow-y-auto mb-4">
                {isLoading ? (
                    <div>로딩 중...</div>
                ) : isError ? (
                    <div>데이터를 불러오지 못했습니다.</div>
                ) : (
                    <StudentsTable
                        students={students}
                        onSelect={setSelectedIds}
                    />
                )}
            </div>

            <AddStudentModal
                open={isModalOpen('addStudent')}
                onClose={() => closeModal('addStudent')}
            />

            <AlertModal
                open={isModalOpen('deleteStudent')}
                title="정말 삭제하시겠습니까?"
                description={`이 작업은 되돌릴 수 없습니다\n${selectedIds.length}명의 학생과 관련된 모든 데이터가 영구적으로 삭제됩니다`}
                confirmText="삭제"
                cancelText="취소"
                onConfirm={handleDeleteConfirm}
                onCancel={() => closeModal('deleteStudent')}

            />

            <AlertModal
                open={isModalOpen('error')}
                title="오류 발생"
                description={errorMessage}
                confirmText="확인"
                onConfirm={() => closeModal('error')}
                onCancel={() => closeModal('error')}
            />

        </div>
    );
});

StudentsListWidget.displayName = 'StudentsListWidget';

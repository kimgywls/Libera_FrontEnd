'use client';

import React, { useState, useCallback } from 'react';

import { AlertModal } from '../../components/modal/AlertModal';
import { useModalState } from '../../hooks/useModalState';

import { useAllStudentsList } from '../_hooks/use-all-students-list';

import { AddStudentModal } from './_modal/AddStudentModal';
import { StudentsListButtons } from './StudentsListButtons';
import { StudentsSearchForm } from './StudentsSearchForm';
import { StudentsTable } from './StudentsTable';

export const StudentsListWidget: React.FC = React.memo(() => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const { students, isLoading, isError, mutate } = useAllStudentsList();
    const { openModal, closeModal, isModalOpen } = useModalState();

    // 학생 삭제 모달 확인 핸들러
    const handleDeleteConfirm = useCallback(async () => {
        try {
            for (const id of selectedIds) {
                await fetch(`/api/v1/students/${id}`, { method: 'DELETE' });
            }
            mutate();
            closeModal('deleteStudent');
        } catch {
            // 에러 핸들링 필요시 추가
        }
    }, [selectedIds, mutate, closeModal]);

    return (
        <div className="w-full h-full p-2">
            <div className="flex justify-between items-center mb-2">
                <div className="w-full flex justify-start">
                    <StudentsSearchForm value={{}} onChange={() => { }} />
                </div>
                <StudentsListButtons openModal={openModal} students={students} />
            </div>
            <div className="h-[600px] overflow-y-auto mb-4">
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
                description={`이 작업은 되돌릴 수 없습니다\n모든 관련 데이터(학생 기본정보, 성적데이터, 출결데이터, 학교 이력, 희망 학교정보, 기타 학생과 관련된 모든 데이터)가 영구적으로 삭제됩니다\n실행 전 충분한 확인이 필요합니다`}
                confirmText="영구 삭제"
                cancelText="취소"
                onConfirm={handleDeleteConfirm}
                onCancel={() => closeModal('deleteStudent')}
            />

        </div>
    );
});

StudentsListWidget.displayName = 'StudentsListWidget';

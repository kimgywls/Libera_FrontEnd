'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useStudentsList } from '../_hooks/use-students-list';
import { StudentsListParams } from '@/app/types/student';
import { StudentsTable } from './StudentsTable';
import { StudentsSearchForm } from './StudentsSearchForm';
import { StudentsPagination } from './StudentsPagination';
import { AddStudentModal } from './_modal/AddStudentModal';
import { AlertModal } from '../../components/modal/AlertModal';
import { useModalState } from '../../hooks/useModalState';
import { StudentsListButtons } from './StudentsListButtons';

const LIMIT = 20;

export const StudentsListWidget: React.FC = React.memo(() => {
    const [search, setSearch] = useState<StudentsListParams>({ limit: LIMIT, offset: 0 });
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const { students, total, isLoading, isError, mutate } = useStudentsList(search);
    const { openModal, closeModal, isModalOpen } = useModalState();

    const totalPages = useMemo(() => Math.ceil(total / (search.limit || LIMIT)), [total, search.limit]);
    const currentPage = useMemo(() => Math.floor((search.offset || 0) / (search.limit || LIMIT)) + 1, [search]);

    const handleSearchChange = useCallback((params: StudentsListParams) => {
        setSearch(params);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setSearch(prev => ({ ...prev, limit: prev.limit || LIMIT, offset: ((prev.limit || LIMIT) * (page - 1)) }));
    }, []);

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
                    <StudentsSearchForm value={search} onChange={handleSearchChange} /></div>
                <StudentsListButtons openModal={openModal} students={students} />
            </div>
            <div className="h-[600px] overflow-y-auto mb-4">
                {isLoading ? (
                    <div>로딩 중...</div>
                ) : isError ? (
                    <div>데이터를 불러오지 못했습니다.</div>
                ) : (
                    <StudentsTable students={students} onSelect={setSelectedIds} />
                )}
            </div>

            <StudentsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
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

import { FC } from "react";
import { useRouter } from "next/navigation";

interface StudentsListButtonsProps {
    openModal: (modalName: string) => void;
    selectedIds: number[];
    isDeleting: boolean;
}

export const StudentsListButtons: FC<StudentsListButtonsProps> = ({
    openModal,
    selectedIds,
    isDeleting
}) => {
    const router = useRouter();

    return (
        <div className="flex items-center gap-2 mr-4">
            <button
                type="button"
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 mr-2 whitespace-nowrap"
                onClick={() => openModal('addStudent')}
            >
                학생 추가
            </button>

            <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                    if (!selectedIds.length) {
                        alert('삭제할 학생을 선택하세요.');
                        return;
                    }
                    openModal('deleteStudent');
                }}
                disabled={isDeleting || selectedIds.length === 0}
            >
                {isDeleting ? '삭제 중...' : `학생 삭제 (${selectedIds.length}명)`}
            </button>

            <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 whitespace-nowrap"
                onClick={() => router.push('/main/settings')}
            >
                입학 데이터 추가
            </button>
        </div>
    );
};
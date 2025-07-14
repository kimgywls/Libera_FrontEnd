import type { ChecklistResponseItem } from "@/app/types/checklist";
import { useChecklistSubmit } from "../_hooks/use-checklist-submit";
import { useStudentInfoContext } from "@/app/dashboard/_contexts/StudentInfoContext";
import { useState } from "react";
import { AlertModal } from "@/app/components/modal/AlertModal";
import { useModalState } from '@/app/hooks/useModalState';

interface ChecklistSubmitButtonProps {
    responses: ChecklistResponseItem[];
    totalQuestions: number;
}

export default function ChecklistSubmitButton({ responses, totalQuestions }: ChecklistSubmitButtonProps) {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id;
    const mutation = useChecklistSubmit();

    const { openModal, closeModal, isModalOpen } = useModalState();
    const [alert, setAlert] = useState({
        title: "",
        description: "",
    });

    const handleSubmit = () => {
        if (!studentId) return;
        mutation.mutate({ student_id: studentId, responses }, {
            onSuccess: () => {
                if (responses.length === totalQuestions) {
                    setAlert({
                        title: "제출 성공",
                        description: "모든 체크리스트 항목이 성공적으로 제출되었습니다.",
                    });
                } else {
                    setAlert({
                        title: "임시 제출 성공",
                        description: `입력한 항목까지 임시로 제출되었습니다. (${responses.length}/${totalQuestions})`,
                    });
                }
                openModal('alert');
            }
        });
    };

    const handleAlertClose = () => closeModal('alert');

    return (
        <div className="flex justify-end">
            <button
                className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-md"
                onClick={handleSubmit}
                disabled={mutation.isPending}
            >
                제출
            </button>
            <AlertModal
                open={isModalOpen('alert')}
                title={alert.title}
                description={alert.description}
                onConfirm={handleAlertClose}
                onCancel={handleAlertClose}
            />
        </div>
    );
}
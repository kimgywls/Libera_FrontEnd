import type { ChecklistResponseItem } from "@/app/types/checklist";
import { useChecklistSubmit } from "../_hooks/use-checklist-submit";
import { useStudentInfoContext } from "@/app/dashboard/_contexts/StudentInfoContext";

interface ChecklistSubmitButtonProps {
    responses: ChecklistResponseItem[];
}

export default function ChecklistSubmitButton({ responses }: ChecklistSubmitButtonProps) {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id;
    const mutation = useChecklistSubmit();

    const handleSubmit = () => {
        if (!studentId) return;
        mutation.mutate({ student_id: studentId, responses });
    };

    return (
        <div className="flex justify-end">
            <button
                className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-md"
                onClick={handleSubmit}
                disabled={mutation.isPending}
            >
                제출
            </button>
        </div>
    );
}
import { useState } from "react";

import type { ChecklistResponseItem } from "@/app/types/checklist";
import { useStudentInfoContext } from "@/app/contexts/StudentInfoContext";
import { useModalState } from '@/app/hooks/useModalState';

import { useChecklistSubmit } from "../_hooks/use-checklist-submit";

import { AlertModal } from "@/app/components/modal/AlertModal";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ChecklistSubmitButtonProps {
    responses: ChecklistResponseItem[];
    totalQuestions: number;
    onSuccess?: () => void;
}

export default function ChecklistSubmitButton({ responses, totalQuestions, onSuccess }: ChecklistSubmitButtonProps) {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id;
    const mutation = useChecklistSubmit();

    const { openModal, closeModal, isModalOpen } = useModalState();
    const [alert, setAlert] = useState({
        title: "",
        description: "",
    });
    const [isExpanded, setIsExpanded] = useState(true);

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
                onSuccess?.();
            }
        });
    };

    const handleAlertClose = () => closeModal('alert');
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    return (
        <>

            {/* 플로팅 제출 버튼 */}
            <div
                className="fixed bottom-8 right-8 z-50"
                style={{
                    animation: 'slideInFromBottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                {isExpanded ? (
                    <div className="w-[350px]">
                        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 hover:shadow-2xl hover:-translate-y-1">
                            {/* 토글 버튼 */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-indigo-600 transition-colors duration-200" onClick={toggleExpanded}>
                                <ChevronDown className="w-5 h-5 text-white" />
                            </div>

                            {/* 확장된 컨텐츠 */}
                            <div className="p-6">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-full">
                                        {/* 진행률 표시 */}
                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                            <div
                                                className="bg-indigo-500/70 h-2 rounded-full "
                                                style={{
                                                    width: `${Math.min((responses.length / totalQuestions) * 100, 100)}%`
                                                }}
                                            ></div>
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            disabled={mutation.isPending}
                                            className="relative overflow-hidden bg-violet-500 hover:bg-violet-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed hover:scale-105 min-w-[140px] justify-center w-full"
                                        >
                                            {/* 버튼 배경 애니메이션 */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"></div>

                                            {/* 버튼 내용 */}
                                            <div className="relative flex items-center gap-2">
                                                {mutation.isPending ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        <span className="text-white">제출 중...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-white">
                                                            체크리스트 제출 ({responses.length}/{totalQuestions})
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                    {/* 자동 저장 안내 메시지 */}
                                    <div className="text-sm text-gray-700 text-center">
                                        <span>* 5초마다 자동 저장됩니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 글로우 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-3xl blur-xl -z-10 opacity-60"></div>
                    </div>
                ) : (
                    <div className="w-16 h-16 aspect-square">
                        <div className="bg-white/95 backdrop-blur-lg rounded-full shadow-2xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer aspect-square" onClick={toggleExpanded}>
                            {/* 토글 버튼 */}
                            <div className="w-full h-full bg-indigo-500 rounded-full p-1 flex flex-col items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors duration-200 aspect-square">
                                <ChevronUp className="w-6 h-6 text-white" />
                                <span className="text-white">제출</span>
                            </div>
                        </div>

                        {/* 글로우 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-xl -z-10 opacity-60"></div>
                    </div>
                )}
            </div>

            <AlertModal
                open={isModalOpen('alert')}
                title={alert.title}
                description={alert.description}
                onConfirm={handleAlertClose}
                onCancel={handleAlertClose}
            />

            {/* 애니메이션을 위한 CSS */}
            <style jsx>{`
                @keyframes slideInFromBottom {
                    from {
                        transform: translateY(100%) scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
}
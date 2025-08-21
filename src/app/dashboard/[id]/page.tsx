'use client';

import { useRouter } from "next/navigation";

import { useStudentInfoContext } from "@/app/contexts/StudentInfoContext";

export default function DashboardPage() {
    const router = useRouter();
    const { studentInfo } = useStudentInfoContext();

    // 학생이 선택된 경우 해당 학생의 scores 페이지로 리다이렉트
    if (studentInfo) {
        router.push(`/dashboard/${studentInfo.id}/scores`);
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">페이지를 이동하는 중...</p>
                </div>
            </div>
        );
    }

}
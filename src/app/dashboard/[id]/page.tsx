import { useRouter } from "next/navigation";
import { useStudentContext } from "@/app/dashboard/_contexts/StudentContext";

export default function DashboardPage() {
    const router = useRouter();
    const { student } = useStudentContext();

    // 학생이 선택된 경우 해당 학생의 scores 페이지로 리다이렉트
    if (student) {
        router.push(`/dashboard/${student.id}/scores`);
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
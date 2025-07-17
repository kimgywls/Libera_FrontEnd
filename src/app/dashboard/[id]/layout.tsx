'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    BookOpen,
    FileText,
    School,
    ListCheck,
    BarChart3,
} from 'lucide-react';
import { useParams } from "next/navigation";
import { useAllStudentsList } from "@/app/main/_hooks/use-all-students-list";
import { ReactNode } from "react";
import { StudentInfoProvider } from "@/app/dashboard/_contexts/StudentInfoContext";

// 타입 정의
interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
}

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const { id } = useParams();
    const { students } = useAllStudentsList();
    const selectedStudent = students.find((s) => s.id === Number(id));

    // 네비게이션 항목 정의
    const navigation: NavItem[] = [
        {
            name: "교과",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/scores` : "/main",
            icon: BookOpen,
            description: "교과 성적 관리"
        },
        {
            name: "비교과",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/non-scores` : "/main",
            icon: FileText,
            description: "비교과 활동 관리"
        },
        {
            name: "학교 리스트",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/university-list` : "/main",
            icon: School,
            description: "대학 진학 추천"
        },
        {
            name: "체크리스트",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/checklist` : "/main",
            icon: ListCheck,
            description: "학생부 종합 체크리스트"
        },
        {
            name: "종합 평가",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/comprehensive-evaluation` : "/main",
            icon: BarChart3,
            description: "종합 성적 분석"
        },
    ];

    // 현재 경로 확인 함수
    const isActivePath = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard' || pathname === `/dashboard/${selectedStudent?.id}`;
        }
        return pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-violet-50 flex">
            {/* 사이드바 */}
            <div className="w-60 min-w-[240px] max-w-[240px] bg-white shadow-lg flex flex-col flex-shrink-0">
                {/* 사이드바 헤더 */}
                <div className="flex items-center h-16 px-6 border-b border-gray-200">
                    <div className="flex items-center ">
                        <span className="text-xl font-bold text-gray-900 cursor-pointer"
                            onClick={() => router.push("/main")}>Libera</span>
                    </div>
                </div>


                {/* 네비게이션 메뉴 */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = isActivePath(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                    ${isActive
                                        ? 'bg-violet-100 text-gray-700 '
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }
                                `}
                            >
                                <IconComponent className={`
                                    mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200
                                    ${isActive ? 'text-violet-600' : 'text-gray-500 group-hover:text-gray-700'}
                                `} />
                                <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col">
                {/* 상단 헤더 */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-900">
                                {selectedStudent?.name} 학생의 대시보드
                            </h1>
                        </div>
                    </div>
                </header>

                {/* 페이지 컨텐츠 */}
                <main className="flex-1 p-3">
                    {selectedStudent ? (
                        <StudentInfoProvider student={selectedStudent}>
                            {children}
                        </StudentInfoProvider>
                    ) : (
                        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm" />
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
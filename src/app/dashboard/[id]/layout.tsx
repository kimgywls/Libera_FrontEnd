'use client';

import Link from 'next/link';
import { usePathname, useRouter, useParams } from 'next/navigation';
import {
    BookOpen,
    FileText,
    School,
    ListCheck,
    BarChart3,
} from 'lucide-react';
import { useAllStudentsList } from "@/app/main/_hooks/use-all-students-list";
import { ReactNode, useEffect } from "react";
import { StudentInfoProvider } from "@/app/contexts/StudentInfoContext";
import { Student } from '@/app/types/student';

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    subItems?: Array<{ name: string; href: string; description: string }>;
}

interface DashboardLayoutProps {
    children: ReactNode;
}

interface DashboardContentProps {
    children: ReactNode;
    selectedStudent: Student;
}

const DashboardContent = ({ children, selectedStudent }: DashboardContentProps) => {
    const pathname = usePathname();
    const isResultReportPage = pathname.includes('/result-report');

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                body {
                    margin: 0;
                    padding: 0;
                    background: white !important;
                }
    
                .no-print {
                    display: none !important;
                }
    
                .print-content {
                    margin-left: 0 !important;
                    width: 100% !important;
                    padding: 0 !important;
                }
    
                * {
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, []);

    useEffect(() => {
        if (selectedStudent?.name && isResultReportPage) {
            document.title = `${selectedStudent.name}_결과보고서`;
        }
    }, [selectedStudent, isResultReportPage]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <header className="bg-white shadow-sm border-b border-gray-200 no-print">
                <div className="flex items-center justify-between h-16 px-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-semibold text-gray-900">
                            {selectedStudent?.name} 학생의 대시보드
                        </h1>
                    </div>
                    <div>
                        {isResultReportPage && (
                            <button
                                onClick={handlePrint}
                                className="px-6 py-3 rounded-lg font-medium bg-violet-500 text-white hover:bg-violet-600 transition-colors no-print"
                            >
                                결과보고서 생성
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 p-3 print-content">
                {children}
            </main>
        </>
    );
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const { id } = useParams();
    const { students } = useAllStudentsList();
    const selectedStudent = students.find((s) => s.id === Number(id));
    const isActivePath = (href: string) => pathname.startsWith(href);

    const navigation: NavItem[] = [
        {
            name: "교과",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/scores` : "/main",
            icon: BookOpen,
            description: "교과 성적 관리",
        },
        {
            name: "비교과",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/extracurricular` : "/main",
            icon: FileText,
            description: "비교과 활동 관리",
        },
        {
            name: "학교 리스트",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/university-list` : "/main",
            icon: School,
            description: "대학 진학 추천",
        },
        {
            name: "체크리스트",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/checklist` : "/main",
            icon: ListCheck,
            description: "학생부 종합 체크리스트",
        },
        {
            name: "종합 평가",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/comprehensive-evaluation` : "/main",
            icon: BarChart3,
            description: "종합 성적 분석",
        },
        {
            name: "결과보고서",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/result-report` : "/main",
            icon: FileText,
            description: "결과보고서",
        }
    ];

    return (
        <div className="min-h-screen bg-violet-50 flex">
            <div className="w-60 min-w-[240px] max-w-[240px] bg-white shadow-lg flex flex-col fixed top-0 left-0 h-screen z-10 no-print">
                <div className="flex items-center h-16 px-6 border-b border-gray-200">
                    <span
                        className="text-xl font-bold text-gray-900 cursor-pointer"
                        onClick={() => router.push("/main")}
                    >
                        Libera
                    </span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = isActivePath(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-violet-100 text-gray-700'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                                `}
                            >
                                <IconComponent className={`
                                    mr-3 h-5 w-5
                                    ${isActive ? 'text-violet-600' : 'text-gray-500 group-hover:text-gray-700'}
                                `} />
                                <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-gray-500">{item.description}</div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="flex-1 flex flex-col ml-60 print-content">
                {selectedStudent ? (
                    <StudentInfoProvider studentId={selectedStudent.id}>
                        <DashboardContent selectedStudent={selectedStudent}>
                            {children}
                        </DashboardContent>
                    </StudentInfoProvider>
                ) : (
                    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm" />
                )}
            </div>
        </div>
    );
};

export default DashboardLayout;

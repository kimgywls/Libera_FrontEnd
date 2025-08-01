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
import { ReactNode, useState } from "react";
import { StudentInfoProvider } from "@/app/contexts/StudentInfoContext";
import { useReportData } from './result-report/hooks/use-report-data';
import { ReportPDFViewer, captureChartAsImage, captureIndividualCharts } from './result-report';
import { Student } from '@/app/types/student';

// 타입 정의
interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    subItems?: Array<{
        name: string;
        href: string;
        description: string;
    }>;
}

interface Html2CanvasOptions {
    backgroundColor?: string;
    scale?: number;
    useCORS?: boolean;
    allowTaint?: boolean;
    logging?: boolean;
    removeContainer?: boolean;
    foreignObjectRendering?: boolean;
    imageTimeout?: number;
    width?: number;
    height?: number;
    onclone?: (clonedDoc: Document) => void;
}

interface Html2CanvasWindow extends Window {
    html2canvas?: (element: HTMLElement, options?: Html2CanvasOptions) => Promise<HTMLCanvasElement>;
}

interface DashboardLayoutProps {
    children: ReactNode;
}

// 내부 컴포넌트: StudentInfoProvider 내부에서 실행
interface DashboardContentProps {
    children: ReactNode;
    selectedStudent: Student;
}

const DashboardContent = ({ children, selectedStudent }: DashboardContentProps) => {
    const { reportData } = useReportData(selectedStudent?.id || 0);
    const [showReport, setShowReport] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [chartImages, setChartImages] = useState<{
        checklistChart?: string;
        semesterTrendCharts?: string[];
    }>({});

    // 페이지에서 차트 캡처하는 함수
    const captureChartFromPage = async (pageUrl: string, chartId: string): Promise<string> => {
        return new Promise((resolve) => {

            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.left = '-9999px';
            iframe.style.width = '1200px';
            iframe.style.height = '800px';
            iframe.style.border = 'none';
            iframe.style.visibility = 'hidden';

            document.body.appendChild(iframe);

            const cleanup = () => {
                if (iframe.parentNode) {
                    document.body.removeChild(iframe);
                }
            };

            const timeout = setTimeout(() => {
                cleanup();
                resolve('');
            }, 15000); // 15초 타임아웃

            iframe.onload = async () => {
                try {
                    // 페이지 로딩 대기
                    await new Promise(resolve => setTimeout(resolve, 3000));

                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    const iframeWindow = iframe.contentWindow;

                    if (!iframeDoc || !iframeWindow) {
                        clearTimeout(timeout);
                        cleanup();
                        resolve('');
                        return;
                    }

                    // html2canvas 스크립트가 없으면 로드
                    const html2canvasWindow = iframeWindow as Html2CanvasWindow;
                    if (!html2canvasWindow.html2canvas) {
                        const script = iframeDoc.createElement('script');
                        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
                        iframeDoc.head.appendChild(script);

                        // 스크립트 로딩 대기
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }

                    const chartElement = iframeDoc.getElementById(chartId);
                    if (!chartElement) {
                        clearTimeout(timeout);
                        cleanup();
                        resolve('');
                        return;
                    }

                    // html2canvas가 iframe 내에서 로드되었는지 확인
                    if (!iframeWindow || !html2canvasWindow.html2canvas) {
                        clearTimeout(timeout);
                        cleanup();
                        resolve('');
                        return;
                    }

                    // iframe 내에서 html2canvas 실행
                    const html2canvasOptions: Html2CanvasOptions = {
                        backgroundColor: '#ffffff',
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        logging: false,
                        onclone: (clonedDoc: Document) => {
                            const allElements = clonedDoc.querySelectorAll('*');
                            allElements.forEach((el) => {
                                const computedStyle = iframeWindow!.getComputedStyle(el);
                                if (computedStyle.color && computedStyle.color.includes('oklch')) {
                                    (el as HTMLElement).style.color = '#000000';
                                }
                                if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('oklch')) {
                                    (el as HTMLElement).style.backgroundColor = '#ffffff';
                                }
                            });
                        }
                    };
                    const canvas = await html2canvasWindow.html2canvas!(chartElement, html2canvasOptions);

                    const dataUrl = canvas.toDataURL('image/png');

                    clearTimeout(timeout);
                    cleanup();
                    resolve(dataUrl);
                } catch {
                    clearTimeout(timeout);
                    cleanup();
                    resolve('');
                }
            };

            iframe.onerror = () => {
                clearTimeout(timeout);
                cleanup();
                resolve('');
            };

            iframe.src = pageUrl;
        });
    };

    // 석차등급 차트들을 iframe에서 캡처하는 함수
    const captureSemesterChartsFromPage = async (pageUrl: string): Promise<string[]> => {
        return new Promise((resolve) => {

            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.left = '-9999px';
            iframe.style.width = '1200px';
            iframe.style.height = '800px';
            iframe.style.border = 'none';
            iframe.style.visibility = 'hidden';

            document.body.appendChild(iframe);

            const cleanup = () => {
                if (iframe.parentNode) {
                    document.body.removeChild(iframe);
                }
            };

            const timeout = setTimeout(() => {
                cleanup();
                resolve([]);
            }, 20000); // 20초 타임아웃

            iframe.onload = async () => {
                try {
                    // 페이지 로딩 대기
                    await new Promise(resolve => setTimeout(resolve, 4000));

                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    const iframeWindow = iframe.contentWindow;

                    if (!iframeDoc || !iframeWindow) {
                        clearTimeout(timeout);
                        cleanup();
                        resolve([]);
                        return;
                    }

                    // html2canvas 스크립트가 없으면 로드
                    const html2canvasWindow = iframeWindow as Html2CanvasWindow;
                    if (!html2canvasWindow.html2canvas) {
                        const script = iframeDoc.createElement('script');
                        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
                        iframeDoc.head.appendChild(script);

                        // 스크립트 로딩 대기
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }

                    const chartElements = iframeDoc.querySelectorAll('[id^="chart-"]');
                    if (chartElements.length === 0) {
                        clearTimeout(timeout);
                        cleanup();
                        resolve([]);
                        return;
                    }

                    // html2canvas가 iframe 내에서 로드되었는지 확인
                    if (!iframeWindow || !html2canvasWindow.html2canvas) {
                        clearTimeout(timeout);
                        cleanup();
                        resolve([]);
                        return;
                    }

                    // 각 차트를 순차적으로 캡처
                    const capturedCharts: string[] = [];
                    for (let i = 0; i < chartElements.length; i++) {
                        const chartElement = chartElements[i] as HTMLElement;
                        try {
                            const html2canvasOptions: Html2CanvasOptions = {
                                backgroundColor: '#ffffff',
                                scale: 2,
                                useCORS: true,
                                allowTaint: true,
                                logging: false,
                                onclone: (clonedDoc: Document) => {
                                    const allElements = clonedDoc.querySelectorAll('*');
                                    allElements.forEach((el) => {
                                        const computedStyle = iframeWindow!.getComputedStyle(el);
                                        if (computedStyle.color && computedStyle.color.includes('oklch')) {
                                            (el as HTMLElement).style.color = '#000000';
                                        }
                                        if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('oklch')) {
                                            (el as HTMLElement).style.backgroundColor = '#ffffff';
                                        }
                                    });
                                }
                            };
                            const canvas = await html2canvasWindow.html2canvas!(chartElement, html2canvasOptions);

                            const dataUrl = canvas.toDataURL('image/png');
                            if (dataUrl && dataUrl.length > 1000) {
                                capturedCharts.push(dataUrl);
                            }
                        } catch {
                            // 캡처 실패 시 무시
                        }
                    }

                    clearTimeout(timeout);
                    cleanup();
                    resolve(capturedCharts);
                } catch {
                    clearTimeout(timeout);
                    cleanup();
                    resolve([]);
                }
            };

            iframe.onerror = () => {
                clearTimeout(timeout);
                cleanup();
                resolve([]);
            };

            iframe.src = pageUrl;
        });
    };

    // 결과보고서 생성 함수
    const handleShowReport = async () => {
        try {
            setIsCapturing(true);

            let checklistChart = '';
            let semesterTrendCharts: string[] = [];
            const studentId = selectedStudent?.id;



            if (!studentId) {
                return;
            }

            // 체크리스트 차트 캡처 시도
            const checklistElement = document.getElementById('checklist-score-chart');
            if (checklistElement) {
                try {
                    ;
                    checklistChart = await captureChartAsImage('checklist-score-chart');
                    //console.log('체크리스트 차트 캡처 성공:', checklistChart ? 'true' : 'false');
                } catch (error) {
                    console.error('체크리스트 차트 캡처 실패:', error);
                    checklistChart = '';
                }
            }

            // 석차등급 추이 차트 캡처 시도
            const chartElements = document.querySelectorAll('[id^="chart-"]');
            if (chartElements.length > 0) {
                const chartIds = Array.from(chartElements).map(el => el.id);
                const individualCharts = await captureIndividualCharts('semester-trend-charts', chartIds);
                semesterTrendCharts = individualCharts.filter(chart => chart.length > 0);

            }

            // 체크리스트 차트가 없으면 체크리스트 페이지에서 캡처
            if (!checklistChart) {
                checklistChart = await captureChartFromPage(
                    `/dashboard/${studentId}/checklist`,
                    'checklist-score-chart'
                );
            }

            // 석차등급 차트가 없으면 교과 페이지에서 캡처
            if (semesterTrendCharts.length === 0) {
                semesterTrendCharts = await captureSemesterChartsFromPage(
                    `/dashboard/${studentId}/scores`
                );
            }

            // 결과 설정 및 보고서 표시
            setChartImages({
                checklistChart: checklistChart || undefined,
                semesterTrendCharts: semesterTrendCharts.length > 0 ? semesterTrendCharts : undefined,
            });

            setShowReport(true);
        } catch {
            setShowReport(true);
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <>
            {/* 상단 헤더 */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="flex items-center justify-between h-16 px-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-semibold text-gray-900">
                            {selectedStudent?.name} 학생의 대시보드
                        </h1>
                    </div>
                    <div>
                        <button
                            onClick={handleShowReport}
                            disabled={!reportData || isCapturing}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${reportData && !isCapturing
                                ? 'bg-violet-500 text-white hover:bg-violet-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {isCapturing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    차트 캡처 중...
                                </>
                            ) : (
                                '결과보고서 생성'
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* 페이지 컨텐츠 */}
            <main className="flex-1 p-3">
                {children}
            </main>

            {/* PDF 뷰어 */}
            {showReport && reportData && (
                <ReportPDFViewer
                    data={reportData}
                    chartImages={chartImages}
                    onClose={() => setShowReport(false)}
                />
            )}
        </>
    );
};

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
            description: "교과 성적 관리",
            subItems: [
                { name: "출석", href: selectedStudent ? `/dashboard/${selectedStudent.id}/scores#attendance-section` : "/main", description: "출석 현황" },
                { name: "내신 성적", href: selectedStudent ? `/dashboard/${selectedStudent.id}/scores#scores-section` : "/main", description: "학년별 내신 성적" },
                { name: "내신성적 추이", href: selectedStudent ? `/dashboard/${selectedStudent.id}/scores#trend-section` : "/main", description: "성적 추이 분석" },
            ]
        },
        {
            name: "비교과",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/extracurricular` : "/main",
            icon: FileText,
            description: "비교과 활동 관리",
            subItems: [
                { name: "창의체험활동", href: selectedStudent ? `/dashboard/${selectedStudent.id}/extracurricular#creative-section` : "/main", description: "창의적 체험활동" },
                { name: "세부능력 및 특기사항", href: selectedStudent ? `/dashboard/${selectedStudent.id}/extracurricular#detailed-section` : "/main", description: "세부능력 및 특기사항" },
                { name: "행동특성 및 종합의견", href: selectedStudent ? `/dashboard/${selectedStudent.id}/extracurricular#behavioral-section` : "/main", description: "행동특성 및 종합의견" },
            ]
        },
        {
            name: "학교 리스트",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/university-list` : "/main",
            icon: School,
            description: "대학 진학 추천",
            subItems: [
                { name: "추천 대학 리스트", href: selectedStudent ? `/dashboard/${selectedStudent.id}/university-list` : "/main", description: "대학 진학 추천" },
                { name: "숨긴 대학 리스트", href: selectedStudent ? `/dashboard/${selectedStudent.id}/university-list#hidden-section` : "/main", description: "숨긴 대학 리스트" },
            ]
        },
        {
            name: "체크리스트",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/checklist` : "/main",
            icon: ListCheck,
            description: "학생부 종합 체크리스트",
            subItems: [
                { name: "학업역량", href: selectedStudent ? `/dashboard/${selectedStudent.id}/checklist#academic-section` : "/main", description: "학업역량" },
                { name: "진로역량", href: selectedStudent ? `/dashboard/${selectedStudent.id}/checklist#career-section` : "/main", description: "진로역량" },
                { name: "공동체역량", href: selectedStudent ? `/dashboard/${selectedStudent.id}/checklist#community-section` : "/main", description: "공동체역량" },
                { name: "체크리스트 점수", href: selectedStudent ? `/dashboard/${selectedStudent.id}/checklist#checklist-score-summary-section` : "/main", description: "체크리스트 점수 요약" },
            ]
        },
        {
            name: "종합 평가",
            href: selectedStudent ? `/dashboard/${selectedStudent.id}/comprehensive-evaluation` : "/main",
            icon: BarChart3,
            description: "종합 성적 분석",
            subItems: [
                { name: "최종 학교 추천 리스트", href: selectedStudent ? `/dashboard/${selectedStudent.id}/comprehensive-evaluation#final-recommended-schools-section` : "/main", description: "최종 학교 추천 리스트" },
                { name: "학생부 종합 평가", href: selectedStudent ? `/dashboard/${selectedStudent.id}/comprehensive-evaluation#category-evaluation-section` : "/main", description: "학생부 종합 평가" },
                { name: "전체 종합 의견", href: selectedStudent ? `/dashboard/${selectedStudent.id}/comprehensive-evaluation#overall-evaluation-section` : "/main", description: "전체 종합 의견" },
            ]
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
            <div className="w-60 min-w-[240px] max-w-[240px] bg-white shadow-lg flex flex-col flex-shrink-0 fixed top-0 left-0 h-screen z-10">
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
                            <div key={item.name}>
                                <Link
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

                                {/* 서브 아이템 렌더링 */}
                                {item.subItems && isActive && (
                                    <div className=" mt-2 space-y-1">
                                        {item.subItems.map((subItem) => {
                                            const isSubActive = pathname.includes(subItem.href.split('#')[0]) && pathname.includes(subItem.href.split('#')[1]);
                                            return (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className={`
                                                        block pl-10 py-1 text-sm rounded-md transition-all duration-200
                                                        ${isSubActive
                                                            ? 'bg-violet-50 text-violet-700 border-l-2 border-violet-500'
                                                            : 'text-gray-600 hover:bg-violet-50 hover:text-gray-800'
                                                        }
                                                    `}
                                                >
                                                    <div className="font-medium"> <span className="text-gray-500 mr-1">-</span> {subItem.name}</div>

                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col ml-60">
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
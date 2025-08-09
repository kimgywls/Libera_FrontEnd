import { FC } from "react";
import { StudentInfo } from "@/app/types/student";

interface ResultReportCoverProps {
    student: StudentInfo;
}

const ResultReportCover: FC<ResultReportCoverProps> = ({ student }) => {
    // 날짜 포맷팅 함수
    const formatDate = (date: Date | null | undefined): string => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // 희망 학교/학과 텍스트 생성
    const getDesiredSchoolsText = () => {
        const schools = student.desired_school?.slice(0, 3) || [];
        if (schools.length === 0) return "-";

        const validSchools = schools.filter(school =>
            school.school_name && school.school_name !== "none"
        );

        if (validSchools.length === 0) return "-";
        return validSchools.map(school => school.school_name).join(", ");
    };

    const getDesiredDepartmentsText = () => {
        const departments = student.desired_department?.slice(0, 3) || [];
        if (departments.length === 0) return "-";

        const validDepartments = departments.filter(dept =>
            dept.department_name && dept.department_name !== "none"
        );

        if (validDepartments.length === 0) return "-";
        return validDepartments.map(dept => dept.department_name).join(", ");
    };

    return (
        <div className="w-full flex flex-col" style={{ backgroundColor: '#ffffff' }}>
            {/* 상단 헤더 */}
            <div className="flex justify-between items-center px-12 py-6">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#7c3aed' }}>
                        <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <span className="text-2xl font-light" style={{ color: '#1e1b4b' }}>Libera</span>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex flex-col px-12 py-4 flex-1">
                {/* 제목 섹션 */}
                <div className="mb-2">
                    <div className="text-sm font-medium mb-4 tracking-wider uppercase"
                        style={{ color: '#7c3aed' }}>
                        University Admission Consulting
                    </div>
                    <h1 className="text-7xl font-light mb-6 leading-tight" style={{ color: '#1e1b4b' }}>
                        <span className="font-normal" style={{ color: '#7c3aed' }}> {new Date().getFullYear() + 1}</span>학년도 <br />
                        수시 전략 분석 레포트
                    </h1>
                    <div className="w-24 h-px mb-8" style={{ backgroundColor: '#7c3aed' }}></div>
                </div>

                {/* 학생 정보 섹션 */}
                <div className="grid grid-cols-2 gap-8">
                    {/* 학생 기본 정보 */}
                    <div>
                        <div className="mb-8">
                            <h2 className="text-4xl font-light mb-4" style={{ color: '#1e1b4b' }}>
                                {student.name}
                            </h2>
                            <p className="text-lg" style={{ color: '#6b7280' }}>학생</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="text-sm font-medium mb-2" style={{ color: '#7c3aed' }}>현재 재학교</div>
                                <div className="text-xl" style={{ color: '#1e1b4b' }}>{student.current_school_name}</div>
                            </div>

                            <div>
                                <div className="text-sm font-medium mb-2" style={{ color: '#7c3aed' }}>상담 날짜</div>
                                <div className="text-xl" style={{ color: '#1e1b4b' }}>{formatDate(student.consultation_date)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 진로 정보 */}
                    <div>
                        <h3 className="text-2xl font-light mb-8" style={{ color: '#1e1b4b' }}>진학 목표</h3>

                        <div className="space-y-8">
                            <div>
                                <div className="text-sm font-medium mb-3" style={{ color: '#7c3aed' }}>희망 대학교</div>
                                <div className="text-lg leading-relaxed" style={{ color: '#1e1b4b' }}>
                                    {getDesiredSchoolsText()}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm font-medium mb-3" style={{ color: '#7c3aed' }}>희망 학과</div>
                                <div className="text-lg leading-relaxed" style={{ color: '#1e1b4b' }}>
                                    {getDesiredDepartmentsText()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ResultReportCover;
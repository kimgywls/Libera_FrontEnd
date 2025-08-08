import { FC } from 'react';
import {
    GraduationCap,
    Target,
} from "lucide-react";
import { StudentInfo as StudentInfoType } from "@/app/types/student";
import { formatDate } from '@/app/dashboard/_components/StudentInfo/utils';
import ResultReportStudentStatus from './ResultReportStudentStatus';
import ResultReportSection from '../ResultReportSection';
import ResultReportDesiredSchoolList from './ResultReportDesiredSchoolList';

interface StudentInfoProps {
    student: StudentInfoType;
}

const ResultReportStudentInfo: FC<StudentInfoProps> = ({ student }) => {
    return (
        <ResultReportSection title="학생 정보">
            <div className="result-report-student-info-container">
                <div className="result-report-student-info-header">
                    <div className="result-report-student-name-container">
                        <h1 className="result-report-student-name">{student.name}</h1>
                    </div>
                    <div className="result-report-consultation-info">
                        <h3 className="result-report-consultation-title">
                            상담 일정
                        </h3>
                        <div className="result-report-consultation-date">{formatDate(student.consultation_date)}</div>
                    </div>
                </div>
                <div className="result-report-student-info-grid">
                    {/* 현재 상태 */}
                    <ResultReportStudentStatus student={student} />
                    {/* 목표 설정 */}
                    <div className="result-report-goal-container">
                        <div className="result-report-goal-header">
                            <h3 className="result-report-goal-title">
                                <Target className="result-report-goal-icon" />
                                진학 목표
                            </h3>
                        </div>
                        <div className="result-report-goal-content">
                            <div className="result-report-goal-content-row">
                                <GraduationCap className="result-report-goal-content-icon" />
                                <div className="result-report-goal-content-text">
                                    <p className="result-report-goal-content-title">목표 대학 및 학과</p>
                                    <div className="result-report-goal-content-body">
                                        <ResultReportDesiredSchoolList
                                            desiredSchools={student.desired_school}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ResultReportSection >
    );
};

export default ResultReportStudentInfo;
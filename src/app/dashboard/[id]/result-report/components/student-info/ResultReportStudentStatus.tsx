import { FC } from 'react';
import { StudentInfo as StudentInfoType } from '@/app/types/student';
import { MapPin, School, TrendingUp } from 'lucide-react';

const ResultReportStudentStatus: FC<{ student: StudentInfoType }> = ({ student }) => (
    <div className="result-report-student-status-container">
        <h3 className="result-report-student-status-title">
            <School className="result-report-student-status-icon" />
            현재 상태
        </h3>
        <div className="result-report-student-status-card">
            <div className="result-report-student-status-row">
                <MapPin className="result-report-student-status-content-icon" />
                <div className="result-report-student-status-content">
                    <p className="result-report-student-status-label">재학 중인 학교</p>
                    <p className="result-report-student-status-value">
                        {student?.current_school_name}
                    </p>
                </div>
            </div>
        </div>

        <div className="result-report-student-status-grid">
            <div className="result-report-student-status-card">
                <div className="result-report-student-status-row">
                    <TrendingUp className="result-report-student-status-content-icon" />
                    <div className="result-report-student-status-content">
                        <p className="result-report-student-status-label">전학기 전체교과 내신 성적</p>
                        <p className="result-report-student-status-value">
                            {student?.overall_score} 등급
                        </p>
                    </div>
                </div>
            </div>
            <div className="result-report-student-status-card">
                <div className="result-report-student-status-row">
                    <TrendingUp className="result-report-student-status-content-icon" />
                    <div className="result-report-student-status-content">
                        <p className="result-report-student-status-label">전학기 주요과목 내신 성적</p>
                        <p className="result-report-student-status-value">
                            {student?.main_subjects_score} 등급
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ResultReportStudentStatus; 
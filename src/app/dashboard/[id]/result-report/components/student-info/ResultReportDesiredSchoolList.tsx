import { FC } from 'react';
import { DesiredSchool } from '@/app/types/university';

interface DesiredSchoolListProps {
    desiredSchools: DesiredSchool[];
}

const ResultReportDesiredSchoolList: FC<DesiredSchoolListProps> = ({ desiredSchools }) => {
    const formatSchoolDepartment = (school: string, department: string) => {
        // 빈 값과 "none" 값 정규화
        const normalizeText = (text: string) => {
            if (!text || text.trim() === "" || text.toLowerCase() === "none") {
                return "";
            }
            return text.trim();
        };

        const schoolText = normalizeText(school);
        const departmentText = normalizeText(department);

        // 둘 다 없는 경우
        if (!schoolText && !departmentText) {
            return "설정된 진학 목표가 없습니다";
        }

        // 학교만 있는 경우
        if (schoolText && !departmentText) {
            return schoolText;
        }

        // 학과만 있는 경우
        if (!schoolText && departmentText) {
            return departmentText;
        }

        // 둘 다 있는 경우 - 일반 공백과 bullet point 사용
        return `${schoolText} • ${departmentText}`;
    };

    return (
        <div className="result-report-desired-school-list">
            {desiredSchools.length === 0 ? (
                <span className="result-report-desired-school-empty">설정된 진학 목표가 없습니다</span>
            ) : desiredSchools.map((department, index) => {
                const displayText = formatSchoolDepartment(department.school_name, department.department_name);

                return (
                    <div key={department.id ? `dep-${department.id}` : `dep-tmp-${index}`} className="result-report-desired-school-item">
                        <div className="result-report-desired-school-tag">
                            <span className="result-report-desired-school-text">
                                {displayText}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ResultReportDesiredSchoolList; 
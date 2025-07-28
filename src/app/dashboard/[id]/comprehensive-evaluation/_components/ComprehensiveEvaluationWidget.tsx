import React, { FC } from 'react';

import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';
import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import FinalRecommendedSchoolsSection from './FinalRecommendedSchoolsSection';
import FinalComprehensiveEvaluationSection from './FinalComprehensiveEvaluationSection';

const ComprehensiveEvaluationWidget: FC = () => {
    const { studentInfo } = useStudentInfoContext();

    return (
        <div className="space-y-10">
            {studentInfo && (
                <StudentInfoSection student={studentInfo} />
            )}
            <FinalRecommendedSchoolsSection />
            <FinalComprehensiveEvaluationSection />
        </div>
    );
};

export default ComprehensiveEvaluationWidget;
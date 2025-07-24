'use client';

import { useParams } from 'next/navigation';

import { useExtracurricularSummary } from '../_hooks/use-extracurricular-summary';

import ExtracurricularSection from './ExtracurricularSection';

const ExtracurricularWidget = () => {
    const params = useParams();
    const studentId = Number(params.id);

    const {
        extracurricularSummary,
        isLoading,
        isError
    } = useExtracurricularSummary(studentId);

    return (
        <div className="space-y-6">
            <ExtracurricularSection
                summary={extracurricularSummary}
                isLoading={isLoading}
                isError={isError}
            />
        </div>
    );
};

export default ExtracurricularWidget;

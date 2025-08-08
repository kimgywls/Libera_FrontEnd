import type { FC, ReactNode } from 'react';

interface SectionProps {
    title: string;
    subtitle?: string;
    headerContent?: ReactNode;
    children: ReactNode;
    className?: string;
}

const ResultReportSection: FC<SectionProps> = ({
    title,
    subtitle,
    headerContent,
    children,
    className = ''
}) => {
    return (
        <section className={`result-report-section ${className}`}>
            <div className="result-report-section-header">
                <div className="result-report-section-title-container">
                    <div className="result-report-section-title-row">
                        <span className="result-report-section-indicator" />
                        <h2 className="result-report-section-title">{title}</h2>
                    </div>
                    {subtitle && (
                        <div className="result-report-section-subtitle">
                            {subtitle}
                        </div>
                    )}
                </div>
                {headerContent && (
                    <div className="result-report-section-header-content">
                        {headerContent}
                    </div>
                )}
            </div>
            <div className="result-report-section-body">
                {children}
            </div>
        </section>
    );
};

export default ResultReportSection; 
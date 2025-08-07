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
        <section className={`${className}`}>
            <div className="flex flex-row space-x-2 justify-between items-center px-1 mb-3 mr-5">
                <div>
                    <div className="flex flex-row space-x-2 items-center mb-1">
                        <span className="w-1.5 h-7 mr-2 rounded-sm" style={{ backgroundColor: '#615fff' }} />
                        <h2 className="text-2xl font-bold text-gray-800 ">{title}</h2>
                    </div>
                    {subtitle && (
                        <div className="text-lg font-semibold text-gray-700 mb-4">
                            {subtitle}
                        </div>
                    )}
                </div>
                {headerContent && (
                    <div className="flex flex-row space-x-2">
                        {headerContent}
                    </div>
                )}
            </div>
            {children}
        </section>
    );
};

export default ResultReportSection; 
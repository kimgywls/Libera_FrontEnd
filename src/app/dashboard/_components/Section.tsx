import type { FC, ReactNode } from 'react';

interface SectionProps {
    title: string;
    subtitle?: string;
    headerContent?: ReactNode;
    children: ReactNode;
    className?: string;
}

const Section: FC<SectionProps> = ({
    title,
    subtitle,
    headerContent,
    children,
    className = ''
}) => {
    return (
        <section className={`mb-10 bg-white rounded-lg p-4 ${className}`}>
            <div className="flex flex-row space-x-2 justify-between items-center border-b border-gray-200 pb-1 mb-3 mr-5">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
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

export default Section; 
import { FC, memo } from 'react';

export interface MajorTabNavProps {
    labels: string[];
    selected: number;
    onSelect: (idx: number) => void;
}
const MajorTabNav: FC<MajorTabNavProps> = ({ labels, selected, onSelect }) => {
    const uniqueLabels = [...new Set(labels)];

    return (
        <div className="flex flex-wrap gap-2 mb-1">
            {uniqueLabels.map((label, idx) => (
                <button
                    key={label}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selected === idx
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                        }`}
                    onClick={() => onSelect(idx)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default memo(MajorTabNav); 
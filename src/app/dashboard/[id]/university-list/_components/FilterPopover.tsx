import { FC, memo, useState, useEffect } from 'react';
import { X } from 'lucide-react';

export interface FilterPopoverProps {
    show: boolean;
    onClose: () => void;
    title: string;
    options: string[];
    selected: string[];
    onConfirm: (values: string[]) => void;
    onClear: () => void;
    widthClass?: string;
    recommendTypeLabel?: Record<string, string>;
    className?: string;
}

const FilterPopover: FC<FilterPopoverProps> = ({ show, onClose, title, options, selected, onConfirm, onClear, widthClass, recommendTypeLabel, className }) => {
    const [checkedValues, setCheckedValues] = useState<string[]>(selected);

    useEffect(() => {
        setCheckedValues(selected);
    }, [selected, show]);

    const handleCheck = (val: string) => {
        setCheckedValues(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
        );
    };
    const handleClearButton = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCheckedValues([]);
        onClear();
        onClose();
    };
    const handleConfirmButton = (e: React.MouseEvent) => {
        e.stopPropagation();
        onConfirm(checkedValues);
        onClose();
    };
    const handleCloseButton = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };
    if (!show) return null;
    return (
        <div
            className={`absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-10 ${widthClass || 'w-80'} ${className || ''}`}
            onClick={e => e.stopPropagation()}
        >
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <div className="flex items-center space-x-4">
                        <button onClick={handleClearButton} className="text-sm text-gray-500 hover:text-violet-600">초기화</button>
                        <button
                            onClick={handleConfirmButton}
                            className="text-gray-500 rounded-xl hover:text-violet-600 font-semibold "
                            disabled={checkedValues.length === 0}
                        >
                            확인
                        </button>
                        <button onClick={handleCloseButton}><X className="w-4 h-4 text-gray-600 hover:text-violet-600" /></button>
                    </div>
                </div>
            </div>
            <div className={`p-4 ${title === '판정 선택' ? 'flex flex-col gap-3' : 'grid grid-cols-2 gap-3'}`}>
                {options.map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                        <input
                            type="checkbox"
                            checked={checkedValues.includes(opt)}
                            onChange={() => handleCheck(opt)}
                            className="rounded border-gray-300 text-violet-600 accent-violet-600"
                        />
                        <span className="text-sm text-gray-700">{title === '판정 선택' && recommendTypeLabel ? recommendTypeLabel[opt] || opt : opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default memo(FilterPopover); 
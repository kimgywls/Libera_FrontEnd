import type { FC, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalHeaderProps {
    title: string;
    subtitle: string;
    onClose: () => void;
    rightContent?: ReactNode;
}

const ModalHeader: FC<ModalHeaderProps> = ({ title, subtitle, onClose, rightContent }) => {
    return (
        <div className="flex items-center justify-between text-black">
            <div className="text-black">
                <h2 className="text-2xl font-bold mb-1">{title}</h2>
                <p className="text-gray-500 text-sm">{subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
                {rightContent}
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default ModalHeader; 
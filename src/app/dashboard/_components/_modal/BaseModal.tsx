import type { FC, ReactNode } from 'react';

interface BaseModalProps {
    open: boolean;
    onClose: () => void;
    header: ReactNode;
    children: ReactNode;
    footer: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BaseModal: FC<BaseModalProps> = ({ open, onClose: _onClose, header, children, footer }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md w-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden">
                {/* 헤더 */}
                <div className="bg-violet-100 border-b border-gray-200 px-8 pt-6 pb-4 text-black">
                    {header}
                </div>

                {/* 컨텐츠 영역 */}
                <div className="flex-1 overflow-auto pb-3">
                    {children}
                </div>

                {/* 하단 버튼 영역 */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                    {footer}
                </div>
            </div>
        </div>
    );
};

export default BaseModal; 
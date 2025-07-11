import React from 'react';

interface AlertModalProps {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = React.memo(({
    open,
    title,
    description,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <div className="font-bold text-lg mb-2">{title}</div>
                <div className="text-gray-700 mb-6 whitespace-pre-line">{description}</div>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
});

AlertModal.displayName = 'AlertModal'; 
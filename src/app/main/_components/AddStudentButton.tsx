import React, { useState, useCallback } from 'react';

import { AddStudentModal } from './_modal/AddStudentModal';

export const AddStudentButton: React.FC = React.memo(() => {
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <button
                type="button"
                onClick={handleOpen}
                className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 mr-2"
            >
                학생 추가
            </button>
            <AddStudentModal open={open} onClose={handleClose} />
        </>
    );
});

AddStudentButton.displayName = 'AddStudentButton'; 
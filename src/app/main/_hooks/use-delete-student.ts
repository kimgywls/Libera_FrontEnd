import { useState, useCallback } from 'react';
import { deleteStudent, DeleteStudentResponse } from '../_actions/delete-student';

export function useDeleteStudent() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const remove = useCallback(async (studentIds: number[]) => {
        setLoading(true);
        setError('');
        setSuccess(false);
        const res: DeleteStudentResponse = await deleteStudent(studentIds);
        setSuccess(res.success);
        if (!res.success) setError(res.message);
        setLoading(false);
        return res;
    }, []);

    const reset = useCallback(() => {
        setError('');
        setSuccess(false);
    }, []);

    return { loading, error, success, remove, reset };
} 
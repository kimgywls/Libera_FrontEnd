import { useAddDesiredSchool, useDeleteDesiredSchool } from './use-desired-school';
import { useInvalidateDesiredSchools } from './use-invalidate-desired-schools';
import { useState } from 'react';

export function useDesiredSchoolActions(studentId: number) {
    const { mutate: addDesiredSchool } = useAddDesiredSchool();
    const { mutate: deleteDesiredSchool } = useDeleteDesiredSchool();
    const invalidateDesiredSchools = useInvalidateDesiredSchools(studentId);
    const [newSchoolValue, setNewSchoolValue] = useState('');
    const [newDepartmentValue, setNewDepartmentValue] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);

    const handleSaveNew = () => {
        const school_name = newSchoolValue.trim() || 'none';
        const department_name = newDepartmentValue.trim() || 'none';
        const nextPriority = 10;
        addDesiredSchool({
            school_name,
            department_name,
            priority: nextPriority,
            student_id: studentId,
        }, {
            onSuccess: () => {
                invalidateDesiredSchools();
                setIsAddOpen(false);
                setNewSchoolValue('');
                setNewDepartmentValue('');
            }
        });
    };

    const handleDeleteDepartment = (id: number) => {
        deleteDesiredSchool(id, {
            onSuccess: () => {
                invalidateDesiredSchools();
            }
        });
    };

    return {
        newSchoolValue,
        setNewSchoolValue,
        newDepartmentValue,
        setNewDepartmentValue,
        isAddOpen,
        setIsAddOpen,
        handleSaveNew,
        handleDeleteDepartment,
    };
} 
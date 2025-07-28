import { FC, useState } from 'react';
import { useParams } from 'next/navigation';

import {
    ExtracurricularSummary,
    CreativeActivity,
    DetailedAbility,
    BehavioralCharacteristic,
    EditFormData
} from '@/app/types/extracurricular';
import { useModalState } from '@/app/hooks/useModalState';

import {
    useUpdateCreativeActivity,
    useUpdateDetailedAbility,
    useUpdateBehavioralCharacteristic
} from '../_hooks/use-update-extracurricular-summary';

import {
    useCreateCreativeActivity,
    useCreateDetailedAbility,
    useCreateBehavioralCharacteristic
} from '../_hooks/use-create-extracurricular';

import BehavioralCharacteristicsSection from './BehavioralCharacteristicsSection';
import CreativeActivitiesSection from './CreativeActivitiesSection';
import DetailedAbilitiesSection from './DetailedAbilitiesSection';
import EditModal from './_modal/EditModal';
import AddModal from './_modal/AddModal';

interface ExtracurricularSectionProps {
    summary?: ExtracurricularSummary;
    isLoading: boolean;
    isError: boolean;
}

const ExtracurricularSection: FC<ExtracurricularSectionProps> = ({
    summary,
    isLoading,
    isError
}) => {
    const params = useParams();
    const studentId = Number(params.id);

    const { isModalOpen, openModal, closeModal } = useModalState();
    const [editData, setEditData] = useState<{
        type: 'creative' | 'detailed' | 'behavioral' | null;
        data: CreativeActivity | DetailedAbility | BehavioralCharacteristic | null;
    }>({
        type: null,
        data: null
    });

    // 추가 모달 상태
    const [addData, setAddData] = useState<{ type: 'creative' | 'detailed' | 'behavioral' | null; grade: number | null }>({ type: null, grade: null });
    const { isModalOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal } = useModalState();

    // Create mutations
    const { mutate: createCreative, isPending: isCreatingCreative } = useCreateCreativeActivity(studentId);
    const { mutate: createDetailed, isPending: isCreatingDetailed } = useCreateDetailedAbility(studentId);
    const { mutate: createBehavioral, isPending: isCreatingBehavioral } = useCreateBehavioralCharacteristic(studentId);

    // Update mutations
    const { mutate: updateCreative, isPending: isUpdatingCreative } = useUpdateCreativeActivity(studentId);
    const { mutate: updateDetailed, isPending: isUpdatingDetailed } = useUpdateDetailedAbility(studentId);
    const { mutate: updateBehavioral, isPending: isUpdatingBehavioral } = useUpdateBehavioralCharacteristic(studentId);

    const openEditModal = (
        type: 'creative' | 'detailed' | 'behavioral',
        data: CreativeActivity | DetailedAbility | BehavioralCharacteristic
    ) => {
        setEditData({ type, data });
        openModal('edit');
    };

    const closeEditModal = () => {
        closeModal('edit');
        setEditData({ type: null, data: null });
    };

    const handleSave = (formData: EditFormData) => {
        if (!editData.type || !formData.id) return;

        const onSuccessCallback = () => {
            closeEditModal();
        };

        const onErrorCallback = (error: Error) => {
            console.error('수정 실패:', error.message);
            alert(`수정에 실패했습니다: ${error.message}`);
        };

        switch (editData.type) {
            case 'creative':
                if (!formData.grade || !formData.area || !formData.details) return;
                updateCreative(
                    {
                        activityId: formData.id,
                        data: {
                            grade: formData.grade,
                            area: formData.area,
                            details: formData.details
                        }
                    },
                    {
                        onSuccess: onSuccessCallback,
                        onError: onErrorCallback
                    }
                );
                break;
            case 'detailed':
                if (!formData.grade || !formData.semester || !formData.subject || !formData.content) return;
                updateDetailed(
                    {
                        abilityId: formData.id,
                        data: {
                            grade: formData.grade,
                            semester: formData.semester,
                            subject: formData.subject,
                            content: formData.content
                        }
                    },
                    {
                        onSuccess: onSuccessCallback,
                        onError: onErrorCallback
                    }
                );
                break;
            case 'behavioral':
                if (!formData.grade || !formData.content) return;
                updateBehavioral(
                    {
                        characteristicId: formData.id,
                        data: {
                            grade: formData.grade,
                            content: formData.content
                        }
                    },
                    {
                        onSuccess: onSuccessCallback,
                        onError: onErrorCallback
                    }
                );
                break;
        }
    };

    const handleEditCreative = (activity: CreativeActivity) => {
        openEditModal('creative', activity);
    };

    const handleEditDetailed = (ability: DetailedAbility) => {
        openEditModal('detailed', ability);
    };

    const handleEditBehavioral = (characteristic: BehavioralCharacteristic) => {
        openEditModal('behavioral', characteristic);
    };

    // 추가 모달 열기 핸들러
    const handleOpenAddModal = (type: 'creative' | 'detailed' | 'behavioral', grade: number) => {
        setAddData({ type, grade });
        openAddModal('add');
    };

    // 추가 저장 핸들러
    const handleAdd = (formData: any) => {
        if (!addData.type) return;

        const onSuccessCallback = () => {
            closeAddModal('add');
            setAddData({ type: null, grade: null });
        };

        const onErrorCallback = (error: Error) => {
            console.error('추가 실패:', error.message);
            alert(`추가에 실패했습니다: ${error.message}`);
        };

        switch (addData.type) {
            case 'creative':
                createCreative(formData, {
                    onSuccess: onSuccessCallback,
                    onError: onErrorCallback
                });
                break;
            case 'detailed':
                createDetailed(formData, {
                    onSuccess: onSuccessCallback,
                    onError: onErrorCallback
                });
                break;
            case 'behavioral':
                createBehavioral(formData, {
                    onSuccess: onSuccessCallback,
                    onError: onErrorCallback
                });
                break;
        }
    };

    // 전체 로딩 중이거나 에러가 있을 때만 처리
    if (isLoading) {
        return <div className="py-4 text-center text-gray-500">비교과 활동 정보를 불러오는 중...</div>;
    }

    if (isError) {
        return <div className="py-4 text-center text-red-500">비교과 활동 정보를 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div className="space-y-8">
            {summary && (
                <>
                    <div id="creative-section">
                        <CreativeActivitiesSection
                            activities={summary.creative_activities}
                            onEdit={handleEditCreative}
                            onAdd={handleOpenAddModal}
                        />
                    </div>

                    <div id="detailed-section">
                        <DetailedAbilitiesSection
                            abilities={summary.detailed_abilities}
                            onEdit={handleEditDetailed}
                            onAdd={handleOpenAddModal}
                        />
                    </div>

                    <div id="behavioral-section">
                        <BehavioralCharacteristicsSection
                            characteristics={summary.behavioral_characteristics}
                            onEdit={handleEditBehavioral}
                            onAdd={handleOpenAddModal}
                        />
                    </div>
                </>
            )}

            <EditModal
                isOpen={isModalOpen('edit')}
                onClose={closeEditModal}
                onSave={handleSave}
                type={editData.type!}
                data={editData.data}
                studentId={studentId}
                isLoading={isUpdatingCreative || isUpdatingDetailed || isUpdatingBehavioral}
            />

            <AddModal
                isOpen={isAddModalOpen('add')}
                onClose={() => { closeAddModal('add'); setAddData({ type: null, grade: null }); }}
                onSave={handleAdd}
                type={addData.type!}
                grade={addData.grade}
                isLoading={isCreatingCreative || isCreatingDetailed || isCreatingBehavioral}
            />
        </div>
    );
};

export default ExtracurricularSection; 
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

import BehavioralCharacteristicsSection from './BehavioralCharacteristicsSection';
import CreativeActivitiesSection from './CreativeActivitiesSection';
import DetailedAbilitiesSection from './DetailedAbilitiesSection';
import EditModal from './_modal/EditModal';

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
                    <CreativeActivitiesSection
                        activities={summary.creative_activities}
                        onEdit={handleEditCreative}
                    />

                    <DetailedAbilitiesSection
                        abilities={summary.detailed_abilities}
                        onEdit={handleEditDetailed}
                    />

                    <BehavioralCharacteristicsSection
                        characteristics={summary.behavioral_characteristics}
                        onEdit={handleEditBehavioral}
                    />
                </>
            )}

            <EditModal
                isOpen={isModalOpen('edit')}
                onClose={closeEditModal}
                onSave={handleSave}
                type={editData.type!}
                data={editData.data}
                isLoading={isUpdatingCreative || isUpdatingDetailed || isUpdatingBehavioral}
            />
        </div>
    );
};

export default ExtracurricularSection; 
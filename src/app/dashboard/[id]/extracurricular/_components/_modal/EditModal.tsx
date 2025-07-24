import { FC, useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

import {
    CreativeActivity,
    DetailedAbility,
    BehavioralCharacteristic,
    EditFormData
} from '@/app/types/extracurricular';


interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: EditFormData) => void;
    type: 'creative' | 'detailed' | 'behavioral';
    data: CreativeActivity | DetailedAbility | BehavioralCharacteristic | null;
    isLoading?: boolean;
}

const DefaultFormData = {
    id: 0,
    grade: 0,
    area: '',
    details: '',
    semester: '',
    subject: '',
    content: ''
}


const EditModal: FC<EditModalProps> = ({
    isOpen,
    onClose,
    onSave,
    type,
    data,
    isLoading = false
}) => {
    const [formData, setFormData] = useState<EditFormData>(DefaultFormData);

    // 데이터가 변경될 때마다 폼 데이터 업데이트
    useEffect(() => {
        if (!data || !type) {
            setFormData(DefaultFormData);
            return;
        }

        switch (type) {
            case 'creative':
                const creative = data as CreativeActivity;
                setFormData({
                    id: creative.id,
                    grade: creative.grade,
                    area: creative.area,
                    details: creative.details
                });
                break;
            case 'detailed':
                const detailed = data as DetailedAbility;
                setFormData({
                    id: detailed.id,
                    grade: detailed.grade,
                    semester: detailed.semester,
                    subject: detailed.subject,
                    content: detailed.content
                });
                break;
            case 'behavioral':
                const behavioral = data as BehavioralCharacteristic;
                setFormData({
                    id: behavioral.id,
                    grade: behavioral.grade,
                    content: behavioral.content
                });
                break;
            default:
                setFormData(DefaultFormData);
        }
    }, [data, type]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const getTitle = () => {
        switch (type) {
            case 'creative': return '창의체험활동 수정';
            case 'detailed': return '세부능력 및 특기사항 수정';
            case 'behavioral': return '행동특성 및 종합의견 수정';
        }
    };

    const updateFormData = (field: keyof EditFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{getTitle()}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === 'creative' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    학년
                                </label>
                                <select
                                    value={formData.grade || ''}
                                    onChange={(e) => updateFormData('grade', Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">선택하세요</option>
                                    <option value="1">1학년</option>
                                    <option value="2">2학년</option>
                                    <option value="3">3학년</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    영역
                                </label>
                                <select
                                    value={formData.area || ''}
                                    onChange={(e) => updateFormData('area', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">선택하세요</option>
                                    <option value="자율활동">자율활동</option>
                                    <option value="동아리활동">동아리활동</option>
                                    <option value="진로활동">진로활동</option>
                                    <option value="봉사활동">봉사활동</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    활동 내용
                                </label>
                                <textarea
                                    value={formData.details || ''}
                                    onChange={(e) => updateFormData('details', e.target.value)}
                                    rows={6}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {type === 'detailed' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        학년
                                    </label>
                                    <select
                                        value={formData.grade || ''}
                                        onChange={(e) => updateFormData('grade', Number(e.target.value))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">선택하세요</option>
                                        <option value="1">1학년</option>
                                        <option value="2">2학년</option>
                                        <option value="3">3학년</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        학기
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.semester || ''}
                                        onChange={(e) => updateFormData('semester', e.target.value)}
                                        placeholder="예: 1학기, 2학기, 1,2학기"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    과목
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject || ''}
                                    onChange={(e) => updateFormData('subject', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    세부능력 및 특기사항
                                </label>
                                <textarea
                                    value={formData.content || ''}
                                    onChange={(e) => updateFormData('content', e.target.value)}
                                    rows={6}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {type === 'behavioral' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    학년
                                </label>
                                <select
                                    value={formData.grade || ''}
                                    onChange={(e) => updateFormData('grade', Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">선택하세요</option>
                                    <option value="1">1학년</option>
                                    <option value="2">2학년</option>
                                    <option value="3">3학년</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    행동특성 및 종합의견
                                </label>
                                <textarea
                                    value={formData.content || ''}
                                    onChange={(e) => updateFormData('content', e.target.value)}
                                    rows={6}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={isLoading}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-2 disabled:bg-violet-400"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    저장 중...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    저장
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal; 
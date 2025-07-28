import { FC, useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

import { CreativeActivity, DetailedAbility, BehavioralCharacteristic } from '@/app/types/extracurricular';

// 각 폼 데이터 타입 정의
export type CreativeFormData = {
    grade: number;
    area: string;
    details: string;
};
export type DetailedFormData = {
    grade: number;
    semester: string;
    subject: string;
    content: string;
};
export type BehavioralFormData = {
    grade: number;
    content: string;
};

type AddModalFormData = CreativeFormData | DetailedFormData | BehavioralFormData;

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: AddModalFormData) => void;
    type: 'creative' | 'detailed' | 'behavioral';
    grade: number | null;
    isLoading?: boolean;
}

const DefaultFormData: AddModalFormData = {
    grade: 0,
    area: '',
    details: '',
    semester: '',
    subject: '',
    content: ''
};

const AddModal: FC<AddModalProps> = ({
    isOpen,
    onClose,
    onSave,
    type,
    grade,
    isLoading = false
}) => {
    const [formData, setFormData] = useState<AddModalFormData>({ ...DefaultFormData, grade: grade || 0 });

    useEffect(() => {
        setFormData({ ...DefaultFormData, grade: grade || 0 });
    }, [type, grade, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const getTitle = () => {
        switch (type) {
            case 'creative': return '창의체험활동 추가';
            case 'detailed': return '세부능력 및 특기사항 추가';
            case 'behavioral': return '행동특성 및 종합의견 추가';
        }
    };

    const updateFormData = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">학년</label>
                                <select
                                    value={(formData as CreativeFormData).grade || ''}
                                    onChange={e => updateFormData('grade', Number(e.target.value))}
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">영역</label>
                                <select
                                    value={(formData as CreativeFormData).area || ''}
                                    onChange={e => updateFormData('area', e.target.value)}
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">활동 내용</label>
                                <textarea
                                    value={(formData as CreativeFormData).details || ''}
                                    onChange={e => updateFormData('details', e.target.value)}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">학년</label>
                                    <select
                                        value={(formData as DetailedFormData).grade || ''}
                                        onChange={e => updateFormData('grade', Number(e.target.value))}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">학기</label>
                                    <select
                                        value={(formData as DetailedFormData).semester || ''}
                                        onChange={e => updateFormData('semester', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">선택하세요</option>
                                        <option value="1">1학기</option>
                                        <option value="2">2학기</option>
                                        <option value="1,2">1,2학기</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">과목</label>
                                <input
                                    type="text"
                                    value={(formData as DetailedFormData).subject || ''}
                                    onChange={e => updateFormData('subject', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">세부능력 및 특기사항</label>
                                <textarea
                                    value={(formData as DetailedFormData).content || ''}
                                    onChange={e => updateFormData('content', e.target.value)}
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">학년</label>
                                <select
                                    value={(formData as BehavioralFormData).grade || ''}
                                    onChange={e => updateFormData('grade', Number(e.target.value))}
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">행동특성 및 종합의견</label>
                                <textarea
                                    value={(formData as BehavioralFormData).content || ''}
                                    onChange={e => updateFormData('content', e.target.value)}
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

export default AddModal; 
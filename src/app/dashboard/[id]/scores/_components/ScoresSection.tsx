import type { FC } from 'react';

import { Score, ScoreForm } from '@/app/types/score';

import Section from '../../../_components/Section';

import CreateScoresModal from './_modal/CreateScoresModal';
import ScoresTable from './ScoresTable';
import UpdateScoresModal from './_modal/UpdateScoresModal';

const SCORE_CATEGORIES = ['일반선택', '진로선택', '체육/예술'] as const;

interface ScoresSectionProps {
    grade: number;
    semester: number;
    scores: Score[];
    isScoresLoading: boolean;
    isScoresError: boolean;
    openModal: (id: string) => void;
    closeModal: (id: string) => void;
    isModalOpen: (id: string) => boolean;
    studentId: number;
    toScoreForm: (score: Score) => ScoreForm;
    onScoreChange: () => void;
}

const ScoresSection: FC<ScoresSectionProps> = ({
    grade,
    semester,
    scores,
    isScoresLoading,
    isScoresError,
    openModal,
    closeModal,
    isModalOpen,
    studentId,
    toScoreForm,
    onScoreChange
}) => {
    const modalId = `score-${grade}-${semester}`;
    const createModalId = `score-create-${grade}-${semester}`;
    const hasScores = scores.some((s) => s.grade === grade && s.semester === semester);

    const handleScoreSuccess = () => {
        onScoreChange();
        closeModal(modalId);
        closeModal(createModalId);
    };

    const headerButtons = (
        <>
            {!hasScores && (
                <button
                    className="px-2 py-2 text-blue-500 font-bold rounded-md hover:underline hover:text-blue-600 whitespace-nowrap cursor-pointer"
                    onClick={() => openModal(createModalId)}
                >
                    성적 입력하기
                </button>
            )}
            {hasScores && (
                <button
                    className="px-2 py-2 text-green-500 font-bold rounded-md hover:underline hover:text-green-600 whitespace-nowrap cursor-pointer"
                    onClick={() => openModal(modalId)}
                >
                    성적 수정하기
                </button>
            )}
        </>
    );

    return (
        <Section
            title={`${grade}학년 ${semester}학기 내신 성적`}
            headerContent={headerButtons}
        >
            <div className="mb-6">
                {SCORE_CATEGORIES.map((cat) => (
                    <div key={cat} className="mb-4">
                        <div className="font-bold text-gray-700 mb-2">[{cat}]</div>
                        <ScoresTable
                            scores={scores}
                            isLoading={isScoresLoading}
                            isError={isScoresError}
                            grade={grade}
                            semester={semester}
                            category={cat}
                        />
                    </div>
                ))}

                <CreateScoresModal
                    open={isModalOpen(createModalId)}
                    onClose={() => closeModal(createModalId)}
                    studentId={studentId}
                    grade={grade}
                    semester={semester}
                    onSuccess={handleScoreSuccess}
                />

                <UpdateScoresModal
                    open={isModalOpen(modalId)}
                    onClose={() => closeModal(modalId)}
                    studentId={studentId}
                    grade={grade}
                    semester={semester}
                    scores={scores?.filter(s => s.grade === grade && s.semester === semester).map(toScoreForm) || []}
                    onSuccess={handleScoreSuccess}
                />
            </div>
        </Section>
    );
};

export default ScoresSection; 
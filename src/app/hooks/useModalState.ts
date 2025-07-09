import { useState, useCallback } from 'react';

export function useModalState(initialState: Record<string, boolean> = {}) {
    const [modalStates, setModalStates] = useState<Record<string, boolean>>(initialState);

    const openModal = useCallback((modalKey: string) => {
        setModalStates(prev => ({ ...prev, [modalKey]: true }));
    }, []);

    const closeModal = useCallback((modalKey: string) => {
        setModalStates(prev => ({ ...prev, [modalKey]: false }));
    }, []);

    const toggleModal = useCallback((modalKey: string) => {
        setModalStates(prev => ({ ...prev, [modalKey]: !prev[modalKey] }));
    }, []);

    const isModalOpen = useCallback((modalKey: string) => {
        return modalStates[modalKey] || false;
    }, [modalStates]);

    return {
        modalStates,
        openModal,
        closeModal,
        toggleModal,
        isModalOpen,
    };
} 
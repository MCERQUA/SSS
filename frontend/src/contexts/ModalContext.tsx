'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Modal Context for Global Modal State Management
 * 
 * Provides global state for modal open/close operations
 * Supports different modal types for future extensibility
 * 
 * @component
 * @example
 * // In your app layout
 * <ModalProvider>
 *   <YourApp />
 * </ModalProvider>
 * 
 * // In any component
 * const { openModal, closeModal, isModalOpen } = useModal();
 * openModal('quote');
 */

export type ModalType = 'quote' | 'confirmation' | 'gallery' | 'contact';

export interface QuoteModalData {
  serviceType?: string;
  productName?: string;
  quantity?: number;
  message?: string;
}

export interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data?: QuoteModalData | any;
}

interface ModalContextType {
  modal: ModalState;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  isModalOpen: (type?: ModalType) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: null,
    data: undefined
  });

  const openModal = (type: ModalType, data?: any) => {
    setModal({
      isOpen: true,
      type,
      data
    });
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      data: undefined
    });
    
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  const isModalOpen = (type?: ModalType) => {
    if (type) {
      return modal.isOpen && modal.type === type;
    }
    return modal.isOpen;
  };

  // Close modal on ESC key press
  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modal.isOpen) {
        closeModal();
      }
    };

    if (modal.isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [modal.isOpen]);

  // Cleanup body scroll on unmount
  React.useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const contextValue: ModalContextType = {
    modal,
    openModal,
    closeModal,
    isModalOpen
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

/**
 * Hook to access Modal Context
 * 
 * @returns {ModalContextType} Modal context methods and state
 * @throws {Error} When used outside of ModalProvider
 * 
 * @example
 * const { openModal, closeModal, isModalOpen, modal } = useModal();
 * 
 * // Open quote modal with pre-filled data
 * openModal('quote', { 
 *   serviceType: 'nfc-apparel', 
 *   productName: 'Custom T-Shirt',
 *   quantity: 50 
 * });
 * 
 * // Close any open modal
 * closeModal();
 * 
 * // Check if specific modal is open
 * if (isModalOpen('quote')) {
 *   // Quote modal is open
 * }
 */
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  
  return context;
};

export default ModalProvider;
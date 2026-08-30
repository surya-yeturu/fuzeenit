import { createContext, useContext, useState, useCallback } from 'react';

const ExpertModalContext = createContext(null);

export const ExpertModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultCourse, setDefaultCourse] = useState('');

  const openModal = useCallback((course = '') => {
    setDefaultCourse(course);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setDefaultCourse('');
  }, []);

  return (
    <ExpertModalContext.Provider value={{ isOpen, defaultCourse, openModal, closeModal }}>
      {children}
    </ExpertModalContext.Provider>
  );
};

export const useExpertModal = () => {
  const context = useContext(ExpertModalContext);
  if (!context) {
    throw new Error('useExpertModal must be used within ExpertModalProvider');
  }
  return context;
};

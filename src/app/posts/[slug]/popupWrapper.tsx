'use client'

import { useEffect, useState } from 'react';
import LeadCollector from './leadCollector';
import useLocalStorage from '@/hooks/useLocalStorage';

interface LeadCollectorProps {
}

const PopupWrapper: React.FC<LeadCollectorProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [popupShown, setPopupShown] = useLocalStorage('popupShown', 'false');

  useEffect(() => {
    if (popupShown === 'false') {
      setIsOpen(true);
      setPopupShown('true');
    }
  }, [popupShown, setPopupShown]);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <LeadCollector email={email} setEmail={setEmail} closePopup={closePopup} isLoading={isLoading} setIsLoading={setIsLoading}/>
  );
};

export default PopupWrapper;

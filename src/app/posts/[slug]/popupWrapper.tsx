'use client'

import { useState } from 'react';
import LeadCollector from './leadCollector';

interface LeadCollectorProps {
}

const PopupWrapper: React.FC<LeadCollectorProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true)

  return (
    <LeadCollector email={email} setEmail={setEmail} isOpen={isOpen} setIsOpen={setIsOpen}/>
  );
};

export default PopupWrapper;

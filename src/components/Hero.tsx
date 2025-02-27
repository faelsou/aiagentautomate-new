import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    setShowTrialModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Hero: React.FC<HeroProps> = ({ setShowTrialModal }) => {
    return (
    <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-black">
      {/* Hero content */}
        <button onClick={() => setShowTrialModal(true)}>
        <span>Experimente Agora</span>
        <ArrowRight className="w-5 h-5" />
        </button>
    </header>
    );
};

import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface TrialModalProps {
    submitStatus: 'idle' | 'loading' | 'success' | 'error';
    setShowTrialModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleTrialSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ submitStatus, setShowTrialModal, handleTrialSubmit }) => {
    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white text-black p-6 md:p-8 rounded-2xl w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold">Comece seu Teste Grátis</h3>
            <button onClick={() => setShowTrialModal(false)} disabled={submitStatus === 'loading'}>
            <X className="w-6 h-6" />
            </button>
        </div>
        <form onSubmit={handleTrialSubmit} className="space-y-4">
          {/* Form fields */}
          {/* Submit Button */}
        </form>
        </div>
    </div>
    );
};

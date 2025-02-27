import React from 'react';
import { MessageCircle } from 'lucide-react';

export const ChatButton = () => {
    return (
    <button className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg">
        <MessageCircle className="w-6 h-6" />
    </button>
    );
};

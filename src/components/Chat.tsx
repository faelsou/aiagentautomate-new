import React, { useState } from 'react';
import { MessageCircle, ArrowRight, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const sessionId = localStorage.getItem('chat_session_id') || crypto.randomUUID();
  const { messages, loading, sendMessage } = useChat(sessionId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput('');
  };

  const handleWhatsAppRedirect = () => {
    const message = "Olá! Gostaria de falar com um especialista sobre automação de vendas.";
    const phoneNumber = "5511999999999"; // Replace with actual number
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 w-80 bg-white rounded-2xl shadow-2xl text-black">
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-6 h-6" />
          <span className="font-bold">SDR Virtual</span>
        </div>
        <button onClick={onClose} className="hover:opacity-80 transition-opacity">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="h-96 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.type === 'user' 
                  ? 'ml-auto bg-blue-600 text-white' 
                  : 'mr-auto bg-gray-100 text-black'
              } p-3 rounded-lg max-w-[80%]`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="flex space-x-2 items-center text-gray-500">
              <div className="animate-bounce">•</div>
              <div className="animate-bounce delay-100">•</div>
              <div className="animate-bounce delay-200">•</div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSend} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 rounded-r-full hover:bg-blue-700 disabled:opacity-50"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full mt-2 text-sm text-blue-600 hover:underline"
          >
            Falar com um especialista
          </button>
        </div>
      </div>
    </div>
  );
};
// src/App.tsx
import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, X, CheckCircle2, Brain } from 'lucide-react';
import { Chat } from './components/Chat';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Exemplo de uso do Supabase
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('your-table').select('*');
      console.log(data, error);
    }

    fetchData();
  }, []);

  // Função para obter o usuário
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log(data, error);
  };

  // Chama a função getUser ao montar o componente
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {showTrialModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black p-6 md:p-8 rounded-2xl w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold">Comece seu Teste Grátis</h3>
              <button onClick={() => setShowTrialModal(false)} className="hover:opacity-80">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome da Empresa</label>
                <input type="text" name="company" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Corporativo</label>
                <input type="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefone</label>
                <input type="tel" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold">
                Começar Teste Grátis
              </button>
            </form>
          </div>
        </div>
      )}

      <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-black p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold">AIAgent Automate</span>
          </div>
          <button onClick={() => setShowTrialModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold">
            Experimente Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </header>

      {!isChatOpen ? (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
}

export default App;

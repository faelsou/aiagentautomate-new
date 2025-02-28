import React, { useState } from 'react';
import { MessageCircle, ArrowRight, BarChart3, Users, Zap, Brain, X, CheckCircle2 } from 'lucide-react';
import { Chat } from './components/Chat';
import { TrialService } from './services/TrialService';

const trialService = new TrialService();

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de saber mais sobre a automação de agentes de IA para vendas.";
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleTrialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');

    const formData = new FormData(e.currentTarget);
    const trialData = {
      company_name: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    try {
      await trialService.createTrialRequest(trialData);
      setSubmitStatus('success');
      
      // Prepare WhatsApp message
      const message = `Olá! Gostaria de começar o teste grátis da AIAgent Automate.\n\nDados da empresa:\nEmpresa: ${trialData.company_name}\nEmail: ${trialData.email}\nTelefone: ${trialData.phone}`;
      const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
      
      // Delay to show success message before redirecting
      setTimeout(() => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        setShowTrialModal(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting trial request:', error);
      setSubmitStatus('error');
    }
  };

  const TrialModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black p-6 md:p-8 rounded-2xl w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold">Comece seu Teste Grátis</h3>
          <button 
            onClick={() => setShowTrialModal(false)} 
            className="hover:opacity-80"
            disabled={submitStatus === 'loading'}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleTrialSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Nome da Empresa</label>
            <input
              type="text"
              name="company"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="Sua Empresa"
              required
              disabled={submitStatus === 'loading'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Corporativo</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="seu@email.com"
              required
              disabled={submitStatus === 'loading'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="(11) 99999-9999"
              required
              disabled={submitStatus === 'loading'}
            />
          </div>
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className={`w-full px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-2
              ${submitStatus === 'loading' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : submitStatus === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            {submitStatus === 'loading' && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            )}
            {submitStatus === 'success' && <CheckCircle2 className="w-5 h-5" />}
            <span>
              {submitStatus === 'loading' ? 'Processando...' 
                : submitStatus === 'success' ? 'Sucesso!'
                : 'Começar Teste Grátis'}
            </span>
          </button>
          {submitStatus === 'error' && (
            <p className="text-sm text-red-600 text-center">
              Ocorreu um erro. Por favor, tente novamente.
            </p>
          )}
          <p className="text-sm text-gray-500 text-center">
            7 dias grátis, sem compromisso
          </p>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {showTrialModal && <TrialModal />}
      
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-black">
        <nav className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 md:h-8 w-6 md:w-8 text-blue-400" />
              <span className="text-lg md:text-xl font-bold">AIAgent Automate</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-blue-400 transition-colors">Sobre</a>
              <a href="#services" className="hover:text-blue-400 transition-colors">Serviços</a>
              <a href="#features" className="hover:text-blue-400 transition-colors">Recursos</a>
              <a href="#stats" className="hover:text-blue-400 transition-colors">Resultados</a>
              <a href="#testimonials" className="hover:text-blue-400 transition-colors">Depoimentos</a>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => document.querySelector('.mobile-menu')?.classList.toggle('hidden')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="mobile-menu hidden md:hidden mt-4 space-y-2">
            <a href="#about" className="block py-2 hover:text-blue-400 transition-colors">Sobre</a>
            <a href="#services" className="block py-2 hover:text-blue-400 transition-colors">Serviços</a>
            <a href="#features" className="block py-2 hover:text-blue-400 transition-colors">Recursos</a>
            <a href="#stats" className="block py-2 hover:text-blue-400 transition-colors">Resultados</a>
            <a href="#testimonials" className="block py-2 hover:text-blue-400 transition-colors">Depoimentos</a>
          </div>
        </nav>

        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Automação Inteligente para Escalar Suas Vendas
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Transforme seu time de vendas com agentes de IA que nunca param de gerar leads
            </p>
            <button 
              onClick={() => setShowTrialModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Experimente Agora</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Rest of the sections with improved mobile responsiveness */}
      {/* ... */}

      {/* Chatbot */}
      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
}

export default App;
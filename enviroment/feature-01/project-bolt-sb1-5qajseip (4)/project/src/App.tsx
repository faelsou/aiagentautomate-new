import React, { useState } from 'react';
import { MessageCircle, ArrowRight, BarChart3, Users, Zap, Brain, X, CheckCircle2 } from 'lucide-react';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);

  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de saber mais sobre a automação de agentes de IA para vendas.";
    const phoneNumber = "5511999999999"; // Replace with actual business phone number
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleTrialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = `Olá! Gostaria de começar o teste grátis da AIAgent Automate.\n\nDados da empresa:\nEmpresa: ${formData.get('company')}\nEmail: ${formData.get('email')}\nTelefone: ${formData.get('phone')}`;
    const phoneNumber = "5511999999999"; // Replace with actual business phone number
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setShowTrialModal(false);
  };

  const TrialModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Comece seu Teste Grátis</h3>
          <button onClick={() => setShowTrialModal(false)}>
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
          >
            Começar Teste Grátis
          </button>
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
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">AIAgent Automate</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-blue-400 transition-colors">Sobre</a>
              <a href="#services" className="hover:text-blue-400 transition-colors">Serviços</a>
              <a href="#features" className="hover:text-blue-400 transition-colors">Recursos</a>
              <a href="#stats" className="hover:text-blue-400 transition-colors">Resultados</a>
              <a href="#testimonials" className="hover:text-blue-400 transition-colors">Depoimentos</a>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Automação Inteligente para Escalar Suas Vendas
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Transforme seu time de vendas com agentes de IA que nunca param de gerar leads
            </p>
            <button 
              onClick={() => setShowTrialModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Experimente Agora</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-blue-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Quem Somos</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-8">
              Somos a AIAgent Automate, especialistas em automação de agentes de IA para transformar a maneira como sua empresa se comunica, vende e atende seus clientes. Nossa tecnologia de ponta permite a criação de agentes inteligentes que automatizam processos, qualificam leads e melhoram a experiência do cliente em tempo real.
            </p>
            <p className="text-xl text-gray-300 mb-8">
              Com IA avançada, nossos agentes simulam interações humanas naturais, tornando seu atendimento mais ágil, eficiente e escalável. Aumente sua taxa de conversão, reduza custos operacionais e potencialize suas vendas com automação inteligente.
            </p>
            <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-sm">
              <p className="text-lg text-gray-300">
                Empresas que usam nossa solução registram:
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span>Aumento de até 40% na conversão de leads</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span>Redução de 60% no tempo de resposta</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span>Melhoria significativa na satisfação do cliente</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Nossos Serviços</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Consultoria de IA Personalizada</h3>
              <p className="text-gray-300">Análise completa do seu negócio e desenvolvimento de soluções sob medida para suas necessidades específicas.</p>
            </div>
            <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Chatbots Inteligentes</h3>
              <p className="text-gray-300">Automação de qualificação e direcionamento de leads com interações naturais e personalizadas.</p>
            </div>
            <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Atendimento 24/7</h3>
              <p className="text-gray-300">Suporte contínuo sem sobrecarregar sua equipe, garantindo respostas rápidas e eficientes.</p>
            </div>
            <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Integração Multiplataforma</h3>
              <p className="text-gray-300">Conexão perfeita com CRM, WhatsApp, e-mail e outras plataformas essenciais para seu negócio.</p>
            </div>
            <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Análises Avançadas</h3>
              <p className="text-gray-300">Métricas detalhadas e insights acionáveis para otimização contínua do seu atendimento.</p>
            </div>
            <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Treinamento e Suporte</h3>
              <p className="text-gray-300">Capacitação completa da sua equipe e suporte técnico especializado para máximo aproveitamento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-purple-900 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Como a IA Revoluciona seu Atendimento</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-black/50 p-8 rounded-2xl backdrop-blur-sm">
              <MessageCircle className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Atendimento 24/7</h3>
              <p className="text-gray-400">Agentes de IA disponíveis a qualquer momento para converter leads</p>
            </div>
            <div className="bg-black/50 p-8 rounded-2xl backdrop-blur-sm">
              <Users className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Personalização em Escala</h3>
              <p className="text-gray-400">Interações personalizadas com cada cliente potencial</p>
            </div>
            <div className="bg-black/50 p-8 rounded-2xl backdrop-blur-sm">
              <Zap className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Respostas Instantâneas</h3>
              <p className="text-gray-400">Sem tempo de espera, aumentando as taxas de conversão</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="text-5xl font-bold mb-4">40%</div>
              <p className="text-xl text-gray-300">Aumento na Conversão</p>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold mb-4">24/7</div>
              <p className="text-xl text-gray-300">Disponibilidade</p>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold mb-4">500%</div>
              <p className="text-xl text-gray-300">ROI Médio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-black to-blue-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">O que Nossos Clientes Dizem</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-black/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150"
                  alt="Cliente"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Ana Silva</h4>
                  <p className="text-gray-400">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-gray-300">"A automação dos nossos SDRs virtuais aumentou nossa capacidade de atendimento em 300% no primeiro mês."</p>
            </div>
            <div className="bg-black/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150"
                  alt="Cliente"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Carlos Santos</h4>
                  <p className="text-gray-400">Diretor de Vendas, InnovaCorp</p>
                </div>
              </div>
              <p className="text-gray-300">"Impressionante como os agentes de IA mantêm conversas naturais e geram leads qualificados constantemente."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Brain className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">AIAgent Automate</span>
              </div>
              <p className="text-gray-400">Transformando vendas com inteligência artificial</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Links Rápidos</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-blue-400">Sobre</a></li>
                <li><a href="#services" className="hover:text-blue-400">Serviços</a></li>
                <li><a href="#features" className="hover:text-blue-400">Recursos</a></li>
                <li><a href="#stats" className="hover:text-blue-400">Resultados</a></li>
                <li><a href="#testimonials" className="hover:text-blue-400">Depoimentos</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400">Privacidade</a></li>
                <li><a href="#" className="hover:text-blue-400">Termos</a></li>
              </ul>
            </div>
            <div>
              <button 
                onClick={handleWhatsAppClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105"
              >
                Fale com um Especialista
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-8 right-8 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        ) : (
          <div className="bg-white text-black rounded-2xl shadow-2xl w-80">
            <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6" />
                <span className="font-bold">SDR Virtual</span>
              </div>
              <button onClick={() => setIsChatOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="bg-gray-100 p-3 rounded-lg inline-block">Olá! Como posso ajudar você hoje?</p>
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:border-blue-600"
                />
                <button className="bg-blue-600 text-white px-4 rounded-r-full hover:bg-blue-700">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
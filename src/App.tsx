import React, { useState, useEffect } from 'react';
import { TrialService } from './services/TrialService';
import { supabase } from './api/supabaseClient';
import { TrialModal } from './components/TrialModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChatButton } from './components/ChatButton';

const trialService = new TrialService();

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://deftuemtjmecwrdmvzeo.supabase.co/rest/v1/trial_requests?columns="company_name","email","phone"&select=*',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'apikey': import.meta.env.VITE_SUPABASE_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            },
          }
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

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
      const message = `Olá! Gostaria de começar o teste grátis da AIAgent Automate.\n\nDados da empresa:\nEmpresa: ${trialData.company_name}\nEmail: ${trialData.email}\nTelefone: ${trialData.phone}`;
      const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
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

  return (
    <div className="min-h-screen bg-black text-white">
      {showTrialModal && (
        <TrialModal
          submitStatus={submitStatus}
          setShowTrialModal={setShowTrialModal}
          handleTrialSubmit={handleTrialSubmit}
        />
      )}
      <Navbar />
      <Hero setShowTrialModal={setShowTrialModal} />
      <ChatButton />
    </div>
  );
};

export default App;

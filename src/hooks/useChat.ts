import { useState, useEffect, useCallback } from 'react';
import { ChatService } from '../services/ChatService';

const chatService = new ChatService();

export const useChat = (sessionId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    chatService.connect(sessionId);
    
    chatService.onMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });

    loadMessageHistory();

    return () => {
      chatService.disconnect();
    };
  }, [sessionId]);

  const loadMessageHistory = async () => {
    try {
      setLoading(true);
      const history = await chatService.getMessageHistory(sessionId);
      setMessages(history);
    } catch (err) {
      setError('Failed to load message history');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = useCallback(async (message: string) => {
    try {
      setLoading(true);
      await chatService.sendMessage(message, sessionId);
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  return { messages, loading, error, sendMessage };
};
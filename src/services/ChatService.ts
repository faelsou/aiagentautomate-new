import { io } from 'socket.io-client';
import { api } from '../config/api';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8081';

export class ChatService {
  private socket;

  constructor() {
    this.socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat service');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat service');
    });
  }

  connect(userId: string) {
    this.socket.auth = { userId };
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  async sendMessage(message: string, sessionId: string) {
    try {
      const response = await api.post('/chat/message', {
        message,
        sessionId,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  onMessage(callback: (message: any) => void) {
    this.socket.on('message', callback);
  }

  async getMessageHistory(sessionId: string) {
    try {
      const response = await api.get(`/chat/history/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching message history:', error);
      throw error;
    }
  }
}
import { http } from './http';
import type { SendMessageDto, ReadMessageDto, CreateConversationDto, ChatbotQueryDto } from '../types';

export const sendMessage = (payload: SendMessageDto) => http('chat/messages', { method: 'POST', body: JSON.stringify(payload) });
export const readMessage = (payload: ReadMessageDto) => http('chat/read', { method: 'POST', body: JSON.stringify(payload) });
export const createConversation = (payload: CreateConversationDto) => http('chat/conversations', { method: 'POST', body: JSON.stringify(payload) });
export const queryChatbot = (payload: ChatbotQueryDto) => http('chat/chatbot', { method: 'POST', body: JSON.stringify(payload) });

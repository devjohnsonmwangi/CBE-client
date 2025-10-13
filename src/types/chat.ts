export interface SendMessageDto {
  conversationId: number;
  content: string;
}

export interface ReadMessageDto {
  conversationId: number;
}

export interface CreateConversationDto {
  title?: string;
  isGroupChat?: boolean;
  schoolId?: number;
  participantIds: number[];
}

export interface ChatbotQueryDto {
  query: string;
  schoolId?: number;
}

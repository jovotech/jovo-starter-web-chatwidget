export type ConversationPartType = 'request' | 'response';
export type ConversationPartSubType = 'text' | 'audio';

export interface ConversationPart {
  type: ConversationPartType;
  subType: ConversationPartSubType;
  value: string;
}

export interface Conversation {
  quickReplies: string[];
  parts: ConversationPart[];
}

import { Input, NormalizedOutputTemplate } from '@jovotech/client-web-vue2';

export interface RequestConversationPart {
  type: 'request';
  data: Input;
}

export interface ResponseConversationPart {
  type: 'response';
  data: NormalizedOutputTemplate;
}

export type ConversationPart = RequestConversationPart | ResponseConversationPart;

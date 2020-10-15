<template>
  <div class="flex flex-col h-64">
    <div class="flex-grow flex flex-col space-y-4 space-x-1 overflow-y-auto">
      <chat-widget-conversation-part
        v-for="(part, index) in conversation.parts"
        :key="index"
        :part="part"
      />
    </div>
    <div class="mt-auto flex justify-end">
      <chat-widget-conversation-quick-reply v-for="(quickReply, index) in conversation.quickReplies" :key="index" :quick-reply="quickReply" />
    </div>
  </div>
</template>

<script lang="ts">
import ChatWidgetConversationPart from '@/components/conversation/ChatWidgetConversationPart.vue';
import ChatWidgetConversationQuickReply from '@/components/conversation/ChatWidgetConversationQuickReply.vue';
import { Conversation } from '@/types';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-conversation',
  components: {ChatWidgetConversationQuickReply, ChatWidgetConversationPart },
})
export default class ChatWidgetConversation extends Vue {
  conversation: Conversation = {
    quickReplies: [
        'when are you open'
    ],
    parts: [
      {
        type: 'response',
        subType: 'text',
        value: `Hey there! 👋\n\nHow can I help you?`,
      },
      // {
      //   type: 'request',
      //   subType: 'text',
      //   value: `when are you open`,
      // },
      // {
      //   type: 'response',
      //   subType: 'text',
      //   value: `On Fridays, we open at 9am.`
      // }
    ],
  };
}
</script>

<style scoped lang="scss"></style>

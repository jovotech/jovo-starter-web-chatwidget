<template>
  <div class="flex flex-col flex-grow">
    <div
      ref="partContainer"
      class="
        flex-grow flex flex-col
        space-y-4
        px-6
        py-4
        overflow-y-scroll
        scrollbar-invisible
        hover:scrollbar
      "
    >
      <chat-widget-conversation-part
        v-for="(part, index) in conversationPartsWithQuickRepliesOnlyInLast"
        :key="index"
        :part="part"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ChatWidgetConversationPart from '@/components/conversation/ChatWidgetConversationPart.vue';
import { ConversationPart } from '@/types';
import { ClientEvent, ClientRequest, NormalizedOutputTemplate } from '@jovotech/client-web-vue2';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-conversation',
  components: { ChatWidgetConversationPart },
})
export default class ChatWidgetConversation extends Vue {
  conversationParts: ConversationPart[] = [];

  // takes the conversation parts and removes all quick replies but the last ones
  get conversationPartsWithQuickRepliesOnlyInLast() {
    return this.conversationParts.map((part, index) => {
      return index !== this.conversationParts.length - 1 && part.type === 'response'
        ? { ...part, data: { ...part.data, quickReplies: undefined } }
        : part;
    });
  }

  mounted() {
    this.$client.on(ClientEvent.Request, this.onRequest);
    this.$client.on(ClientEvent.Output, this.onOutput);
  }

  beforeDestroy() {
    this.$client.off(ClientEvent.Request, this.onRequest);
    this.$client.off(ClientEvent.Output, this.onOutput);
  }

  scrollToBottom() {
    const partContainer = this.$refs.partContainer as HTMLDivElement;
    partContainer.scrollTop = partContainer.scrollHeight;
  }

  private async onRequest(req: ClientRequest) {
    this.conversationParts.push({
      type: 'request',
      data: req.input || {},
    });
    await this.$nextTick();
    this.scrollToBottom();
  }

  private async onOutput(output: NormalizedOutputTemplate) {
    this.conversationParts.push({
      type: 'response',
      data: output,
    });
    await this.$nextTick();
    this.scrollToBottom();
  }
}
</script>

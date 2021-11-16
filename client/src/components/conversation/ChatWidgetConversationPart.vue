<template>
  <div class="max-w-3/4 inline" :class="isRequest ? 'self-end' : 'self-start'">
    <message-display
      v-if="isRequest"
      class="bg-primary text-white"
      :message="part.data.text || part.data.type"
    />
    <output-template-display
      v-else
      :output="part.data"
      @quick-reply-click="onQuickReplyClick"
    ></output-template-display>
  </div>
</template>

<script lang="ts">
import { ConversationPart } from '@/types';
import { Input, InputType, QuickReplyValue } from '@jovotech/client-web-vue2';
import { MessageDisplay, OutputTemplateDisplay } from '@jovotech/output-components-vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-conversation-part',
  components: {
    MessageDisplay,
    OutputTemplateDisplay,
  },
})
export default class ChatWidgetConversationPart extends Vue {
  @Prop({ required: true, type: Object })
  part!: ConversationPart;

  get isRequest(): boolean {
    return this.part.type === 'request';
  }

  onQuickReplyClick(quickReply: QuickReplyValue) {
    const input: Input =
      typeof quickReply === 'string'
        ? { type: InputType.Text, text: quickReply }
        : quickReply.intent
        ? {
            type: InputType.Intent,
            text: quickReply.value || quickReply.text,
            intent: quickReply.intent,
            entities: quickReply.entities,
          }
        : { type: InputType.Text, text: quickReply.value || quickReply.text };

    return this.$client.send(input);
  }
}
</script>

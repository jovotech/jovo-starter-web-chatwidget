<template>
  <div
    class="max-w-half p-2 inline shadow-lg"
    :class="[
      isRequest
        ? 'bg-primary self-end text-right text-white rounded-t-xl rounded-bl-xl'
        : 'bg-white rounded-b-xl rounded-tr-xl',
    ]"
  >
    <p class="whitespace-pre-wrap" v-text="part.value"></p>
  </div>
</template>

<script lang="ts">
import { ConversationPart } from '@/types';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-conversation-part',
})
export default class ChatWidgetConversationPart extends Vue {
  @Prop({ required: true, type: Object })
  part!: ConversationPart;

  get isRequest(): boolean {
    return this.part.type === 'request';
  }
}
</script>

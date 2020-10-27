<template>
  <div
    class="inline bg-white bg-opacity-0 hover:bg-opacity-50 rounded-2xl text-blue-600 border border-blue-600 cursor-pointer py-1 px-2 whitespace-no-wrap"
    @click="sendQuickReply"
  >
    {{ quickReply }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RequestType } from 'jovo-client-web-vue';

@Component({
  name: 'chat-widget-conversation-quick-reply',
})
export default class ChatWidgetConversationQuickReply extends Vue {
  @Prop({ required: true, type: String })
  quickReply!: string;

  async sendQuickReply() {
    return this.$client
      .createRequest({ type: RequestType.Text, body: { text: this.quickReply } })
      .send();
  }
}
</script>

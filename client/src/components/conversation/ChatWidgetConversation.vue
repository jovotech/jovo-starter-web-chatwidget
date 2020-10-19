<template>
  <div class="flex flex-col h-64">
    <div ref="partContainer" class="flex-grow flex flex-col space-y-4 space-x-1 overflow-y-auto">
      <chat-widget-conversation-part
        v-for="(part, index) in conversation.parts"
        :key="index"
        :part="part"
      />
    </div>
    <div class="mt-auto flex flex-shrink-0 items-end justify-end space-x-1 h-10">
      <chat-widget-conversation-quick-reply
        v-for="(quickReply, index) in conversation.quickReplies"
        :key="index"
        :quick-reply="quickReply"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ChatWidgetConversationPart from '@/components/conversation/ChatWidgetConversationPart.vue';
import ChatWidgetConversationQuickReply from '@/components/conversation/ChatWidgetConversationQuickReply.vue';
import { Conversation } from '@/types';
import {
  Action,
  AudioPlayerEvent,
  ClientEvent,
  RequestType,
  SpeechSynthesizerEvent,
  WebRequest,
  ActionType,
  QuickReplyAction,
} from 'jovo-client-web-vue';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-conversation',
  components: { ChatWidgetConversationQuickReply, ChatWidgetConversationPart },
})
export default class ChatWidgetConversation extends Vue {
  conversation: Conversation = {
    quickReplies: [],
    parts: [],
  };

  includeOutput = false;

  mounted() {
    console.log('mount Conversation');
    this.$client.on(ClientEvent.Request, this.onRequest);
    this.$client.on(ClientEvent.Reprompt, this.onReprompt);
    this.$client.on(ClientEvent.Action, this.onAction);
    this.$client.on(ClientEvent.RepromptLimitReached, this.onRepromptLimitReached);
    this.$client.$speechSynthesizer.on(SpeechSynthesizerEvent.Speak, this.onSpeak);
    this.$client.$audioPlayer.on(AudioPlayerEvent.Play, this.onPlay);
  }

  beforeDestroy() {
    this.$client.off(ClientEvent.Request, this.onRequest);
    this.$client.off(ClientEvent.Reprompt, this.onReprompt);
    this.$client.off(ClientEvent.Action, this.onAction);
    this.$client.off(ClientEvent.RepromptLimitReached, this.onRepromptLimitReached);
    this.$client.$speechSynthesizer.off(SpeechSynthesizerEvent.Speak, this.onSpeak);
    this.$client.$audioPlayer.off(AudioPlayerEvent.Play, this.onPlay);
  }

  private onRequest(req: WebRequest) {
    this.includeOutput = true;
    this.conversation.quickReplies = [];
    switch (req.request.type) {
      case RequestType.Text:
      case RequestType.TranscribedText:
        this.conversation.parts.push({
          type: 'request',
          subType: 'text',
          value: req.request.body.text!,
        });
        break;
      case RequestType.Audio:
        this.conversation.parts.push({
          type: 'request',
          subType: 'audio',
          value: req.request.body.audio!.b64string,
        });
        break;
    }
  }

  @Watch('conversation.parts')
  async onPartsChange() {
    // wait for dom changes
    await this.$nextTick();
    const partContainer = this.$refs.partContainer as HTMLDivElement;
    partContainer.scrollTop = partContainer.scrollHeight;
  }

  private onReprompt(actions: Action[]) {
    this.includeOutput = false;
  }

  private onRepromptLimitReached() {
    this.conversation.quickReplies = [];
  }

  private onAction(action: Action) {
    if (!this.includeOutput) return;
    if (action.type === ActionType.QuickReply) {
      this.conversation.quickReplies = (action as QuickReplyAction).replies.map((reply) => {
        return reply.value;
      });
    }
  }

  private onPlay(src: string) {
    if (!this.includeOutput) return;
    this.conversation.parts.push({
      type: 'response',
      subType: 'audio',
      value: src,
    });
  }

  private onSpeak(utterance: SpeechSynthesisUtterance) {
    if (!this.includeOutput) return;
    this.conversation.parts.push({
      type: 'response',
      subType: 'text',
      value: utterance.text,
    });
  }
}
</script>

<template>
  <div class="flex flex-col" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div
      ref="partContainer"
      class="flex-grow flex flex-col space-y-4 space-x-1 overflow-y-scroll px-6 py-4"
      :class="[isHovered ? 'scrollbar' : 'scrollbar-invisible']"
    >
      <chat-widget-conversation-part
        v-for="(part, index) in conversation.parts"
        :key="index"
        :part="part"
      />
    </div>
    <div class="flex-shrink-0">
      <div
        ref="quickReplyContainer"
        class="flex items-center space-x-2 overflow-x-auto"
        :class="[isHovered ? 'scrollbar' : 'scrollbar-invisible']"
        @wheel.prevent="handleQuickReplyScroll"
      >
        <div
          v-for="(quickReply, index) in conversation.quickReplies"
          :key="index"
          class="flex py-2"
          :class="[index === 0 ? 'ml-auto' : '']"
        >
          <chat-widget-conversation-quick-reply
            :quick-reply="quickReply"
            :class="[
              index === 0 ? 'ml-6' : index === conversation.quickReplies.length - 1 ? 'mr-6' : '',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChatWidgetConversationPart from '@/components/conversation/ChatWidgetConversationPart.vue';
import ChatWidgetConversationQuickReply from '@/components/conversation/ChatWidgetConversationQuickReply.vue';
import { Conversation } from '@/types';
import {
  Action,
  ActionType,
  ClientEvent,
  QuickReplyAction,
  RequestType,
  SpeechAction,
  WebRequest,
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
  isHovered = false;

  handleQuickReplyScroll(event: WheelEvent) {
    (this.$refs.quickReplyContainer as HTMLElement).scrollBy({
      left: event.deltaY,
    });
  }

  mounted() {
    window.addEventListener('resize', this.scrollToBottom);
    this.$client.on(ClientEvent.Request, this.onRequest);
    this.$client.on(ClientEvent.Reprompt, this.onReprompt);
    this.$client.on(ClientEvent.Action, this.onAction);
    this.$client.on(ClientEvent.RepromptLimitReached, this.onRepromptLimitReached);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.scrollToBottom);
    this.$client.off(ClientEvent.Request, this.onRequest);
    this.$client.off(ClientEvent.Reprompt, this.onReprompt);
    this.$client.off(ClientEvent.Action, this.onAction);
    this.$client.off(ClientEvent.RepromptLimitReached, this.onRepromptLimitReached);
  }

  scrollToBottom() {
    const partContainer = this.$refs.partContainer as HTMLDivElement;
    partContainer.scrollTop = partContainer.scrollHeight;
  }

  private onRequest(req: WebRequest) {
    this.includeOutput = true;
    this.conversation.quickReplies = [];
    switch (req.request.type) {
      case RequestType.Text:
      case RequestType.TranscribedText:
        if (!req.request.body.text) {
          return;
        }
        this.conversation.parts.push({
          type: 'request',
          subType: 'text',
          value: req.request.body.text,
        });
        break;
      case RequestType.Audio:
        if (!req.request.body.audio?.b64string) {
          return;
        }
        this.conversation.parts.push({
          type: 'request',
          subType: 'audio',
          value: req.request.body.audio.b64string,
        });
        break;
    }
  }

  private onReprompt() {
    this.includeOutput = false;
  }

  private onRepromptLimitReached() {
    this.conversation.quickReplies = [];
  }

  private onAction(action: Action) {
    if (!this.includeOutput) return;
    switch (action.type) {
      case ActionType.QuickReply: {
        this.conversation.quickReplies = (action as QuickReplyAction).replies.map((reply) => {
          return reply.value;
        });
        break;
      }
      case ActionType.Speech: {
        const { plain, displayText, ssml } = action as SpeechAction;
        const value =
          displayText || plain || (ssml ? this.$client.$ssmlHandler.removeSSML(ssml) : undefined);
        if (!value) {
          return;
        }
        this.conversation.parts.push({
          type: 'response',
          subType: 'text',
          value,
        });
        break;
      }
      default:
    }
  }

  @Watch('conversation', { deep: true })
  private async onPartsChange() {
    // wait for dom changes
    await this.$nextTick();
    this.scrollToBottom();
  }
}
</script>

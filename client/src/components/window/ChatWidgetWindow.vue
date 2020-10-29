<template>
  <div class="flex flex-col border border-gray-400 rounded-xl sm:w-96 shadow-xl">
    <chat-widget-window-header
      class="flex-shrink-0 rounded-t-xl border-b"
      @close="$emit('close')"
    />
    <chat-widget-window-body class="flex-1 overflow-y-auto" />
    <chat-widget-window-bottom ref="bottom" class="flex-shrink-0 rounded-b-xl border-t" />
  </div>
</template>

<script lang="ts">
import ChatWidgetWindowHeader from '@/components/window/ChatWidgetWindowHeader.vue';
import ChatWidgetWindowBody from '@/components/window/ChatWidgetWindowBody.vue';
import ChatWidgetWindowBottom from '@/components/window/ChatWidgetWindowBottom.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window',
  components: { ChatWidgetWindowHeader, ChatWidgetWindowBody, ChatWidgetWindowBottom },
})
export default class ChatWidgetWindow extends Vue {
  focusTextInput() {
    // eslint-disable-next-line
    (this.$refs.bottom as any).focusTextInput();
  }
}
</script>

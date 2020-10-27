<template>
  <div class="flex bg-gray-300">
    <chat-widget-conversation />
  </div>
</template>

<script lang="ts">
import ChatWidgetConversation from '@/components/conversation/ChatWidgetConversation.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window-body',
  components: { ChatWidgetConversation },
})
export default class ChatWidgetWindowBody extends Vue {}
</script>

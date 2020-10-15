<template>
  <div class="p-6 bg-windowBody">
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

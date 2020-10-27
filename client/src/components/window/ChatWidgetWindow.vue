<template>
  <div class="border rounded-xl w-window">
    <chat-widget-window-header class="rounded-t-xl border-b" />
    <chat-widget-window-body />
    <chat-widget-window-bottom class="rounded-b-xl border-t" />
  </div>
</template>

<script lang="ts">
import ChatWidgetWindowHeader from '@/components/window/ChatWidgetWindowHeader.vue';
import ChatWidgetWindowBody from '@/components/window/ChatWidgetWindowBody.vue';
import ChatWidgetWindowBottom from '@/components/window/ChatWidgetWindowBottom.vue';
import { Component, ProvideReactive, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window',
  components: { ChatWidgetWindowHeader, ChatWidgetWindowBody, ChatWidgetWindowBottom },
})
export default class ChatWidgetWindow extends Vue {}
</script>

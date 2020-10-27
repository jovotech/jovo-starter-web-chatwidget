<template>
  <div class="border rounded-xl w-window">
    <chat-widget-window-header class="rounded-t-xl border-b" />
    <chat-widget-window-body />
    <chat-widget-window-input class="rounded-b-xl border-t" />
  </div>
</template>

<script lang="ts">
import ChatWidgetWindowBody from '@/components/window/ChatWidgetWindowBody.vue';
import ChatWidgetWindowInput from '@/components/window/ChatWidgetWindowInput.vue';
import ChatWidgetWindowHeader from '@/components/window/ChatWidgetWindowHeader.vue';
import { Component, ProvideReactive, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window',
  components: { ChatWidgetWindowHeader, ChatWidgetWindowBody, ChatWidgetWindowInput },
})
export default class ChatWidgetWindow extends Vue {}
</script>

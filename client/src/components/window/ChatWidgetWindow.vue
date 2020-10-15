<template>
  <div class="border rounded-xl">
    <chat-widget-window-header class="rounded-t-xl border-b" />
    <chat-widget-window-body />
    <chat-widget-window-footer class="rounded-b-xl border-t" />
  </div>
</template>

<script lang="ts">
import ChatWidgetWindowBody from '@/components/window/ChatWidgetWindowBody.vue';
import ChatWidgetWindowFooter from '@/components/window/ChatWidgetWindowFooter.vue';
import ChatWidgetWindowHeader from '@/components/window/ChatWidgetWindowHeader.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window',
  components: { ChatWidgetWindowFooter, ChatWidgetWindowBody, ChatWidgetWindowHeader },
})
export default class ChatWidgetWindow extends Vue {}
</script>

<template>
  <div class="p-8 bg-primary text-white">
    <h3 class="text-base font-bold mb-1">Jovo FAQ Bot</h3>
    <p class="text-sm font-light">This is an automated bot trained by the Jovo team.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window-header',
})
export default class ChatWidgetWindowHeader extends Vue {}
</script>

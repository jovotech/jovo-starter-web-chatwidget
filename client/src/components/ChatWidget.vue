<template>
  <div class="fixed" style="bottom: 2rem; right: 2rem;">
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <chat-widget-window v-if="isVisible" class="mb-6" />
    </transition>
    <chat-widget-toggle-button
      class="ml-auto"
      :is-active="isVisible"
      @toggle="isVisible = !isVisible"
    />
  </div>
</template>

<script lang="ts">
import ChatWidgetToggleButton from '@/components/ChatWidgetToggleButton.vue';
import ChatWidgetWindow from '@/components/window/ChatWidgetWindow.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget',
  components: { ChatWidgetWindow, ChatWidgetToggleButton },
})
export default class ChatWidget extends Vue {
  isVisible = true;
}
</script>
